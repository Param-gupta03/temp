import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Name, Email, Message } = body;

    if (!Name || !Email || !Message) {
      return NextResponse.json({ error: 'Name, Email, and Message are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const newInquiry = {
      name: Name,
      email: Email,
      message: Message,
      created_at: new Date(),
    };

    await db.collection('contact_inquiries').insertOne(newInquiry);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact Inquiry Save Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
