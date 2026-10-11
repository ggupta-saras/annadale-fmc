import { groupedHours, type HoursRow } from "./hours";

export const siteConfig = {
  name: "Annadale Family Medical Centre",
  shortName: "Annadale FMC",
  tagline: "Your health. Your family. Your community.",
  phone: "(03) 9038 8342",
  phoneHref: "tel:0390388342",
  email: "reception@annadalefmc.com.au",
  address: {
    street: "2/3 Enderby Drive",
    suburb: "Mickleham",
    state: "VIC",
    postcode: "3064",
    full: "2/3 Enderby Drive, Mickleham VIC 3064",
    mapsUrl: "https://maps.google.com/?q=2/3+Enderby+Drive+Mickleham+VIC+3064",
  },
  booking: {
    url: "https://healthengine.com.au/medical-centre/vic/mickleham/annadale-family-medical-centre/s71806",
    provider: "HealthEngine",
  },
  // Derived from lib/hours.ts — edit the hours there, not here.
  hours: [...groupedHours(), { day: "Public Holidays", time: "Closed" }] as HoursRow[],
  afterHours: {
    homeDoctors: "13SICK (13 7425)",
    healthdirect: "1800 022 222",
    emergency: "000",
  },
  bulkBilling: true,
  facebook: "https://www.facebook.com/AnndaleFMC/",
};
