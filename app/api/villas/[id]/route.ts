import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { villas } from '../../../../server/data/villas';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const villa = villas.find((v) => v.id === parseInt(params.id));

    if (!villa) {
      return NextResponse.json(
        { error: 'Villa not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(villa);
  } catch (error) {
    console.error('Error fetching villa:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 