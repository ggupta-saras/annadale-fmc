import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { Pill } from "@/components/ui";
import { client } from "@/sanity/lib/client";

// Practice policies (Privacy, Social Media, …) are edited in Studio under
// "Policies". Fallback refresh is one hour; publishing refreshes immediately
// once the Sanity webhook calls /api/revalidate (tag "policies").
export const revalidate = 3600;

interface Policy {
  title: string;
  body: PortableTextBlock[];
}

const POLICY_QUERY = `*[_type == "policy" && slug.current == $slug][0]{ title, body }`;
const fetchOptions = { next: { tags: ["policies"], revalidate: 3600 } };

async function getPolicy(slug: string): Promise<Policy | null> {
  return client.fetch(POLICY_QUERY, { slug }, fetchOptions);
}

// Build the known policies ahead of time; ones added later in Studio still
// render on first request.
export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(
    `*[_type == "policy" && defined(slug.current)].slug.current`,
    {},
    fetchOptions
  );
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const policy = await getPolicy((await params).slug);
  return policy ? { title: policy.title } : {};
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display italic text-[24px] md:text-[28px] text-brand-green-deep leading-tight mt-10 mb-3">{children}</h2>
    ),
    normal: ({ children }) => <p className="mb-4">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 marker:text-brand-green-deep">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} className="underline underline-offset-2 hover:text-ink">{children}</a>
    ),
  },
};

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const policy = await getPolicy((await params).slug);
  if (!policy) notFound();

  return (
    <section className="px-5 md:px-6 pt-16 md:pt-24 pb-20 md:pb-28">
      <div className="max-w-3xl mx-auto">
        <Pill tone="cream">Practice policy</Pill>
        <h1 className="font-display text-[40px] md:text-[60px] leading-[1.05] tracking-tight text-ink mt-5 mb-10">
          {policy.title}
        </h1>
        <div className="text-charcoal/80 text-[16.5px] leading-[1.75]">
          <PortableText value={policy.body} components={components} />
        </div>
      </div>
    </section>
  );
}
