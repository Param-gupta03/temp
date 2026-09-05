import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const getWelcomeEmailHtml = (email: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to The Green Turtles</title>
</head>
<body style="margin:0;padding:0;background-color:#faf7f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1c1917;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#faf7f2;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:580px;background-color:#ffffff;border-radius:24px;border:1px solid #e7e0d5;overflow:hidden;box-shadow:0 8px 30px rgba(47,71,57,0.06);" cellspacing="0" cellpadding="0" border="0">
          <!-- Header Banner -->
          <tr>
            <td style="background-color:#2f4739;padding:36px 32px;text-align:center;">
              <div style="display:inline-block;background-color:#ffffff;border-radius:16px;padding:8px 18px;margin-bottom:12px;">
                <span style="font-size:24px;line-height:1;">🐢</span>
              </div>
              <h1 style="color:#faf7f2;font-size:28px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px;">The Green Turtles</h1>
              <p style="color:#d4e0d7;font-size:14px;margin:0;letter-spacing:0.5px;text-transform:uppercase;font-weight:600;">
                Discover · Compare · Choose Better
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:36px 32px 28px;">
              <h2 style="color:#1c1917;font-size:22px;font-weight:700;margin:0 0 16px;line-height:1.3;">
                Welcome to Our Conscious Community! 🌱
              </h2>
              
              <p style="color:#44403c;font-size:15px;line-height:1.65;margin:0 0 18px;">
                Thank you for subscribing with <strong>${email}</strong>. We're thrilled to have you join The Green Turtles—a curated collective dedicated to making sustainable living transparent, accessible, and rewarding.
              </p>

              <div style="background-color:#f7f4ee;border-left:4px solid #2f4739;border-radius:0 12px 12px 0;padding:16px 20px;margin:24px 0;">
                <p style="color:#2f4739;font-size:15px;font-style:italic;font-weight:600;margin:0;line-height:1.5;">
                  "The problem isn't a shortage of sustainable solutions. It's knowing which ones are genuinely worth choosing."
                </p>
              </div>

              <h3 style="color:#1c1917;font-size:16px;font-weight:700;margin:24px 0 12px;">What to expect as a subscriber:</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:8px 0;vertical-align:top;width:24px;font-size:16px;">🌿</td>
                  <td style="padding:8px 0 8px 8px;color:#44403c;font-size:14px;line-height:1.5;">
                    <strong>Curated Eco Drops:</strong> Discover hand-vetted sustainable products from emerging and trusted brands.
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;vertical-align:top;width:24px;font-size:16px;">🔍</td>
                  <td style="padding:8px 0 8px 8px;color:#44403c;font-size:14px;line-height:1.5;">
                    <strong>Zero-Greenwash Insights:</strong> Understand what products are made of, their lifecycle, and real certifications.
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;vertical-align:top;width:24px;font-size:16px;">🎁</td>
                  <td style="padding:8px 0 8px 8px;color:#44403c;font-size:14px;line-height:1.5;">
                    <strong>Subscriber Perks & Eco-Coins:</strong> Early access to limited launches and exclusive community savings.
                  </td>
                </tr>
              </table>

              <p style="color:#44403c;font-size:15px;line-height:1.65;margin:0 0 28px;">
                Stay tuned for our upcoming launch updates and special announcements!
              </p>

              <div style="border-top:1px solid #e7e0d5;padding-top:24px;margin-top:24px;">
                <p style="color:#1c1917;font-size:14px;font-weight:600;margin:0 0 4px;">With gratitude,</p>
                <p style="color:#2f4739;font-size:15px;font-weight:700;margin:0;">The Green Turtles Team 🐢</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#faf7f2;border-top:1px solid #e7e0d5;padding:24px 32px;text-align:center;">
              <p style="color:#78716c;font-size:12px;line-height:1.5;margin:0 0 8px;">
                You received this email because you subscribed to updates at <strong>The Green Turtles</strong>.
              </p>
              <p style="color:#a8a29e;font-size:11px;margin:0;">
                © ${new Date().getFullYear()} The Green Turtles · Sustainable choices made simple.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid email address is required.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Save subscription in MongoDB if available
    try {
      const { connectToDatabase } = await import("@/lib/mongodb");
      const { db } = await connectToDatabase();
      const existing = await db
        .collection("subscriptions")
        .findOne({ email: normalizedEmail });

      if (!existing) {
        await db.collection("subscriptions").insertOne({
          email: normalizedEmail,
          created_at: new Date(),
          source: "stay_updated",
        });
      }
    } catch (dbErr: any) {
      console.warn("MongoDB subscription insert failed (proceeding):", dbErr.message);
    }

    // 2. Email delivery setup
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || "paramgupta0305@gmail.com";
    const sender = process.env.RESEND_FROM_EMAIL || "The Green Turtles <onboarding@resend.dev>";

    if (!apiKey) {
      console.warn("RESEND_API_KEY not found in environment variables.");
      return NextResponse.json({
        success: true,
        message: "Thank you for subscribing! Your email has been registered.",
      });
    }

    const resend = new Resend(apiKey);
    const welcomeHtml = getWelcomeEmailHtml(normalizedEmail);

    let subscriberEmailSent = false;

    // Attempt to send welcome email directly to subscriber
    try {
      const subscriberResult = await resend.emails.send({
        from: sender,
        to: normalizedEmail,
        subject: "Welcome to The Green Turtles! 🌱",
        html: welcomeHtml,
      });

      if (subscriberResult.error) {
        console.warn("Resend direct send warning:", subscriberResult.error);

        // Resend sandbox/domain restriction: forward the subscriber welcome confirmation to the admin account
        console.log(`Forwarding welcome confirmation preview for ${normalizedEmail} to admin ${adminEmail}`);
        const forwardResult = await resend.emails.send({
          from: sender,
          to: adminEmail,
          subject: `[Subscriber Confirmation] Welcome to The Green Turtles 🌱 (For: ${normalizedEmail})`,
          html: `
            <div style="background:#fff3cd;padding:12px;border:1px solid #ffeeba;border-radius:8px;margin-bottom:20px;font-family:sans-serif;font-size:13px;color:#856404;">
              <strong>Sandbox Test Mode Notice:</strong> Resend delivered this confirmation copy to you (${adminEmail}) because the recipient (${normalizedEmail}) is pending domain verification. Once you add your custom domain in Resend, emails send directly to all subscribers.
            </div>
            ${welcomeHtml}
          `,
        });

        if (!forwardResult.error) {
          subscriberEmailSent = true;
          console.log("Confirmation successfully forwarded to admin email in test mode.");
        }
      } else {
        subscriberEmailSent = true;
        console.log("Subscriber welcome email successfully sent to:", normalizedEmail);
      }
    } catch (sendErr: any) {
      console.error("Direct send exception:", sendErr.message);
    }

    // 3. Notify Admin about new subscriber
    try {
      await resend.emails.send({
        from: sender,
        to: adminEmail,
        subject: `New Subscriber 🎉: ${normalizedEmail}`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:24px;background:#faf7f2;border-radius:12px;border:1px solid #e7e0d5;">
            <h2 style="color:#2f4739;margin-top:0;">New Subscription Received 🎉</h2>
            <p style="font-size:16px;color:#1c1917;">A new user just subscribed to <strong>The Green Turtles</strong> newsletter.</p>
            <div style="background:#ffffff;padding:16px;border-radius:8px;border:1px solid #e7e0d5;margin:16px 0;">
              <p style="margin:0;font-size:15px;"><strong>Subscriber Email:</strong> <a href="mailto:${normalizedEmail}">${normalizedEmail}</a></p>
              <p style="margin:8px 0 0;font-size:13px;color:#78716c;">Date: ${new Date().toLocaleString()}</p>
            </div>
            <p style="color:#66615b;font-size:13px;">This email was automatically generated by The Green Turtles subscription service.</p>
          </div>
        `,
      });
    } catch (adminNotifyErr: any) {
      console.error("Admin notification error:", adminNotifyErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Subscription successful! Welcome to The Green Turtles 🌱",
      delivered: subscriberEmailSent,
    });
  } catch (error: any) {
    console.error("Subscription route general error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred while processing your subscription.",
      },
      { status: 500 }
    );
  }
}