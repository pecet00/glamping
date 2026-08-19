import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grabysówka",
  description: "Konstrukcje safari i gotowy biznes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}