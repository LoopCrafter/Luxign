import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ai-decoration_owner:npg_3CyI9UvBNgwV@ep-damp-cherry-a2pby8s1-pooler.eu-central-1.aws.neon.tech/ai-decoration?sslmode=require",
  },
});
