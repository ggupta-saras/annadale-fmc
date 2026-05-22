import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Annadale Family Medical Centre — our history, values, and commitment to community health.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">About Us</h1>
          <p className="text-cyan-200">
            A trusted general practice serving the Annadale community.
          </p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h2 className="text-xl font-bold text-navy mb-4">Our Practice</h2>
          <p className="text-slate-500 leading-relaxed mb-4">
            Annadale Family Medical Centre is a full-service general practice dedicated to
            providing high-quality, patient-centred care to individuals and families in
            our community. We believe in building long-term relationships with our
            patients — getting to know you, your history, and your goals for health.
          </p>
          <p className="text-slate-500 leading-relaxed mb-4">
            Our GPs are committed to ongoing education and staying current with the latest
            evidence-based medicine, so you can trust that you're receiving the best
            possible care.
          </p>

          <h2 className="text-xl font-bold text-navy mb-4 mt-8">Our Values</h2>
          <ul className="space-y-3 text-slate-500">
            {[
              { title: "Compassion", desc: "We treat every patient with empathy and respect." },
              { title: "Continuity", desc: "We value long-term relationships and understanding your full health picture." },
              { title: "Quality", desc: "Evidence-based, up-to-date care you can count on." },
              { title: "Community", desc: "We are part of this neighbourhood and invested in its wellbeing." },
            ].map(({ title, desc }) => (
              <li key={title} className="flex gap-3">
                <span className="text-teal font-bold shrink-0">✓</span>
                <span><strong className="text-navy">{title}:</strong> {desc}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-navy mb-4 mt-8">Billing</h2>
          <p className="text-slate-500 leading-relaxed">
            We offer bulk billing for concession card holders, children under 16, and
            patients with certain health care plans. Standard appointment fees apply for
            private patients — please contact us for current fee information.
          </p>

          <div className="mt-8">
            <Link
              href="/our-team"
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-5 py-2.5 rounded-full hover:bg-navy-dark transition-colors text-sm"
            >
              Meet Our Team →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
