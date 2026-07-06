import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isValidEmail } from "@/lib/utils";
import { siteConfig, socialLinks } from "@/config/social";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, error: "Email sending is not configured yet." },
        { status: 503 }
      );
    }

    const ownerEmail = "yashkhandagale9619@gmail.com";

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "hello@yourdomain.com",
      to: ownerEmail,
      replyTo: email,
      subject: `[${siteConfig.name}] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Could not send your message. Please try again." },
      { status: 500 }
    );
  }
}
