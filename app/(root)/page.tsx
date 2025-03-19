import { Container, Filters, Stories, TopBar, } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { Title } from "@/components/shared/title";
import { prisma } from "@/prisma/prisma-client";
import { findProducts, GetSearchParams } from "@/shared/lib/find-products";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findProducts(searchParams);

  return (
    <>
      {/* <Container className="mt-10">
        <Title text="All products" size="lg" className="font-extrabold" />
      </Container> */}

      {/* <Stories /> */}

      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />
      <Container className=" mt-10 pb-14">
        <div className="flex flex-col md:flex-row gap-14">
          {/* Filter */}
          <div className="w-full md:w-[250px] hidden md:block">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          {/* List of products */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      items={category.products}
                      categoryId={category.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
