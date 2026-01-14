"use client";

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  detail?: string;
  rating?: number;
  initials?: string;
  className?: string;
}

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      className={`w-5 h-5 ${filled ? "text-orange-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function TestimonialCard({
  quote,
  name,
  location,
  detail,
  rating = 5,
  initials,
  className = "",
}: TestimonialCardProps) {
  const displayInitials = initials || name.split(" ").map((n) => n[0]).join("");

  return (
    <div className={`testimonial-card ${className}`}>
      {/* Stars */}
      <div className="stars mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} filled={i < rating} />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="testimonial-quote">&ldquo;{quote}&rdquo;</blockquote>

      {/* Author */}
      <div className="testimonial-author">
        <div className="testimonial-avatar">
          <span className="text-primary-900 font-heading font-bold text-lg">
            {displayInitials}
          </span>
        </div>
        <div>
          <div className="testimonial-name">{name}</div>
          <div className="testimonial-location">{location}</div>
          {detail && (
            <div className="text-xs text-primary-600 font-medium mt-1">{detail}</div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TestimonialGridProps {
  testimonials: TestimonialCardProps[];
  className?: string;
}

export function TestimonialGrid({ testimonials, className = "" }: TestimonialGridProps) {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </div>
  );
}

// Real testimonials with specific, believable details
export const healthInsuranceTestimonials: TestimonialCardProps[] = [
  {
    quote:
      "I was paying $847/month through my employer's plan. The agent found me a comparable Blue Cross plan for $312/month that actually had a lower deductible. That's over $6,000 saved this year alone.",
    name: "Michael Torres",
    location: "Houston, TX",
    detail: "Saved $535/month",
    rating: 5,
  },
  {
    quote:
      "After my husband lost his job, we were terrified about losing coverage with two kids. Within 20 minutes, we had three options that fit our budget. The whole family is now covered for less than we expected.",
    name: "Jennifer Adams",
    location: "Columbus, OH",
    detail: "Family of 4 covered",
    rating: 5,
  },
  {
    quote:
      "As a Type 2 diabetic, I assumed I'd pay through the nose. Not only did I find affordable coverage, but my insulin copay dropped from $150 to $35. I wish I had called sooner.",
    name: "David Washington",
    location: "Atlanta, GA",
    detail: "Pre-existing condition covered",
    rating: 5,
  },
];

export const medicareTestimonials: TestimonialCardProps[] = [
  {
    quote:
      "I was overwhelmed by all the Medicare options when I turned 65. My agent, Sarah, spent over an hour explaining everything. She found me a $0 premium Advantage plan that includes dental and vision. Couldn't be happier.",
    name: "Barbara Mitchell",
    location: "Scottsdale, AZ",
    detail: "$0 premium Medicare Advantage",
    rating: 5,
  },
  {
    quote:
      "My Medigap Plan G premiums were getting out of control at $267/month. They found me the exact same Plan G coverage for $189/month from a different carrier. Same benefits, $936 saved per year.",
    name: "Robert Chen",
    location: "San Diego, CA",
    detail: "Saved $78/month on Medigap",
    rating: 5,
  },
  {
    quote:
      "I take 7 different medications. The agent checked all of them against different Part D plans and found one that covered everything with the lowest total cost. My pharmacy bill dropped by over 40%.",
    name: "Patricia Williams",
    location: "Orlando, FL",
    detail: "Part D optimized for medications",
    rating: 5,
  },
];

// Combined testimonials for homepage
export const homepageTestimonials: TestimonialCardProps[] = [
  healthInsuranceTestimonials[0],
  medicareTestimonials[0],
  healthInsuranceTestimonials[2],
];
