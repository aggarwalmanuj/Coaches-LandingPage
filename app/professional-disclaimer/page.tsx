import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";
import { pageMetadata, relatedLinks } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Professional Services Disclaimer",
  description:
    "The Coaches and Consultants Belief Score is an educational, reflective tool. It is not business consulting, legal, tax, financial, or professional advice, and it guarantees no business outcome.",
  route: "professionalDisclaimer",
});

export default function ProfessionalDisclaimerPage() {
  return (
    <ContentPage
      route="professionalDisclaimer"
      title="Professional Services Disclaimer"
      description="The Coaches and Consultants Belief Score is an educational, reflective tool. It is not business consulting, legal, tax, financial, or professional advice, and it guarantees no business outcome."
      related={relatedLinks("faq", "terms", "aiDataDisclosure", "accessibility")}
    >
        <section>
          <h2 className="text-title">Educational and reflective use only</h2>
          <p className="mt-3">
            The Coaches and Consultants Belief Score, AI Merge, and all
            content on this website are provided for educational and
            reflective purposes only. The result is a hypothesis offered for
            your consideration, not a finding, an evaluation, or a
            professional opinion. You remain the authority on your business
            and your experience.
          </p>
        </section>

        <section>
          <h2 className="text-title">What this is not</h2>
          <p className="mt-3">
            The Coaches and Consultants Belief Score is not:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>business consulting;</li>
            <li>legal advice;</li>
            <li>tax advice;</li>
            <li>financial advice;</li>
            <li>investment advice;</li>
            <li>employment advice;</li>
            <li>professional supervision;</li>
            <li>medical advice;</li>
            <li>mental-health treatment;</li>
            <li>diagnosis;</li>
            <li>psychotherapy;</li>
            <li>crisis support.</li>
          </ul>
          <p className="mt-3">
            Using this website or completing the assessment does not create a
            consultant-client, coach-client, advisor-client, therapeutic, or
            any other professional relationship.
          </p>
        </section>

        <section>
          <h2 className="text-title">No business assessment or evaluation</h2>
          <p className="mt-3">
            The score does not evaluate your methodology, competence, ethics,
            pricing, business maturity, or professional suitability. It is not
            a business assessment, a personality test, a certification, or a
            professional evaluation. It focuses on one recurring pattern you
            choose to describe.
          </p>
        </section>

        <section>
          <h2 className="text-title">No guaranteed outcome</h2>
          <p className="mt-3">
            Nothing on this site is a guarantee of clients, revenue, pricing,
            scale, conversion, or any other business outcome. Commercial
            results are influenced by many practical factors, including
            demand, offer quality, positioning, pricing, proof, distribution,
            timing, competition, purchasing capacity, sales skill, client fit,
            delivery quality, systems, capital, health, relationships, and
            broader economic conditions. The score examines whether one
            repeated business moment may also contain a belief layer; it does
            not claim belief is the sole cause of any result.
          </p>
        </section>

        <section>
          <h2 className="text-title">Individual results vary</h2>
          <p className="mt-3">
            Participant experiences shared on this site are individual
            accounts. They are not promises or guarantees of any outcome, and
            they do not indicate that another participant will receive the
            same result or business outcome.
          </p>
        </section>

        <section>
          <h2 className="text-title">Seek qualified support</h2>
          <p className="mt-3">
            Use your own judgment and seek qualified professional support when
            you need it. Consult an appropriately licensed or accredited
            professional for legal, tax, financial, employment, medical, or
            mental-health matters. If you are in immediate danger or
            experiencing a mental-health emergency, contact local emergency
            services. In the United States and Canada, call or text 988
            (Suicide and Crisis Lifeline) or dial 911. Outside North America,
            contact your local emergency number or a crisis-support service in
            your country.
          </p>
        </section>
    </ContentPage>
  );
}
