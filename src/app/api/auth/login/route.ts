import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const adminId = process.env.NEXT_PUBLIC_ADMIN_ID || 'admin';
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

    // Check hardcoded admin override
    if (email === adminId && password === adminPassword) {
      const adminUser = {
        id: 'admin-local',
        email,
        role: 'admin',
        user_metadata: {},
      };
      return NextResponse.json({ user: adminUser, role: 'admin' });
    }

    const { db } = await connectToDatabase();
    const normalizedEmail = email.toLowerCase().trim();

    const user = await db.collection('users').findOne({ email: normalizedEmail });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (user.password !== hashedPassword) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Fetch user profile info
    let profile: any = await db.collection('profiles').findOne({ id: user.id });
    if (!profile) {
      // Create profile if somehow missing
      profile = {
        id: user.id,
        role: user.role || 'buyer',
        eco_coins: 0,
        wallet: 0,
        created_at: new Date(),
      };
      await db.collection('profiles').insertOne(profile);
    }

    const userResponse = {
      id: user.id,
      email: user.email,
      role: user.role,
      user_metadata: {
        ...user.user_metadata,
        eco_coins: profile.eco_coins || 0,
        wallet: profile.wallet || 0,
      },
    };

    return NextResponse.json({
      user: userResponse,
      role: profile.role,
    });
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
