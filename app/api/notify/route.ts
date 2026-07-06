import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";
import { siteConfig } from "@/config/social";
import NewPostEmail from "@/emails/NewPostEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { secret, title, url, excerpt, coverImage } = await req.json();

    if (!process.env.NOTIFY_SECRET || secret !== process.env.NOTIFY_SECRET) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    if (!title || !url) {
      return NextResponse.json(
        { success: false, error: "title and url are required." },
        { status: 400 }
      );
    }

    const { data: subscribers, error } = await supabaseAdmin
      .from("subscribers")
      .select("email, unsubscribe_token")
      .eq("is_active", true);

    if (error) {
      return NextResponse.json(
        { success: false, error: "Could not load subscribers." },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ success: true, sent: 0 });
    }

    let sent = 0;
    const failures: string[] = [];

    // Send individually so each subscriber gets their own unsubscribe link.
    for (const subscriber of subscribers) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "hello@yourdomain.com",
          to: subscriber.email,
          subject: `New post: ${title}`,
          react: NewPostEmail({
            siteName: siteConfig.name,
            postTitle: title,
            postUrl: url,
            excerpt: excerpt || "",
            coverImage,
            unsubscribeUrl: `${siteConfig.url}/api/unsubscribe?token=${subscriber.unsubscribe_token}`,
          }),
        });
        sent += 1;
      } catch {
        failures.push(subscriber.email);
      }
    }

    return NextResponse.json({ success: true, sent, failed: failures.length });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
