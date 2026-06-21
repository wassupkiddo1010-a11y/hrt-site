import { GetStartedButton } from "@/components/ui/get-started-button";

export default function CTABanner() {
  return (
    <section id="get-started" className="section bg-bg border-t border-border-soft">
      <div className="container-main text-center">
        <h2 className="section-heading max-w-xl mx-auto">
          Start Your Personalized Hormone Health Journey
        </h2>
        <GetStartedButton size="lg" variant="rose">
          Get Started Today
        </GetStartedButton>
        <p className="mt-5 text-[0.8125rem] tracking-wide text-text-muted">
          Secure &nbsp;•&nbsp; Private &nbsp;•&nbsp; Confidential
        </p>
      </div>
    </section>
  );
}
