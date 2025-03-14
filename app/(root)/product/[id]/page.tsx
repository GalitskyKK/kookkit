import { Container } from "@/components/shared/container";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/shared/product-form";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const ingredientsAll = await prisma.ingredient.findMany();
  

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} ingredientsAll={ingredientsAll} />
    </Container>
  );
}
