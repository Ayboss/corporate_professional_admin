import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Professionals",
  description:
    "Connecting ambitious professionals with mentorship, networking, and job opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
