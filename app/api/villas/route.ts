import { NextResponse } from 'next/server';
import { villas } from '../../../server/data/villas';

export async function GET() {
  try {
    return NextResponse.json(villas);
  } catch (error) {
    console.error('Error fetching villas:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 