"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, MenuIcon } from "lucide-react";
import SearchInput from "@/components/search-input";

export interface NavItem {
  title: string;
  href?: string | null;
  items?: NavItem[];
}

interface SidebarProps {
  navItems: NavItem[];
}

export default function Sidebar({ navItems }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-64 border-r border-gray-11 lg:block">
        <div className="fixed top-0 pt-20 flex h-screen flex-col">
          <ScrollArea className="flex-1 py-4">
            <div className="px-4">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.title} className="space-y-1">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm font-medium",
                          pathname === item.href
                            ? "bg-brand-rose-1/10 text-brand-rose-1"
                            : "text-gray-5 hover:bg-gray-12/50"
                        )}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm font-medium text-gray-5 cursor-default"
                        )}
                      >
                        {item.title}
                      </span>
                    )}
                    {item.items?.length && (
                      <div className="ml-4 space-y-1 border-l border-gray-11 pl-2">
                        {item.items.map((subItem) =>
                          subItem.href ? (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm font-medium",
                                pathname === subItem.href
                                  ? "bg-brand-rose-1/10 text-brand-rose-1"
                                  : "text-gray-5 hover:bg-gray-12/50"
                              )}
                            >
                              {subItem.title}
                            </Link>
                          ) : (
                            <span
                              key={subItem.title}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm font-medium text-gray-5 cursor-default"
                              )}
                            >
                              {subItem.title}
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </ScrollArea>
        </div>
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-3 top-3 z-40 lg:hidden"
          >
            <MenuIcon />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 p-0 bg-gray-14 border-gray-11"
        >
          <SheetTitle className="sr-only">Multiverse Docs</SheetTitle>
          <ScrollArea className="h-[calc(100vh-4rem)] py-4">
            <div className="px-4">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.title} className="space-y-1">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm font-medium",
                          pathname === item.href
                            ? "bg-brand-rose-1/10 text-brand-rose-1"
                            : "text-gray-5 hover:bg-gray-12/50"
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm font-medium text-gray-5 cursor-default"
                        )}
                      >
                        {item.title}
                      </span>
                    )}
                    {item.items?.length && (
                      <div className="ml-4 space-y-1 border-l border-gray-11 pl-2">
                        {item.items.map((subItem) =>
                          subItem.href ? (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm font-medium",
                                pathname === subItem.href
                                  ? "bg-brand-rose-1/10 text-brand-rose-1"
                                  : "text-gray-5 hover:bg-gray-12/50"
                              )}
                              onClick={() => setOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          ) : (
                            <span
                              key={subItem.title}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm font-medium text-gray-5 cursor-default"
                              )}
                            >
                              {subItem.title}
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
