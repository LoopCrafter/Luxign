import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Subject is required"),
  category: z.enum([
    "Support",
    "Bug Report",
    "Feature Request",
    "Business",
    "Other",
  ]),
  message: z.string().min(10, "Message is too short"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
