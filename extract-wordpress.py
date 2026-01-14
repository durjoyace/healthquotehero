#!/usr/bin/env python3
"""
WordPress to Next.js Content Extractor
Extracts pages, posts, and metadata from WordPress SQL dump
Generates MDX files with frontmatter for Next.js App Router
"""

import re
import os
import json
import html
from datetime import datetime
from pathlib import Path
from typing import Optional

# Paths
SQL_FILE = "/Users/durjoy/Downloads/healthquotehero-backup/wordpress/db-extracted.sql"
OUTPUT_DIR = Path("/Users/durjoy/Downloads/healthquotehero-nextjs")
CONTENT_DIR = OUTPUT_DIR / "content"
PAGES_DIR = CONTENT_DIR / "pages"
DATA_DIR = OUTPUT_DIR / "data"

# Site config
SITE_URL = "https://www.healthquotehero.com"
SITE_NAME = "Health Quote Hero"


def setup_directories():
    """Create output directories"""
    PAGES_DIR.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)


def clean_divi_shortcodes(content: str) -> str:
    """Convert Divi Builder shortcodes to clean HTML"""
    if not content:
        return ""

    # Unescape HTML entities
    content = html.unescape(content)

    # Remove Divi shortcode attributes but keep structure
    # [et_pb_section ...] -> <section>
    # [et_pb_row ...] -> <div class="row">
    # [et_pb_column ...] -> <div class="column">
    # [et_pb_text ...] content [/et_pb_text] -> content

    # Remove WordPress block comments
    content = re.sub(r'<!--\s*wp:[^>]+\s*-->', '', content)
    content = re.sub(r'<!--\s*/wp:[^>]+\s*-->', '', content)

    # Extract text content from Divi text modules
    def extract_text_module(match):
        inner = match.group(1)
        # Clean inner content
        inner = re.sub(r'\[et_pb_[^\]]+\]', '', inner)
        inner = re.sub(r'\[/et_pb_[^\]]+\]', '', inner)
        return inner.strip()

    # Process et_pb_text modules - extract content
    content = re.sub(
        r'\[et_pb_text[^\]]*\](.*?)\[/et_pb_text\]',
        extract_text_module,
        content,
        flags=re.DOTALL
    )

    # Remove remaining Divi shortcodes
    content = re.sub(r'\[et_pb_[^\]]+\]', '', content)
    content = re.sub(r'\[/et_pb_[^\]]+\]', '', content)

    # Remove Divi placeholders
    content = re.sub(r'\[divi/placeholder[^\]]*\]', '', content)

    # Clean up gravity forms shortcodes - note them for later
    content = re.sub(
        r'\[gravityform[^\]]+id=["\']?(\d+)["\']?[^\]]*\]',
        r'<!-- GRAVITY_FORM_ID:\1 -->',
        content
    )

    # Clean up excessive whitespace
    content = re.sub(r'\n{3,}', '\n\n', content)
    content = re.sub(r'[ \t]+', ' ', content)

    # Fix image paths
    content = content.replace(
        'https://www.healthquotehero.com/wp-content/uploads/',
        '/uploads/'
    )
    content = content.replace(
        'https://healthquotehero.com/wp-content/uploads/',
        '/uploads/'
    )

    return content.strip()


def extract_meta_description(content: str, title: str) -> str:
    """Extract or generate meta description from content"""
    # Try to get first meaningful paragraph
    clean = re.sub(r'<[^>]+>', ' ', content)
    clean = re.sub(r'\s+', ' ', clean).strip()

    if len(clean) > 160:
        # Find a good break point
        desc = clean[:157]
        last_space = desc.rfind(' ')
        if last_space > 100:
            desc = desc[:last_space]
        return desc + "..."
    elif clean:
        return clean
    else:
        return f"{title} - Health Quote Hero"


