"use client";
// Keeps the public site chrome (menu, footer, chat, tracking pixels) off the
// private /admin area, so admin visits are not counted as website traffic.
import { usePathname } from "next/navigation";

export default function PublicOnly({ children }) {
  const path = usePathname() || "";
  if (path === "/admin" || path.startsWith("/admin/")) return null;
  return children;
}
