// JSON-LD structured data. This does not create backlinks, but it tells search
// engines AND answer engines (AI Overviews, ChatGPT, Claude, Gemini,
// Perplexity, Copilot) that AIMERGE, Manuj Aggarwal, and TetraNoodle are one
// connected entity graph, so the few links the site does earn are attributed to
// a recognised organisation rather than an anonymous URL. @id values are shared
// across the graph so the nodes reference each other.
//
// Scoping rule enforced throughout this file: a node ships ONLY on the route
// whose visible content backs it. Google's structured-data policy treats markup
// that is not represented on the page as spam and applies manual actions
// per-site, so one over-broad node puts every other page's markup at risk.
//
// Origin comes from lib/site.ts (single source of truth). The sameAs profiles
// below are the parent brand / external profiles and stay distinct on purpose.
import {
  CONTACT_EMAIL,
  PUBLISHER,
  ROUTES,
  SITE_URL as SITE,
  absoluteUrl,
  slugify,
} from "@/lib/site";

// Same-entity profiles. Add the brand's public X / YouTube URLs here as they go
// live, each one strengthens entity recognition.
const ORG_SAME_AS = [
  "https://www.aimerge.live",
  "https://tetranoodle.com",
  "https://www.linkedin.com/company/tetranoodle",
];

// Manuj's public author / speaker / social profiles.
const FOUNDER_SAME_AS: string[] = [
  "https://www.linkedin.com/in/manujaggarwal",
  "https://manujaggarwal.com",
  "https://manuj.ca",
];

// Stable @id fragments, referenced from several nodes and from page graphs.
const ID = {
  org: `${SITE}/#organization`,
  manuj: `${SITE}/#manuj`,
  website: `${SITE}/#website`,
  service: `${SITE}/#service`,
} as const;

/** `knowsAbout` / `about` topic entities. Naming the subject matter explicitly
 *  is what lets an answer engine resolve "who covers belief patterns in
 *  coaching and consulting businesses" to this organisation instead of
 *  guessing from prose. */
const TOPICS = [
  "Coaching and consulting businesses",
  "Beliefs shaping commercial behavior",
  "Sales conversations for service professionals",
  "Offer design and pricing for consultants",
  "Productization of professional services",
  "Delegation and delivery capacity",
  "Artificial intelligence adoption for service businesses",
  "Professional identity and self-concept in business",
  "Organizational and individual decision-making",
];

