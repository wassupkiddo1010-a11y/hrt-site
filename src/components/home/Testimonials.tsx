import {
  AnimatedTestimonials,
  type Testimonial,
} from "@/components/ui/animated-testimonials";
import { hero, testimonials } from "@/data/siteContent";

const patientTestimonials: Testimonial[] = testimonials.map((t) => ({
  id: t.id,
  name: t.name,
  role: t.role,
  company: t.company,
  content: t.quote,
  rating: t.rating,
  avatar: t.avatar,
}));

export default function Testimonials() {
  return (
    <AnimatedTestimonials
      title="Customers Are Just Loving HRT"
      subtitle="Real feedback from patients using our provider-guided hormone care and at-home testing."
      badgeText="4.75 average rating"
      testimonials={patientTestimonials}
      trustedCompanies={hero.trust}
      trustedCompaniesTitle="Why patients trust HRT.org"
      className="bg-bg-subtle"
      autoRotateInterval={7000}
    />
  );
}
