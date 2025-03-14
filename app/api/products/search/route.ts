import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";

  const searchQuery = query.toLowerCase();
  const firstLetterUpper =
    searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: searchQuery } }, 
        { name: { contains: firstLetterUpper } }, 
        { name: { contains: query.toUpperCase() } }, 
      ],
    },
    take: 5,
  });

  return NextResponse.json(products);
}
