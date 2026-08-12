import { siteSettings } from "./siteSettings";
import { homepage } from "./homepage";
import { doctor } from "./doctor";
import { staffMember } from "./staffMember";
import { service } from "./service";
import { alliedHealthPage } from "./alliedHealthPage";
import { alliedHealthPractitioner } from "./alliedHealthPractitioner";
import { announcement } from "./announcement";

export const schema = {
  types: [homepage, siteSettings, doctor, staffMember, service, alliedHealthPage, alliedHealthPractitioner, announcement],
};
