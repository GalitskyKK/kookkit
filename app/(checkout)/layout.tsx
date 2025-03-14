import { Container, Header } from "@/components/shared";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "KookKit | Cart",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F5F9FC]">
      <Container>
        <Header hasSearch={false} className="border-gray-200" />
        {children}
      </Container>
    </main>
  );
}