// ---------------------------------------------------------------------------
// Site-wide graph: entity nodes that are true on EVERY route.
// Rendered from app/layout.tsx.
//
// The Service node is site-wide rather than homepage-only because the free
// score is the site's entire subject and its CTA is in the header of every
// page. It is not a rich-result type, so it carries no
// markup-without-content risk.
// ---------------------------------------------------------------------------
const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ID.org,
      name: "AIMERGE",
      alternateName: ["AI Merge", "AIMERGE Coaches and Consultants"],
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/icon/logo.png`,
        width: 1274,
        height: 179,
      },
      email: CONTACT_EMAIL,
      description:
        "AI Merge offers the free Coaches and Consultants Belief Score: a personalized reflection of the belief that may be shaping one repeated commercial moment, built from the participant's own words. Its public mechanism is the Pattern-to-Belief Map. Reflective and educational; not a business assessment, personality test, or professional evaluation.",
      founder: { "@id": ID.manuj },
      knowsAbout: TOPICS,
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_EMAIL,
        availableLanguage: "English",
      },
      parentOrganization: {
        "@type": "Organization",
        name: PUBLISHER,
        url: "https://tetranoodle.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vancouver",
          addressRegion: "BC",
          addressCountry: "CA",
        },
      },
      sameAs: ORG_SAME_AS,
    },
    {
      "@type": "Person",
      "@id": ID.manuj,
      name: "Manuj Aggarwal",
      givenName: "Manuj",
      familyName: "Aggarwal",
      jobTitle: "Founder and Chief Information Officer",
      image: `${SITE}/manuj/b76742c9-4955-439c-8a3e-e66d1b07fd3b.jpg`,
      worksFor: { "@id": ID.org },
      knowsAbout: TOPICS,
      description:
        "Founder of AIMERGE and TetraNoodle Technologies. 25-year technology career shipping AI systems with teams at IBM, Microsoft, Pearson, T-Mobile, and the United Nations. Holder of four patents and published in the Mensa Research Journal.",
      sameAs: FOUNDER_SAME_AS,
    },
    {
      "@type": "WebSite",
      "@id": ID.website,
      url: SITE,
      name: "AIMERGE",
      description:
        "The free Coaches and Consultants Belief Score: see the belief that may be shaping one repeated commercial moment.",
      publisher: { "@id": ID.org },
      about: { "@id": ID.service },
      inLanguage: "en",
    },
    {
      // The offering itself. `serviceOutput` and the zero-price Offer are what
      // let an answer engine state plainly that the score is free and what a
      // participant actually receives.
      "@type": "Service",
      "@id": ID.service,
      name: "Coaches and Consultants Belief Score",
      alternateName: "Free Coaches and Consultants Belief Score",
      serviceType: "Reflective assessment and strategic reflection tool",
      url: SITE,
      provider: { "@id": ID.org },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
      ],
      description:
        "A free, personalized reflection built from one recurring business moment a coach or consultant describes in their own words. It returns a Pattern-to-Belief Map naming the repeated moment, a possible belief, the reinforcing loop, the moment to watch, and the next evidence. It is reflective and educational, not a business assessment, personality test, or professional evaluation, and it guarantees no business outcome.",
      audience: {
        "@type": "BusinessAudience",
        name: "Coaches and consultants",
        audienceType:
          "Independent coaches, consultants, advisors, and service-based practice owners who deliver client results but meet recurring commercial friction around selling, pricing, delegation, productization, and follow-up",
      },
      serviceOutput: {
        "@type": "Thing",
        name: "Pattern-to-Belief Map",
        description:
          "A personalized result naming the repeated moment, a possible belief, the reinforcing loop, the moment to watch, and the next evidence.",
      },
      offers: {
        "@type": "Offer",
        price: 0,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description:
          "The complete result is delivered free, with no credit card required, before any paid offer is presented.",
      },
    },
  ],
};

// JSON.stringify output is safe to inject; there is no user input here.
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Entity graph true on every route. Rendered from app/layout.tsx. */
export function StructuredData() {
  return <JsonLd data={siteGraph} />;
}

// ---------------------------------------------------------------------------
// Per-page nodes.
// ---------------------------------------------------------------------------

export type FaqEntry = { question: string; answer: string };

/** FAQPage `mainEntity` array. Callers pass the SAME text that renders on the
 *  page: Google penalises FAQ markup that diverges from visible content, and an
 *  answer engine that quotes markup a reader cannot find loses trust in the
 *  whole domain. */
const faqEntity = (faqs: FaqEntry[]) =>
  faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  }));

/**
 * WebPage + BreadcrumbList for any route, plus whatever page-specific nodes the
 * caller supplies. Every page gets an explicit `about` edge to the Service and
 * an `isPartOf` edge to the WebSite, which is what turns loose URLs into one
 * machine-readable site.
 *
 * `breadcrumb` is omitted on the homepage (a one-item trail is noise) and
 * rendered as a two-item Home → page trail everywhere else, matching the
 * visible breadcrumb in components/content-page.tsx.
 */
export function PageStructuredData({
  name,
  path,
  description,
  updated,
  faqs,
  speakableSelectors,
  extraNodes = [],
}: {
  name: string;
  path: string;
  description: string;
  /** ISO date from the lib/site.ts route registry. */
  updated: string;
  faqs?: FaqEntry[];
  /** CSS selectors for the passages a voice assistant should read aloud. */
  speakableSelectors?: string[];
  extraNodes?: object[];
}) {
  const url = absoluteUrl(path);
  const isHome = path === "/";
  const breadcrumbId = `${url}#breadcrumb`;

  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.service },
    publisher: { "@id": ID.org },
    inLanguage: "en",
    dateModified: updated,
  };

  if (speakableSelectors?.length) {
    webPage.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: speakableSelectors,
    };
  }

  const nodes: object[] = [webPage];

  if (!isHome) {
    webPage.breadcrumb = { "@id": breadcrumbId };
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    });
  }

  if (faqs?.length) {
    const faqId = `${url}#faq`;
    webPage.mainEntity = { "@id": faqId };
    nodes.push({
      "@type": "FAQPage",
      "@id": faqId,
      url,
      mainEntity: faqEntity(faqs),
    });
  }

  nodes.push(...extraNodes);

  return <JsonLd data={{ "@context": "https://schema.org", "@graph": nodes }} />;
}

// ---------------------------------------------------------------------------
// Homepage-only nodes: content that exists ONLY on "/".
// ---------------------------------------------------------------------------

