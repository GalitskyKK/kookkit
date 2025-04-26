import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/auth-options';
import { prisma } from '@/prisma/prisma-client';

// GET /api/favorites - get current user's favorites
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: Number(session.user.id) },
    include: { product: true },
  });
  return NextResponse.json(favorites);
}

// POST /api/favorites - add favorite
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { productId } = await req.json();
  if (!productId) {
    return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
  }
  const favorite = await prisma.favorite.create({
    data: { userId: Number(session.user.id), productId: Number(productId) },
  });
  return NextResponse.json(favorite);
}

// DELETE /api/favorites - remove favorite
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { productId } = await req.json();
  if (!productId) {
    return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
  }
  await prisma.favorite.deleteMany({
    where: { userId: Number(session.user.id), productId: Number(productId) },
  });
  return NextResponse.json({ success: true });
}
