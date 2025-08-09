import { CPsidebar } from "@/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-50 ">
      <CPsidebar />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
