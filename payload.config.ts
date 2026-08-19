import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";

import { Users } from "./collections/Users";
import { Extras } from "./collections/Extras";

export default buildConfig({
  secret:
    process.env.PAYLOAD_SECRET,

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