import { siteSettings } from "./siteSettings";
import { homepage } from "./homepage";
import { doctor } from "./doctor";
import { staffMember } from "./staffMember";
import { service } from "./service";
import { alliedHealthPage } from "./alliedHealthPage";
import { alliedHealthPractitioner } from "./alliedHealthPractitioner";
import { beveridgePage } from "./beveridgePage";
import { openingHours } from "./openingHours";
import { announcement } from "./announcement";
import { policy } from "./policy";

export const schema = {
  types: [homepage, siteSettings, doctor, staffMember, service, alliedHealthPage, alliedHealthPractitioner, beveridgePage, openingHours, announcement, policy],
};
