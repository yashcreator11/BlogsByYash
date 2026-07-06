import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { siteConfig } from "@/config/social";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse(renderPage("Missing unsubscribe token.", false), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  const { data: subscriber } = await supabaseAdmin
    .from("subscribers")
    .select("id")
    .eq("unsubscribe_token", token)
    .maybeSingle();

  if (!subscriber) {
    return new NextResponse(
      renderPage("We couldn't find a subscription matching that link.", false),
      { status: 404, headers: { "Content-Type": "text/html" } }
    );
  }

  await supabaseAdmin
    .from("subscribers")
    .update({ is_active: false })
    .eq("id", subscriber.id);

  return new NextResponse(
    renderPage("You've been unsubscribed. You won't receive any more emails from us.", true),
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}

function renderPage(message: string, success: boolean) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unsubscribe | ${siteConfig.name}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #fafafa; color: #18181b; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; }
    .card { max-width: 420px; text-align: center; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 16px; padding: 40px 32px; }
    h1 { font-size: 20px; margin-bottom: 12px; color: ${success ? "#18181b" : "#dc2626"}; }
    p { color: #71717a; line-height: 1.6; margin-bottom: 24px; }
    a { color: #6366f1; text-decoration: none; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${success ? "Unsubscribed" : "Something went wrong"}</h1>
    <p>${message}</p>
    <a href="${siteConfig.url}">Back to ${siteConfig.name}</a>
  </div>
</body>
</html>`;
}
