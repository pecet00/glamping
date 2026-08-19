import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";

import { Users } from "./collections/Users";
import { Extras } from "./collections/Extras";

const payloadSecret = process.env.PAYLOAD_SECRET;

if (!payloadSecret) {
  throw new Error("PAYLOAD_SECRET is missing");
}
export default buildConfig({
  secret:payloadSecret,

  admin: {
    user: Users.slug,
  },

  collections: [
    Users,
    Extras,
  ],

  db: sqliteAdapter({
    client: {
      url: "file:./payload.db",
    },
  }),
});