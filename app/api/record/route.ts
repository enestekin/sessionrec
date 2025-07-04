import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const user = await currentUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const events = body.events;

  await prisma.session.create({
    data: {
      userId: user.id, // ✅ Clerk’in otomatik ID'si
      events,
    },
  });

  return new Response('Success', { status: 200 });
}
