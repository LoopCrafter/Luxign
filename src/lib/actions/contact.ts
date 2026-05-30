"use server";

import { Resend } from "resend";
import { contactSchema } from "../schema/contact";

export type ContactState = {
  success: boolean;
  errors?: Record<string, string[]>;
  values?: {
    name: string;
    email: string;
    subject: string;
    category: string;
    message: string;
  };
};

export async function sendContactMessage(prevState: any, formData: FormData) {
  const raw = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    subject: formData.get("subject")?.toString() || "",
    category: formData.get("category")?.toString() || "Support",
    message: formData.get("message")?.toString() || "",
  };
  const resend = new Resend(process.env.RESEND_API_KEY!);

  const parsed = contactSchema.safeParse(raw);

  // ❌ validation failed → return raw data too
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      values: raw, // 💥 مهم‌ترین بخش
    };
  }

  const data = parsed.data;

  await resend.emails.send({
    from: "Luxign Contact <onboarding@resend.dev>",
    to: "ostovari.eng@gmail.com",
    subject: `[${data.category}] ${data.subject}`,
    replyTo: data.email,
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #f3f4f6;">
              <span style="background-color: #f3f4f6; color: #1f2937; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                ${data.category}
              </span>
              <h1 style="font-size: 24px; font-weight: 700; color: #111827; margin: 16px 0 8px 0; line-height: 1.2;">
                ${data.subject}
              </h1>
              <p style="font-size: 14px; color: #6b7280; margin: 0;">
                Received a new message from your website contact form.
              </p>
            </td>
          </tr>

          <!-- Sender Details Grid -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="50%" style="padding-bottom: 16px; vertical-align: top;">
                    <div style="font-size: 12px; text-transform: uppercase; color: #9ca3af; font-weight: 600; margin-bottom: 4px;">Sender Name</div>
                    <div style="font-size: 15px; font-weight: 500; color: #1f2937;">${data.name}</div>
                  </td>
                  <td width="50%" style="padding-bottom: 16px; vertical-align: top;">
                    <div style="font-size: 12px; text-transform: uppercase; color: #9ca3af; font-weight: 600; margin-bottom: 4px;">Email Address</div>
                    <div style="font-size: 15px; font-weight: 500; color: #1f2937;">
                      <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="background-color: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; padding: 24px;">
                <div style="font-size: 12px; text-transform: uppercase; color: #9ca3af; font-weight: 600; margin-bottom: 12px;">Message Content</div>
                <div style="font-size: 15px; line-height: 1.6; color: #374151; white-space: pre-wrap;">${data.message}</div>
              </div>
            </td>
          </tr>

          <!-- Quick Action Button -->
          <tr>
            <td style="padding: 0 32px 40px 32px; text-align: center;">
              <a href="mailto:${data.email}?subject=Re: ${data.subject}" style="display: inline-block; background-color: #111827; color: #ffffff; font-weight: 600; font-size: 14px; padding: 12px 28px; text-decoration: none; border-radius: 10px; transition: background-color 0.2s;">
                Reply Directly via Email
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; text-align: center;">
              <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                Sent automatically by Luxign System. Please do not reply directly to this automated email address.
              </p>
            </td>
          </tr>

        </table>
      </body>
    </html>
  `,
  });

  return {
    success: true,
    values: {
      name: "",
      email: "",
      subject: "",
      category: "Support",
      message: "",
    },
  };
}
