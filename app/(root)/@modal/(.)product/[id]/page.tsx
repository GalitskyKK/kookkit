import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ChooseProductModal } from "@/components/shared";

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const ingredientsAll = await prisma.ingredient.findMany();

  return (
    <ChooseProductModal product={product} ingredientsAll={ingredientsAll} />
  );
}