def parse_wp_posts(sql_content: str) -> list[dict]:
    """Parse wp_posts table from SQL dump"""
    pages = []

    # Find the INSERT INTO wp_posts statement
    posts_match = re.search(
        r"INSERT INTO `wp_posts` VALUES (.*?);(?=\n)",
        sql_content,
        re.DOTALL
    )

    if not posts_match:
        print("ERROR: Could not find wp_posts data")
        return pages

    data = posts_match.group(1)

    # Parse individual rows - complex due to nested quotes and content
    # Strategy: Split by known patterns and reconstruct

    # Find published pages and posts
    # Pattern matches: (ID, author, date, date_gmt, content, title, excerpt, 'publish', ...)

    # More robust: iterate through looking for page/post markers
    row_start = 0
    paren_depth = 0
    current_row = ""

    i = 0
    while i < len(data):
        char = data[i]

        if char == '(' and (i == 0 or data[i-1] in ',\n '):
            if paren_depth == 0:
                row_start = i
            paren_depth += 1
        elif char == ')':
            paren_depth -= 1
            if paren_depth == 0:
                current_row = data[row_start:i+1]

                # Check if this is a published page or post
                if "'publish'" in current_row and ("'page'" in current_row or "'post'" in current_row):
                    parsed = parse_single_row(current_row)
                    if parsed:
                        pages.append(parsed)
        elif char == "'" and i > 0 and data[i-1] != '\\':
            # Inside a string - find the end
            i += 1
            while i < len(data):
                if data[i] == "'" and data[i-1] != '\\':
                    break
                i += 1

        i += 1

    return pages


def parse_single_row(row: str) -> Optional[dict]:
    """Parse a single wp_posts row"""
    try:
        # Remove outer parentheses
        row = row.strip('()')

        # Extract fields using regex for specific positions
        # Fields: ID, author, date, date_gmt, content, title, excerpt, status, ...

        # Get ID (first field)
        id_match = re.match(r'^(\d+),', row)
        if not id_match:
            return None
        post_id = id_match.group(1)

        # Get post_date (3rd field after ID and author)
        date_match = re.search(r"^\d+,\d+,'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})'", row)
        post_date = date_match.group(1) if date_match else ""

        # Find content and title by looking for specific patterns
        # Title is typically after content (5th vs 6th field)

        # Strategy: Find 'publish' and work backwards to find title and slug
        publish_pos = row.find(",'publish',")
        if publish_pos == -1:
            return None

        # Post type is near the end
        if "'page'" in row[publish_pos:]:
            post_type = "page"
        elif "'post'" in row[publish_pos:]:
            post_type = "post"
        else:
            return None

        # Find slug (post_name) - it's between 'publish' markers and before several more fields
        # Pattern: ...,'publish','open'/'closed','open'/'closed','','slug',...
        slug_pattern = r",'publish','[^']*','[^']*','([^']*)','([^']+)',"
        slug_match = re.search(slug_pattern, row[publish_pos-10:])

        if slug_match:
            password = slug_match.group(1)
            slug = slug_match.group(2)
        else:
            slug = f"page-{post_id}"

        # Extract title - find it before publish status
        # Look for pattern: ,'Title','excerpt','publish'
        title_pattern = r",'([^']+)','[^']*','publish'"
        title_match = re.search(title_pattern, row[:publish_pos+20])

        if title_match:
            title = title_match.group(1)
        else:
            title = slug.replace('-', ' ').title()

        # Extract content - it's the largest string field, usually field 5
        # Find it by looking for the content pattern
        content = ""

        # Content is between post_date_gmt and title
        # Pattern: date_gmt','CONTENT','title'
        content_start = row.find("','", 50)  # Skip past dates
        if content_start > 0:
            # Find where content ends (before title)
            content_text = row[content_start+3:]

            # Content ends at ','TITLE','
            # Find by looking for known title
            title_pos = content_text.find(f"','{title}','")
            if title_pos > 0:
                content = content_text[:title_pos]

        # Clean content
        content = clean_divi_shortcodes(content)

        # Generate description
        description = extract_meta_description(content, title)

        return {
            'id': post_id,
            'title': html.unescape(title),
            'slug': slug,
            'date': post_date,
            'type': post_type,
            'content': content,
            'description': description,
            'canonical': f"{SITE_URL}/{slug}/"
        }

    except Exception as e:
        print(f"Error parsing row: {e}")
        return None


