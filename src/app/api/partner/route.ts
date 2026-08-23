import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contact_name, email, phone, message } = body;

    if (!contact_name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const newInquiry = {
      contact_name,
      email,
      phone: phone || '',
      message: message || '',
      created_at: new Date(),
    };

    await db.collection('partner_inquiries').insertOne(newInquiry);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Partner Inquiry Save Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
