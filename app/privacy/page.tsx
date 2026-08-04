import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { pageMetadata, relatedLinks } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How AIMERGE collects, uses, and protects your information.",
  route: "privacy",
});

export default function PrivacyPage() {
  return (
    <ContentPage
      route="privacy"
      title="Privacy Policy"
      description="How AIMERGE collects, uses, and protects your information."
      related={relatedLinks("aiDataDisclosure", "terms", "faq", "professionalDisclaimer")}
    >
        <section>
          <h2 className="text-title">What we collect</h2>
          <p className="mt-3">
            This page is a doorway to the free Coaches and Consultants Belief
            Score. On this site itself we record how you found us: the
            referring page, UTM campaign parameters, and ad click identifiers,
            so we know which channels are working. When you continue to the
            assessment, the answers you write there are collected by the
            assessment in order to generate your personalized result.
          </p>
        </section>
        <section>
          <h2 className="text-title">Analytics &amp; cookies</h2>
          <p className="mt-3">
            With your consent, we use PostHog for product analytics and
            session replay (with keyboard input masked) and the Meta Pixel for
            advertising measurement. These tools use cookies and local storage
            to distinguish visitors and only run after you accept them in the
            cookie banner; declining keeps them off. We also use Vercel
            Analytics, which is cookieless and collects no personal data. We
            use this data to improve the site and measure campaigns.
          </p>
        </section>
        <section>
          <h2 className="text-title">How your answers are used</h2>
          <p className="mt-3">
            Your answers are used to generate your personalized Coaches and
            Consultants Belief Score. Selected team members may review limited
            information for quality assurance, safety, support, or system
            improvement. Third-party AI and infrastructure providers process
            data on our behalf under contractual obligations. See the{" "}
            <Link
              href="/ai-data-disclosure"
              className="font-medium text-fg underline underline-offset-4"
            >
              AI and Data Disclosure
            </Link>{" "}
            for how AI is involved and what it cannot do.
          </p>
        </section>
        <section>
          <h2 className="text-title">Your rights</h2>
          <p className="mt-3">
            You can request a copy of your data, correction, or deletion at
            any time by emailing{" "}
            <a
              className="font-medium text-fg underline underline-offset-4"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
            . We respond within 30 days.
          </p>
        </section>
        <section>
          <h2 className="text-title">Changes</h2>
          <p className="mt-3">
            If this policy changes materially we will note it here and revise
            the date above.
          </p>
        </section>
    </ContentPage>
  );
}