/**
 * The hero VSL node.
 *
 * DELIBERATELY NOT EXPORTED FOR USE YET. There is no approved Coaches and
 * Consultants cut, so the hero currently renders a placeholder card instead of
 * a <video> (see components/vsl-player.tsx). Emitting a VideoObject while no
 * video exists on the page is precisely the markup-without-visible-content case
 * Google treats as spam, and it is the same rule this file enforces everywhere
 * else by scoping nodes per route.
 *
 * TODO(launch): once the approved cut ships, fill in contentUrl/thumbnail with
 * the real filenames, set uploadDate to the real publish date, add `duration`
 * from the measured cut, and re-add `videoNode` to the homepage's extraNodes in
 * app/page.tsx.
 */
export const videoNode = {
  "@type": "VideoObject",
  "@id": `${SITE}/#vsl`,
  name: "AI Merge Coaches and Consultants Belief Score introduction",
  description:
    "What the free Coaches and Consultants Belief Score examines: the belief that may be shaping one repeated commercial moment, built from the participant's own account of what keeps happening.",
  // TODO(launch): real file, real date, real duration.
  contentUrl: `${SITE}/video/TODO-approved-coaches-vsl.mp4`,
  uploadDate: "2026-08-03",
  publisher: { "@id": ID.org },
  inLanguage: "en",
  isFamilyFriendly: true,
};

/** The four-step process rendered in the "How the Score Works" block. Google
 *  retired HowTo rich results in 2023, but the markup remains valid schema.org
 *  and is read by answer engines, which is the audience that matters here. */
export const howToNode = {
  "@type": "HowTo",
  "@id": `${SITE}/#howto`,
  name: "How to get your free Coaches and Consultants Belief Score",
  description:
    "Four steps from one recurring business pattern to a personalized Pattern-to-Belief Map you can accept, refine, question, or reject.",
  // No `totalTime`: the site never states how long the reflection takes, and a
  // guessed duration is a factual claim an answer engine would repeat as ours.
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: 0 },
  supply: {
    "@type": "HowToSupply",
    name: "One recurring business pattern you can describe in your own words",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose one pattern",
      text: "Focus on one business situation that matters now, such as building instead of selling, softening the recommendation, overcustomizing delivery, or avoiding follow-up. Not your entire business.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Describe what happens",
      text: "Complete a short guided reflection in your own words. You do not need business jargon, there is no perfect wording, and messy answers are allowed.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Receive your Pattern-to-Belief Map",
      text: "Your personalized result shows the repeated moment, a possible belief, the reinforcing loop, the moment to watch, and the next evidence.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Decide what fits",
      text: "Keep what feels accurate. Question, correct, refine, or reject what does not. You remain the authority on your business and experience.",
    },
  ],
};

/** The Mensa Research Journal publication behind the methodology. */
export const publicationNode = {
  "@type": "ScholarlyArticle",
  "@id": `${SITE}/#mensa`,
  name: "AI Merge belief update protocol",
  author: { "@id": ID.manuj },
  publisher: { "@id": ID.org },
  datePublished: "2025",
  about: TOPICS,
  isPartOf: {
    "@type": "PublicationVolume",
    volumeNumber: "56",
    issueNumber: "2",
    datePublished: "2025",
    isPartOf: {
      "@type": "Periodical",
      name: "Mensa Research Journal",
      issn: "0270-5230",
    },
  },
};

/** Glossary terms, emitted as a DefinedTermSet on /glossary. This is the node
 *  that lets an assistant answer "what is a Pattern-to-Belief Map" with the
 *  site's own definition rather than a paraphrase of the marketing copy. */
export function definedTermSetNode(
  terms: { term: string; definition: string }[]
) {
  const url = absoluteUrl(ROUTES.glossary.path);
  return {
    "@type": "DefinedTermSet",
    "@id": `${url}#terms`,
    name: "AI Merge coaches and consultants glossary",
    url,
    description:
      "Definitions of the terms used by the Coaches and Consultants Belief Score, including belief, Pattern-to-Belief Map, reinforcing loop, and next evidence.",
    inLanguage: "en",
    publisher: { "@id": ID.org },
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${url}#${slugify(t.term)}`,
      name: t.term,
      description: t.definition,
      inDefinedTermSet: { "@id": `${url}#terms` },
      url: `${url}#${slugify(t.term)}`,
    })),
  };
}
