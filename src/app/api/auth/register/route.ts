import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, password, role, metadata } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Create unique user ID
    const userId = 'user_' + crypto.randomBytes(8).toString('hex');
    const userRole = role || 'buyer';

    const newUser = {
      id: userId,
      email: normalizedEmail,
      password: hashedPassword,
      role: userRole,
      user_metadata: metadata || {},
      created_at: new Date(),
    };

    await db.collection('users').insertOne(newUser);

    // Create corresponding profile
    const newProfile = {
      id: userId,
      role: userRole,
      eco_coins: 0,
      wallet: 0,
      created_at: new Date(),
    };

    await db.collection('profiles').insertOne(newProfile);

    // Return user object without sensitive data
    const userResponse = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      user_metadata: newUser.user_metadata,
    };

    return NextResponse.json({ user: userResponse });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
