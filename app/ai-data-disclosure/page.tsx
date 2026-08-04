import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { pageMetadata, relatedLinks } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "AI and Data Disclosure",
  description:
    "How artificial intelligence is used in the Coaches and Consultants Belief Score, what information it processes, and the limits of what it can tell you.",
  route: "aiDataDisclosure",
});

export default function AiDataDisclosurePage() {
  return (
    <ContentPage
      route="aiDataDisclosure"
      title="AI and Data Disclosure"
      description="How artificial intelligence is used in the Coaches and Consultants Belief Score, what information it processes, and the limits of what it can tell you."
      related={relatedLinks("privacy", "professionalDisclaimer", "glossary", "faq")}
    >
        <section>
          <h2 className="text-title">Where AI is used</h2>
          <p className="mt-3">
            The Coaches and Consultants Belief Score uses artificial
            intelligence to help organize the information you choose to
            provide during the guided reflection. The system helps connect
            what you describe: what happens, what you do next, what tends to
            follow, what the repeated moment may have come to mean, and how
            the loop may keep reinforcing itself. The result you receive is
            generated with the assistance of AI, based on your own words.
          </p>
        </section>
        <section>
          <h2 className="text-title">AI-generated avatar and voice</h2>
          <p className="mt-3">
            The video on this site uses an AI-generated avatar and voice of
            Manuj Aggarwal. The words and methodology are his; the on-screen
            presenter is synthesized.
          </p>
        </section>
        <section>
          <h2 className="text-title">What the AI does not do</h2>
          <p className="mt-3">
            The system does not independently know your full business. It does
            not access your CRM, client files, financial accounts, private
            communications, calendar, or business systems unless a future
            product explicitly requests and discloses such access. It does not
            evaluate your methodology, competence, ethics, pricing, or
            professional suitability, and it does not decide what is true
            about you or your business: the result is a possible
            interpretation offered for your reflection, and you remain the
            authority on what fits.
          </p>
        </section>
        <section>
          <h2 className="text-title">Limitations of AI-generated content</h2>
          <p className="mt-3">
            AI-generated reflections can be incomplete, imprecise, or simply
            wrong. Treat your result as a hypothesis to examine, refine,
            accept, or reject, not as a factual statement about you or your
            business. Do not make legal, tax, financial, employment, or
            medical decisions based on it. See the{" "}
            <Link
              href="/professional-disclaimer"
              className="font-medium text-fg underline underline-offset-4"
            >
              Professional Services Disclaimer
            </Link>{" "}
            for the full boundaries.
          </p>
        </section>
        <section>
          <h2 className="text-title">How your information is handled</h2>
          <p className="mt-3">
            The answers you provide are used to generate your personalized
            result. Selected team members may review limited information for
            quality assurance, safety, support, or system improvement.
            Third-party AI and infrastructure providers process data on our
            behalf under contractual obligations. For collection, retention,
            and your rights (including access and deletion requests), see the{" "}
            <Link
              href="/privacy"
              className="font-medium text-fg underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
          {/* TODO(launch): verify each statement above against live operating
              practice, vendor configuration, the model-training policy, the
              human-review policy, and retention/deletion procedures before
              publishing. Do NOT add claims that information is never
              reviewed, never shared, never sold, or excluded from AI
              training unless those statements are verified and approved. */}
        </section>
        <section>
          <h2 className="text-title">Human oversight</h2>
          <p className="mt-3">
            AI output in this product is subject to human oversight processes,
            and the experience is designed so that you, the participant, make
            the final judgment about what is true for you. If a result ever
            feels harmful or clearly wrong, contact us at{" "}
            <a
              className="font-medium text-fg underline underline-offset-4"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>{" "}
            so we can review it.
          </p>
        </section>
        <section>
          <h2 className="text-title">Changes</h2>
          <p className="mt-3">
            If how we use AI or handle data changes materially, we will update
            this page and revise the date above.
          </p>
        </section>
    </ContentPage>
  );
}
