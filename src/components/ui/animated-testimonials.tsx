"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface AnimatedTestimonialsProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  testimonials?: Testimonial[];
  autoRotateInterval?: number;
  trustedCompanies?: string[];
  trustedCompaniesTitle?: string;
  className?: string;
}

export function AnimatedTestimonials({
  title = "Loved by the community",
  subtitle = "Don't just take our word for it. See what developers and companies have to say about our starter template.",
  badgeText = "Trusted by developers",
  testimonials = [],
  autoRotateInterval = 6000,
  trustedCompanies = [],
  trustedCompaniesTitle = "Trusted by developers from companies worldwide",
  className,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [autoRotateInterval, testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={cn("overflow-hidden bg-white py-16 md:py-20", className)}
    >
      <div className="container-main">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-5">
              {badgeText && (
                <div className="inline-flex items-center rounded-md bg-blue-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue">
                  <Star className="mr-1.5 h-3.5 w-3.5 text-blue" strokeWidth={1.5} aria-hidden="true" />
                  <span>{badgeText}</span>
                </div>
              )}

              <h2 className="font-serif text-[clamp(1.5rem,2.2vw,2rem)] font-bold leading-[1.15] text-navy">
                {title}
              </h2>

              <p className="max-w-[540px] text-[0.9375rem] leading-relaxed text-text-muted">{subtitle}</p>

              <div className="flex items-center gap-3 pt-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300",
                      activeIndex === index ? "w-10 bg-navy-deep" : "w-2.5 bg-border"
                    )}
                    aria-label={`View testimonial ${index + 1}`}
                    aria-current={activeIndex === index ? "true" : undefined}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative h-full min-h-[300px] md:min-h-[380px] lg:min-h-[400px]"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 100,
                  scale: activeIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ zIndex: activeIndex === index ? 10 : 0 }}
                aria-hidden={activeIndex !== index}
              >
                <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-soft)] md:p-8">
                  <div className="mb-5 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-rose text-rose"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <div className="relative mb-5 flex-1">
                    <Quote
                      className="absolute -top-2 -left-2 h-7 w-7 rotate-180 text-navy/10"
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                    <p className="relative z-10 text-[0.9375rem] leading-relaxed text-text">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-[0.9375rem] font-semibold text-navy">{testimonial.name}</h3>
                      <p className="text-sm text-text-muted">
                        {testimonial.role}
                        {testimonial.company ? `, ${testimonial.company}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {trustedCompanies.length > 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="mt-12 border-t border-border-soft pt-10 md:mt-14"
          >
            <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-text-muted">
              {trustedCompaniesTitle}
            </h3>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
              {trustedCompanies.map((company) => (
                <div key={company} className="text-[0.8125rem] font-medium text-navy/70">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
