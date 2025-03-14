import { PaymentCallbackData } from "@/@types/yookassa";
import { OrderSuccess } from "@/components/shared/email-templates/order-success";
import { prisma } from "@/prisma/prisma-client";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as PaymentCallbackData;
    const order = await prisma.order.findFirst({
      where: {
        id: Number(data.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    const isSucceeded = data.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        "Order created successfully",
        OrderSuccess({ orderId: order.id, items })
      );
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
