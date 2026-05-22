import { siteSettings } from "./siteSettings";
import { doctor } from "./doctor";
import { staffMember } from "./staffMember";
import { service } from "./service";
import { announcement } from "./announcement";

export const schema = {
  types: [siteSettings, doctor, staffMember, service, announcement],
};
