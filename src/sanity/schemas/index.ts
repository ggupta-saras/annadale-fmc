import { siteSettings } from "./siteSettings";
import { homepage } from "./homepage";
import { doctor } from "./doctor";
import { staffMember } from "./staffMember";
import { service } from "./service";
import { announcement } from "./announcement";

export const schema = {
  types: [homepage, siteSettings, doctor, staffMember, service, announcement],
};
