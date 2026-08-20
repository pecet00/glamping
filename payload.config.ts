import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";

import { Users } from "./collections/Users";
import { Extras } from "./collections/Extras";
import { ConfigurationRequests } from "./collections/ConfigurationRequests";
import { ContactRequests } from "./collections/ContactRequests";

const payloadSecret = process.env.PAYLOAD_SECRET;
const databaseUrl = process.env.DATABASE_URL;

if (!payloadSecret) {
  throw new Error("PAYLOAD_SECRET is missing");
}

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing");
}

export default buildConfig({
  secret: payloadSecret,

  admin: {
    user: Users.slug,
  },

  collections: [
    Users,
    Extras,
    ConfigurationRequests,
    ContactRequests,
  ],

  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
    },
  }),
});
