import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { categories, ingredients, products } from "./constants";
import { Prisma } from "@prisma/client";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  productType,
  size,
}: {
  productId: number;
  productType?: 1 | 2;
  size?: 200 | 300 | 400;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    productType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User",
        email: "user@example.com",
        password: hashSync("11111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin",
        email: "admin@example.com",
        password: hashSync("11111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const bowl1 = await prisma.product.create({
    data: {
      name: "Tropical Paradise",
      imageUrl:
        "https://s.iimg.su/s/24/2KK1TN9UzReaP6IWkAzSJSFXLB3vxU0YeuOGPZrJ.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 2 }, // Питайя
          { id: 4 }, // Чиа
          { id: 5 }, // Кокос
          { id: 7 }, // Клубника
          { id: 15 }, // Манго
        ],
      },
    },
  });

  const bowl2 = await prisma.product.create({
    data: {
      name: "Forest Freshness",
      imageUrl:
        "https://s.iimg.su/s/24/X1F6xzQ705JXF32F0I4uItZIYufOPVS5mvTP6rKh.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 }, // Асаи
          { id: 6 }, // Голубика
          { id: 7 }, // Клубника
          { id: 5 }, // Кокос
          { id: 14 }, // Киви
        ],
      },
    },
  });

  const bowl3 = await prisma.product.create({
    data: {
      name: "Green Detox",
      imageUrl:
        "https://s.iimg.su/s/24/lkEkHQjcTtCwimsKsBTmGIE3dFw1twKQir2XFS5T.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 }, // Асаи
          { id: 6 }, // Голубика
          { id: 14 }, // Киви
          { id: 19 }, // Матча
          { id: 24 }, // Лен
        ],
      },
    },
  });

  const bowl4 = await prisma.product.create({
    data: {
      name: "Ocean Wave",
      imageUrl:
        "https://s.iimg.su/s/24/T5uRGEJib6PddfcUymZugHXSqlYzHWssIVoHJFKq.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 5 }, // Кокос
          { id: 6 }, // Голубика
          { id: 2 }, // Питайя
          { id: 15 }, // Манго
          { id: 23 }, // Спирулина
        ],
      },
    },
  });

  const bowl5 = await prisma.product.create({
    data: {
      name: "Energy Boost",
      imageUrl:
        "https://s.iimg.su/s/24/kysEQHZ8p8L3jztHtJuRWFOo3eJFmIWOE1bgc3SG.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 }, // Асаи
          { id: 8 }, // Банан
          { id: 12 }, // Какао
          { id: 20 }, // Клен Сироп
          { id: 21 }, // Кокос
        ],
      },
    },
  });

  const bowl6 = await prisma.product.create({
    data: {
      name: "East Harmony",
      imageUrl:
        "https://s.iimg.su/s/24/My7PxMTCIMKJq9TD9nhY8tFZ2dXT32vVm23caPvM.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 }, // Асаи
          { id: 6 }, // Голубика
          { id: 9 }, // Миндаль
          { id: 14 }, // Киви
          { id: 19 }, // Матча
        ],
      },
    },
  });

  const bowl7 = await prisma.product.create({
    data: {
      name: "Berry Boom",
      imageUrl:
        "https://s.iimg.su/s/24/hLvxdcvEi9BZfiTL0rxMSaDnrZopToMJGWkbkF9H.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 15 }, // Манго
          { id: 6 }, // Голубика
          { id: 7 }, // Клубника
          { id: 5 }, // Кокос
          { id: 14 }, // Киви
        ],
      },
    },
  });

  const bowl8 = await prisma.product.create({
    data: {
      name: "Golden Mango",
      imageUrl:
        "https://s.iimg.su/s/24/bG0C0mSn36CxGvP1VPIk8PWNVe97H2LyZJF0zYNM.png",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 15 }, // Манго
          { id: 6 }, // Голубика
          { id: 7 }, // Клубника
          { id: 10 }, // Мед
          { id: 14 }, // Киви
        ],
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Bowl "Tropical Paradise"
      generateProductItem({ productId: bowl1.id, productType: 1, size: 200 }),
      generateProductItem({ productId: bowl1.id, productType: 2, size: 300 }),
      generateProductItem({ productId: bowl1.id, productType: 2, size: 400 }),
      generateProductItem({ productId: bowl1.id, productType: 1, size: 300 }),
      generateProductItem({ productId: bowl1.id, productType: 1, size: 400 }),

      // Bowl "Forest Freshness"
      generateProductItem({ productId: bowl2.id, productType: 1, size: 200 }),
      generateProductItem({ productId: bowl2.id, productType: 1, size: 300 }),
      generateProductItem({ productId: bowl2.id, productType: 1, size: 400 }),
      generateProductItem({ productId: bowl2.id, productType: 2, size: 200 }),
      generateProductItem({ productId: bowl2.id, productType: 2, size: 300 }),
      generateProductItem({ productId: bowl2.id, productType: 2, size: 400 }),

      // Bowl "Green Detox"
      generateProductItem({ productId: bowl3.id, productType: 1, size: 200 }),
      generateProductItem({ productId: bowl3.id, productType: 2, size: 300 }),
      generateProductItem({ productId: bowl3.id, productType: 2, size: 400 }),

      // Bowl "Ocean Wave"
      generateProductItem({ productId: bowl4.id, productType: 1, size: 200 }),
      generateProductItem({ productId: bowl4.id, productType: 1, size: 300 }),
      generateProductItem({ productId: bowl4.id, productType: 1, size: 400 }),
      generateProductItem({ productId: bowl4.id, productType: 2, size: 200 }),
      generateProductItem({ productId: bowl4.id, productType: 2, size: 300 }),
      generateProductItem({ productId: bowl4.id, productType: 2, size: 400 }),

      // Bowl "Energy Boost"
      generateProductItem({ productId: bowl5.id, productType: 1, size: 200 }),
      generateProductItem({ productId: bowl5.id, productType: 2, size: 300 }),
      generateProductItem({ productId: bowl5.id, productType: 2, size: 400 }),

      // Bowl "East Harmony"
      generateProductItem({ productId: bowl6.id, productType: 1, size: 200 }),
      generateProductItem({ productId: bowl6.id, productType: 2, size: 300 }),
      generateProductItem({ productId: bowl6.id, productType: 2, size: 400 }),
      generateProductItem({ productId: bowl6.id, productType: 1, size: 400 }),

      // Bowl "Berry Boom"
      generateProductItem({ productId: bowl7.id, productType: 1, size: 200 }),
      generateProductItem({ productId: bowl7.id, productType: 2, size: 300 }),
      generateProductItem({ productId: bowl7.id, productType: 2, size: 400 }),
      generateProductItem({ productId: bowl7.id, productType: 1, size: 300 }),
      generateProductItem({ productId: bowl7.id, productType: 1, size: 400 }),

      // Bowl "Golden Mango"
      generateProductItem({ productId: bowl8.id, productType: 1, size: 200 }),
      generateProductItem({ productId: bowl8.id, productType: 2, size: 300 }),
      generateProductItem({ productId: bowl8.id, productType: 2, size: 400 }),
      generateProductItem({ productId: bowl8.id, productType: 1, size: 300 }),
      generateProductItem({ productId: bowl8.id, productType: 1, size: 400 }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
      generateProductItem({ productId: 18 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
