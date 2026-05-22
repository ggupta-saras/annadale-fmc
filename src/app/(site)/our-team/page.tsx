import type { Metadata } from "next";
import { UserCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the doctors, nurses, and admin team at Annadale Family Medical Centre.",
};

const doctors = [
  {
    name: "Dr Simon Goode",
    qualifications: "MBBS",
    bio: "Dr Simon Goode joined Annadale FMC in 2019. Having lived in Australia for many years, Dr Simon attained a Bachelor of Human Biology and Bachelor of Medicine and Surgery at the Auckland School of Medicine in New Zealand. He has held GP positions at several practices across NSW and VIC, bringing broad experience to our community.",
    interests: ["General Practice", "Family Medicine", "Preventive Health"],
    acceptingNew: true,
    languages: ["English"],
  },
  {
    name: "Dr Wasantha Gunathilake",
    qualifications: "MBBS, FRACGP",
    bio: "Dr Wasantha graduated from Sri Lanka and built extensive experience in cardiology before moving to Australia. An experienced GP, he started his own general practice in 2011 and served communities in Bendigo and Geelong before moving to Craigieburn in 2015. He obtained his Fellowship with the RACGP in 2014.",
    interests: ["Cardiology", "Chronic Disease Management", "General Practice"],
    acceptingNew: true,
    languages: ["English", "Sinhala"],
  },
  {
    name: "Dr Michael Yuen",
    qualifications: "MBBS",
    bio: "Dr Michael is an experienced male General Practitioner committed to providing quality, patient-centred care to the Mickleham community and surrounding areas.",
    interests: ["General Practice", "Family Medicine"],
    acceptingNew: true,
    languages: ["English", "Cantonese", "Mandarin"],
  },
];

const staff = [
  {
    name: "Rosalee",
    role: "Practice Manager",
    bio: "Rosalee brings strong commitment to patient care, team leadership, and the smooth day-to-day operation of the clinic. With a warm and approachable manner, she works closely with doctors, nurses, and administrative staff to ensure every patient receives professional, efficient, and compassionate service.",
  },
  {
    name: "Emily & Elaine",
    role: "Reception Team",
    bio: "Emily and Elaine are the friendly faces at our front desk — known for their professionalism and dedication to patient care. As the first point of contact, they help create a welcoming environment while assisting with appointments, enquiries, and day-to-day administration.",
  },
  {
    name: "Kardinia & Manpreet",
    role: "Practice Nurses",
    bio: "Kardinia and Manpreet are compassionate and highly skilled nursing staff committed to delivering quality patient care and clinical support. They work closely with the medical team to provide professional nursing services, health education, and ongoing patient assistance.",
  },
];

export default function OurTeamPage() {
  return (
    <>
      <section className="bg-navy text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">Our Team</h1>
          <p className="text-blue-200">
            Experienced, compassionate professionals dedicated to your health and wellbeing.
          </p>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-14 px-4 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-navy mb-8">Our Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map((doc) => (
              <div key={doc.name} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <div className="flex gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-teal-light flex items-center justify-center shrink-0">
                    <UserCircle size={40} className="text-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy">{doc.name}</h3>
                    <p className="text-xs text-slate-500">{doc.qualifications}</p>
                    {doc.acceptingNew && (
                      <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        Accepting new patients
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">{doc.bio}</p>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap gap-1.5">
                    {doc.interests.map((i) => (
                      <span key={i} className="text-xs bg-teal-light text-teal px-2 py-0.5 rounded-full">{i}</span>
                    ))}
                  </div>
                  {doc.languages.length > 1 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {doc.languages.slice(1).map((lang) => (
                        <span
                          key={lang}
                          className="text-xs bg-purple-tint text-purple-deep border border-purple-light px-2 py-0.5 rounded-full font-medium"
                        >
                          🗣 {lang}
                        </span>
                      ))}
                    </div>
                  )}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {staff.map((member) => (
              <div key={member.name} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-teal-light flex items-center justify-center shrink-0">
                    <UserCircle size={28} className="text-teal" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