def extract_navigation(sql_content: str) -> list[dict]:
    """Extract navigation menu from wp_posts and wp_postmeta"""
    nav_items = []

    # Find nav_menu_items
    nav_pattern = r"\((\d+),\d+,'[^']*','[^']*','','([^']*)','','publish',[^,]+,[^,]+,'','([^']+)',[^,]+,[^,]+,'[^']+','[^']+',[^,]+,(\d+),'[^']+',(\d+),'nav_menu_item'"

    posts_match = re.search(r"INSERT INTO `wp_posts` VALUES (.*?);(?=\n)", sql_content, re.DOTALL)
    if not posts_match:
        return nav_items

    matches = re.finditer(nav_pattern, posts_match.group(1))

    for m in matches:
        item_id = m.group(1)
        title = m.group(2)
        slug = m.group(3)
        parent = m.group(4)
        order = m.group(5)

        # Map nav items to actual page slugs
        slug_map = {
            'terms-and-conditions': '/terms',
            'privacy-policy': '/privacy',
            'contact-us': '/contact'
        }

        href = slug_map.get(slug, f'/{slug}')

        nav_items.append({
            'id': item_id,
            'title': html.unescape(title),
            'href': href,
            'order': int(order),
            'parent': parent
        })

    # Sort by order
    nav_items.sort(key=lambda x: x['order'])

    return nav_items


def generate_mdx_file(page: dict):
    """Generate MDX file with frontmatter"""
    slug = page['slug']

    # Handle home page
    if slug in ['healthquotehero', 'home']:
        filename = 'index.mdx'
    else:
        filename = f"{slug}.mdx"

    filepath = PAGES_DIR / filename

    # Build frontmatter
    frontmatter = f"""---
title: "{page['title']}"
slug: "{page['slug']}"
date: "{page['date']}"
description: "{page['description'][:200]}"
canonical: "{page['canonical']}"
type: "{page['type']}"
---

"""

    # Content
    content = page['content'] if page['content'] else f"# {page['title']}\n\nContent to be migrated."

    # Write file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(frontmatter + content)

    print(f"  Created: {filename}")


def main():
    print("=" * 60)
    print("WordPress to Next.js Content Extractor")
    print("=" * 60)

    # Setup
    print("\n[1/5] Setting up directories...")
    setup_directories()

    # Read SQL
    print("\n[2/5] Reading SQL dump...")
    with open(SQL_FILE, 'r', encoding='utf-8', errors='ignore') as f:
        sql_content = f.read()
    print(f"  Loaded {len(sql_content):,} bytes")

    # Extract pages
    print("\n[3/5] Extracting pages...")
    pages = parse_wp_posts(sql_content)
    print(f"  Found {len(pages)} published pages")

    # Generate MDX files
    print("\n[4/5] Generating MDX files...")
    for page in pages:
        generate_mdx_file(page)

    # Extract navigation
    print("\n[5/5] Extracting navigation...")
    nav_items = extract_navigation(sql_content)

    # Save navigation data
    nav_data = {
        'footer': nav_items,
        'header': [
            {'title': 'Health Insurance', 'href': '/health-insurance'},
            {'title': 'Medicare', 'href': '/medicare'},
            {'title': 'Contact', 'href': '/contact'}
        ]
    }

    nav_file = DATA_DIR / 'navigation.json'
    with open(nav_file, 'w') as f:
        json.dump(nav_data, f, indent=2)
    print(f"  Created: navigation.json")

    # Save pages index
    pages_index = [
        {
            'slug': p['slug'],
            'title': p['title'],
            'type': p['type'],
            'canonical': p['canonical']
        }
        for p in pages
    ]

    index_file = DATA_DIR / 'pages-index.json'
    with open(index_file, 'w') as f:
        json.dump(pages_index, f, indent=2)
    print(f"  Created: pages-index.json")

    # Summary
    print("\n" + "=" * 60)
    print("EXTRACTION COMPLETE")
    print("=" * 60)
    print(f"\nPages extracted: {len(pages)}")
    print(f"Navigation items: {len(nav_items)}")
    print(f"\nOutput directory: {OUTPUT_DIR}")
    print(f"Content directory: {CONTENT_DIR}")


if __name__ == "__main__":
    main()
