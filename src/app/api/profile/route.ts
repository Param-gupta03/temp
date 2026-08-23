import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    let profile: any = await db.collection('profiles').findOne({ id: userId });

    if (!profile) {
      // Auto-create profile if user exists but profile doesn't
      const user = await db.collection('users').findOne({ id: userId });
      if (user) {
        profile = {
          id: userId,
          role: user.role || 'buyer',
          eco_coins: 0,
          wallet: 0,
          created_at: new Date(),
        };
        await db.collection('profiles').insertOne(profile);
      } else {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
      }
    }

    return NextResponse.json({ profile });
  } catch (error: any) {
    console.error('Fetch Profile Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, action, amount } = await request.json();

    if (!userId || !action || typeof amount !== 'number') {
      return NextResponse.json({ error: 'User ID, action, and amount are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    let updateDoc: any = {};
    if (action === 'award_coins') {
      updateDoc = { $inc: { eco_coins: amount } };
    } else if (action === 'spend_coins') {
      // Find current coins to avoid going negative
      const profile = await db.collection('profiles').findOne({ id: userId });
      const currentCoins = profile?.eco_coins || 0;
      const nextCoins = Math.max(0, currentCoins - amount);
      updateDoc = { $set: { eco_coins: nextCoins } };
    } else if (action === 'credit_wallet') {
      updateDoc = { $inc: { wallet: amount } };
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const result = await db.collection('profiles').findOneAndUpdate(
      { id: userId },
      updateDoc,
      { returnDocument: 'after' }
    );

    // Support both older and newer MongoDB driver return values
    const updatedProfile = result && ('value' in result ? (result as any).value : result);

    if (!updatedProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error: any) {
    console.error('Update Profile Fields Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
