"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function ContactForm() {
  const [topic, setTopic] = useState("General enquiry");
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-line p-7 md:p-10">
      <h2 className="font-display text-3xl md:text-4xl text-ink">Send a message</h2>
      <p className="text-[14px] text-charcoal/75 mt-2">
        This form is for general enquiries, feedback, and admin questions. For appointments, please book online or call us.
        <span className="block mt-1 text-brand-purple-deep font-semibold">Do not send clinical or urgent information through this form.</span>
      </p>

      {sent ? (
        <div className="mt-8 bg-green-tint rounded-2xl p-6 flex items-start gap-4 border border-brand-green/20">
          <span className="grid place-items-center w-10 h-10 rounded-full bg-brand-green-deep text-white shrink-0">
            <Check size={18} strokeWidth={3} />
          </span>
          <div>
            <p className="font-display italic text-xl text-brand-green-deep">Thanks — we got it.</p>
            <p className="text-[13.5px] text-charcoal/80 mt-1">We&apos;ll reply within one business day. For anything urgent, please call (03) 9038 8342.</p>
          </div>
        </div>
      ) : (
        <form className="mt-7 grid gap-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <div>
            <label className="text-[12px] font-semibold text-muted uppercase tracking-wider">What&apos;s this about?</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {["General enquiry", "Feedback", "Billing question", "Other"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className={`px-3.5 py-2 rounded-full text-[12.5px] font-semibold border transition-colors ${
                    topic === t ? "bg-ink text-white border-ink" : "bg-white text-ink border-line hover:border-ink/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-semibold text-muted uppercase tracking-wider">Your name</label>
              <input type="text" required className="mt-2 w-full px-4 py-3 rounded-xl border border-line bg-white text-[14.5px] focus:outline-none focus:border-brand-green-deep" placeholder="Jane Smith" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-muted uppercase tracking-wider">Phone (optional)</label>
              <input type="tel" className="mt-2 w-full px-4 py-3 rounded-xl border border-line bg-white text-[14.5px] focus:outline-none focus:border-brand-green-deep" placeholder="04xx xxx xxx" />
            </div>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-muted uppercase tracking-wider">Email</label>
            <input type="email" required className="mt-2 w-full px-4 py-3 rounded-xl border border-line bg-white text-[14.5px] focus:outline-none focus:border-brand-green-deep" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-muted uppercase tracking-wider">Message</label>
            <textarea required rows={4} className="mt-2 w-full px-4 py-3 rounded-xl border border-line bg-white text-[14.5px] focus:outline-none focus:border-brand-green-deep" placeholder="How can we help?" />
          </div>
          <button type="submit" className="justify-self-start inline-flex items-center gap-2 bg-brand-green-deep hover:bg-brand-green-darker text-white font-semibold px-6 py-3.5 rounded-full">
            Send message <ArrowRight size={15} />
          </button>
        </form>
      )}
    </div>
  );
}
