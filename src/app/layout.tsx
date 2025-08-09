import type { Metadata } from "next";
import { helvneue } from "./font";
import { ToastContainer } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./globals.css";

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
  return (
    <html lang="en">
      <body className={`${helvneue.className} antialiased`}>
        <Theme>
          {children}
          <ToastContainer />
        </Theme>
      </body>
    </html>
  );
}
