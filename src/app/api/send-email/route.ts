import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const escapeHtml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const subscriptionEmailHtml = () => `
  <div style="margin:0;padding:32px 16px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <div style="max-width:600px;margin:0 auto;border:1px solid #d9d9d9;border-radius:7px;background:#ffffff;padding:38px 20px 34px;">
      <h2 style="margin:0 0 26px;text-align:center;color:#00bf63;font-size:20px;line-height:1.35;font-weight:700;">
        Thank You for Subscribing to The Green Turtles!
      </h2>

      <div style="max-width:540px;margin:0 auto;font-size:16px;line-height:1.6;color:#111827;">
        <p style="margin:0 0 16px;">Dear new subscriber,</p>

        <p style="margin:0 0 16px;">
          Thank you for showing interest in The Green Turtles! We're thrilled to have you join our
          community dedicated to sustainable living.
        </p>

        <p style="margin:0 0 16px;">
          We're working hard to bring you a revolutionary marketplace filled with the best
          eco-friendly products. Get ready to discover sustainable choices that make a real
          difference for our planet.
        </p>

        <p style="margin:0 0 32px;">
          Stay tuned for our launch updates, exclusive sneak peeks, and special offers!
        </p>

        <p style="margin:0 0 22px;text-align:center;">
          Best regards,<br />
          The Green Turtles Team &#128034;
        </p>
      </div>

      <div style="max-width:540px;margin:0 auto;border-top:1px solid #eeeeee;padding-top:28px;text-align:center;color:#6b7280;font-size:12px;">
        &copy; 2026 The Green Turtles. All rights reserved.
      </div>
    </div>
  </div>
`;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing');
      return NextResponse.json({ error: 'Email service configuration missing' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { name, email, message, phone, type = 'Inquiry' } = await request.json();
    const safeEmail = escapeHtml(email);
    const safeName = escapeHtml(name || 'The Green Turtles subscriber');
    const safeMessage = escapeHtml(message || '');
    const safePhone = escapeHtml(phone || '');
    const safeType = escapeHtml(type);

    if (type === 'Subscription') {
      console.log(`Processing subscription for: ${email}`);

      const results = await Promise.allSettled([
        // 1. Send welcome email to user
        resend.emails.send({
          from: 'The Green Turtles <onboarding@resend.dev>',
          to: email,
          subject: 'Welcome to The Green Turtles! \u{1F331}',
          html: subscriptionEmailHtml(),
        }),
        // 2. Notify admin
        resend.emails.send({
          from: 'The Green Turtles <onboarding@resend.dev>',
          to: 'dishasikka@thegreenturtles.in',
          subject: `New Subscriber: ${safeEmail}`,
          html: `<p>New user subscribed to the newsletter: <strong>${safeEmail}</strong></p>`,
        })
      ]);

      results.forEach((result, idx) => {
        if (result.status === 'rejected') {
          console.error(`Subscription email ${idx + 1} failed:`, result.reason);
        } else {
          console.log(`Subscription email ${idx + 1} succeeded:`, result.value);
        }
      });

      return NextResponse.json({ success: true });
    }

    console.log(`Processing ${type} from: ${name} (${email})`);

    // 1. Send email to admin
    try {
      const adminResult = await resend.emails.send({
        from: 'The Green Turtles <onboarding@resend.dev>',
        to: 'dishasikka@thegreenturtles.in',
        subject: `New ${safeType} from ${safeName}`,
        html: `<p><strong>Type:</strong> ${safeType}</p>
               <p><strong>Name:</strong> ${safeName}</p>
               <p><strong>Email:</strong> ${safeEmail}</p>
               ${phone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
               <p><strong>Message:</strong> ${safeMessage}</p>`,
      });
      console.log('Admin notification result:', adminResult);
    } catch (err) {
      console.error('Admin notification failed:', err);
    }

    // 2. Auto-reply to the user
    let autoReplySubject = 'We received your message!';
    let autoReplyMessage = `Thank you for reaching out to The Green Turtles. We have received your inquiry and our team will get back to you shortly.`;

    if (type === 'Partner Inquiry') {
      autoReplySubject = 'Thanks for your interest in partnering with The Green Turtles!';
      autoReplyMessage = `Thank you for your interest in partnering with The Green Turtles. Our partnership team has received your proposal and will review it shortly. We're excited about the possibility of working together!`;
    }

    try {
      const userResult = await resend.emails.send({
        from: 'The Green Turtles <onboarding@resend.dev>',
        to: email,
        subject: autoReplySubject,
        html: `<p>Hi ${safeName},</p>
               <p>${autoReplyMessage}</p>
               <p>Best regards,<br/>The Green Turtles Team</p>`,
      });
      console.log('User auto-reply result:', userResult);
    } catch (err) {
      console.error('User auto-reply failed:', err);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email route error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
