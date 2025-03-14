import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const nunito = Roboto({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "KookKit",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      Dashboard header
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
