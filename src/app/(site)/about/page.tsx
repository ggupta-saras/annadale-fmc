import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Annadale Family Medical Centre — our history, values, and commitment to community health.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">Our Practice</h1>
          <p className="text-blue-200">
            Where expert medicine meets genuine human care.
          </p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Image
            src="/team-reception.jpg"
            alt="The Annadale FMC team at reception"
            width={900}
            height={600}
            className="rounded-2xl shadow-md w-full mb-10 object-cover"
          />
        </div>
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h2 className="text-xl font-bold text-navy mb-4">Our Practice</h2>
          <p className="text-slate-500 leading-relaxed mb-4">
            Annadale Family Medical Centre was built on a simple belief: you deserve a doctor
            who knows you. Not just your file — but your life, your family, your goals. We bring
            together the rigour of evidence-based medicine and the warmth of a practice that&apos;s
            truly part of your community, caring for local families across generations.
          </p>

          <h2 className="text-xl font-bold text-navy mb-4 mt-8">Our Values</h2>
          <ul className="space-y-3 text-slate-500">
            {[
              { title: "Compassion", desc: "Every consultation is unhurried. You're heard, not just diagnosed." },
              { title: "Continuity", desc: "We invest in long-term relationships. The best care comes from a doctor who knows your whole story." },
              { title: "Quality", desc: "Our GPs pursue ongoing education and practise to the highest standards — so you always get the best available care." },
              { title: "Community", desc: "We live here too. Your neighbourhood's health is personal to us." },
            ].map(({ title, desc }) => (
              <li key={title} className="flex gap-3">
                <span className="text-teal font-bold shrink-0">✓</span>
                <span><strong className="text-navy">{title}:</strong> {desc}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-navy mb-4 mt-8">Billing</h2>
          <p className="text-slate-500 leading-relaxed">
            We believe good healthcare should be accessible.
          </p>
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
