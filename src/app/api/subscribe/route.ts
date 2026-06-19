import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    // Send welcome email to subscriber
    await resend.emails.send({
      from: "Eco App <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Our Green Community 🌱",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h1>Welcome 🌿</h1>

          <p>Thank you for subscribing to our green community.</p>

          <p>You will receive:</p>

          <ul>
            <li>Latest eco-news</li>
            <li>Launch updates</li>
            <li>Exclusive sustainable offers</li>
          </ul>

          <p>We're excited to have you with us.</p>

          <p>Team Eco 🌱</p>
        </div>
      `,
    });

    // Send notification email to you
    await resend.emails.send({
      from: "Eco App <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: "New Subscriber 🎉",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2>New Subscription Received</h2>

          <p>
            <strong>Email:</strong> ${email}
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Subscription successful!",
    });
  } catch (error) {
    console.error("Resend Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send emails",
      },
      { status: 500 }
    );
  }
}