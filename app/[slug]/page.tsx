import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPageSlugs, getPageBySlug } from "@/lib/content";
import { HealthInsuranceForm, MedicareForm } from "@/components/forms";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all pages
export async function generateStaticParams() {
  const slugs = getAllPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}/`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      url: `/${page.slug}/`,
    },
  };
}

// Parse form step from slug
function parseFormInfo(slug: string): { type: "health" | "medicare"; step: number } | null {
  // Health form: health-plan-form-m1 through health-plan-form-m7
  const healthMatch = slug.match(/^health-plan-form-m(\d+)$/);
  if (healthMatch) {
    const step = parseInt(healthMatch[1]);
    if (step >= 1 && step <= 7) {
      return { type: "health", step };
    }
  }

  // Medicare form: medicare-plan-form-m1 through medicare-plan-form-m5
  const medicareMatch = slug.match(/^medicare-plan-form-m(\d+)$/);
  if (medicareMatch) {
    const step = parseInt(medicareMatch[1]);
    if (step >= 1 && step <= 5) {
      return { type: "medicare", step };
    }
  }

  return null;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // Check if this is a form page
  const formInfo = parseFormInfo(slug);

  if (formInfo) {
    // Render the appropriate form
    return formInfo.type === "health" ? (
      <HealthInsuranceForm initialStep={formInfo.step} />
    ) : (
      <MedicareForm initialStep={formInfo.step} />
    );
  }

  // Standard page layout
  return (
    <article className="py-12">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h1>{page.title}</h1>

          {page.content ? (
            <div className="prose" dangerouslySetInnerHTML={{ __html: page.content }} />
          ) : (
            <p className="text-gray-600">Content to be migrated.</p>
          )}
        </div>
      </div>
    </article>
  );
}
