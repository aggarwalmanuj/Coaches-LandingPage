import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { pageMetadata, relatedLinks } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms that govern your use of the AIMERGE website.",
  route: "terms",
});

export default function TermsPage() {
  return (
    <ContentPage
      route="terms"
      title="Terms of Use"
      description="The terms that govern your use of the AIMERGE website."
      related={relatedLinks("privacy", "professionalDisclaimer", "faq", "aiDataDisclosure")}
    >
        <section>
          <h2 className="text-title">The free Belief Score</h2>
          <p className="mt-3">
            The Coaches and Consultants Belief Score is free and creates no
            obligation on either side. No credit card is required. You receive
            the complete free result before any optional paid offer is
            presented; any paid next step is optional.
          </p>
        </section>
        <section>
          <h2 className="text-title">No professional advice</h2>
          <p className="mt-3">
            AIMERGE provides educational and reflective tools. Nothing on this
            site is business consulting, legal, tax, financial, investment,
            employment, medical, or mental-health advice, and nothing here
            diagnoses or treats any condition. The score guarantees no client,
            revenue, pricing, scale, or other business outcome. See the{" "}
            <Link
              href="/professional-disclaimer"
              className="font-medium text-fg underline underline-offset-4"
            >
              Professional Services Disclaimer
            </Link>
            . Consult a qualified professional where that is what you need.
          </p>
        </section>
        <section>
          <h2 className="text-title">Your result</h2>
          <p className="mt-3">
            Your result is a hypothesis offered for reflection, not a finding
            about you, your business, your ability, or your value. Keep what
            fits; correct, refine, question, or reject what does not. You are
            responsible for the decisions you make about your business.
          </p>
        </section>
        <section>
          <h2 className="text-title">Acceptable use</h2>
          <p className="mt-3">
            Don&apos;t abuse the site: no scraping, no automated submissions,
            no attempts to access other people&apos;s data. We may remove
            entries that look fraudulent.
          </p>
        </section>
        <section>
          <h2 className="text-title">Intellectual property</h2>
          <p className="mt-3">
            AI Merge, the Coaches and Consultants Belief Score, and the
            Pattern-to-Belief Map are proprietary intellectual property
            created by Manuj Aggarwal and operated by TetraNoodle
            Technologies. Your own result is yours to use.
          </p>
        </section>
        <section>
          <h2 className="text-title">Liability</h2>
          <p className="mt-3">
            The site is provided as-is. To the maximum extent permitted by
            law, our total liability for any claim related to the site is
            limited to the amount you paid us in the preceding 12 months.
          </p>
        </section>
        <section>
          <h2 className="text-title">Contact</h2>
          <p className="mt-3">
            Questions? Email{" "}
            <a
              className="font-medium text-fg underline underline-offset-4"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
    </ContentPage>
  );
}
