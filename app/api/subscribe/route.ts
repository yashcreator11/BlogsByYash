import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";
import { isValidEmail } from "@/lib/utils";
import { siteConfig } from "@/config/social";
import WelcomeEmail from "@/emails/WelcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const { data: existing } = await supabaseAdmin
      .from("subscribers")
      .select("id, is_active")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existing) {
      if (existing.is_active) {
        return NextResponse.json(
          { success: false, error: "You're already subscribed." },
          { status: 409 }
        );
      }
      // Reactivate a previously unsubscribed email.
      await supabaseAdmin
        .from("subscribers")
        .update({ is_active: true })
        .eq("id", existing.id);
      return NextResponse.json({ success: true });
    }

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("subscribers")
      .insert({ email: normalizedEmail })
      .select("unsubscribe_token")
      .single();

    if (insertError || !inserted) {
      return NextResponse.json(
        { success: false, error: "Could not save your subscription. Try again." },
        { status: 500 }
      );
    }

    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "hello@yourdomain.com",
          to: normalizedEmail,
          subject: `Welcome to ${siteConfig.name}`,
          react: WelcomeEmail({
            siteName: siteConfig.name,
            siteUrl: siteConfig.url,
            unsubscribeUrl: `${siteConfig.url}/api/unsubscribe?token=${inserted.unsubscribe_token}`,
          }),
        });
      } catch {
        // Subscription succeeded even if the welcome email fails to send.
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
