"use client";
// components/Sidebar.tsx
import Link from "next/link";
import { Home, Search, Book, BarChart3, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/reports", label: "Reports", icon: Book },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/moderators", label: "Moderators", icon: ShieldCheck },
  // { href: "/settings", label: "Settings", icon: Settings },
];

export default function CPsidebar() {
  useAuth();
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-white border-r border-gray-200 ">
      <div className="p-6 font-bold text-xl text-primary">Admin</div>
      <nav className="flex flex-col space-y-2 px-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center p-2 rounded ${
                isActive ? "bg-primary/20" : "hover:bg-primary/10"
              } text-gray-700 `}
            >
              <Icon size={20} />
              <span className="ml-3">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
