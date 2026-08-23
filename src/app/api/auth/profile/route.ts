import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { userId, profileData } = await request.json();

    if (!userId || !profileData) {
      return NextResponse.json({ error: 'User ID and profile data are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const user = await db.collection('users').findOne({ id: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedMetadata = {
      ...(user.user_metadata || {}),
      ...profileData,
    };

    await db.collection('users').updateOne(
      { id: userId },
      { $set: { user_metadata: updatedMetadata } }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update Profile Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, password } = await request.json();

    if (!userId || !password) {
      return NextResponse.json({ error: 'User ID and password are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const result = await db.collection('users').updateOne(
      { id: userId },
      { $set: { password: hashedPassword } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update Password Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
