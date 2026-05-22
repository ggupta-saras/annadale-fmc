import type { Metadata } from "next";
import { UserCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the doctors, nurses, and admin team at Annadale Family Medical Centre.",
};

// Placeholder team data — replace with Sanity queries once configured
const doctors = [
  {
    name: "Dr. [Name]",
    qualifications: "MBBS, FRACGP",
    bio: "Dr. [Name] is a Fellow of the Royal Australian College of General Practitioners with a special interest in preventive health and chronic disease management. They welcome patients of all ages and backgrounds.",
    interests: ["Preventive Health", "Chronic Disease", "Men's Health"],
    acceptingNew: true,
  },
];

const staff = [
  { name: "[Practice Manager Name]", role: "Practice Manager" },
  { name: "[Nurse Name]", role: "Practice Nurse" },
  { name: "[Reception Name]", role: "Receptionist" },
];

export default function OurTeamPage() {
  return (
    <>
      <section className="bg-navy text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">Our Team</h1>
          <p className="text-cyan-200">
            Meet the dedicated professionals caring for your health.
          </p>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-14 px-4 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-navy mb-8">Our Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map((doc) => (
              <div key={doc.name} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex gap-5">
                <div className="w-20 h-20 rounded-full bg-teal-light flex items-center justify-center shrink-0">
                  <UserCircle size={48} className="text-teal" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="font-bold text-navy">{doc.name}</h3>
                      <p className="text-xs text-slate-500 mb-2">{doc.qualifications}</p>
                    </div>
                    {doc.acceptingNew && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium shrink-0">
                        Accepting new patients
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3">{doc.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.interests.map((interest) => (
                      <span key={interest} className="text-xs bg-teal-light text-teal px-2 py-0.5 rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Staff */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-navy mb-6">Our Support Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {staff.map((member) => (
              <div key={member.name} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-light flex items-center justify-center shrink-0">
                  <UserCircle size={28} className="text-teal" />
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
