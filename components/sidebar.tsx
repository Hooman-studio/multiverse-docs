"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Getting Started",
    href: "/docs/getting-started",
  },
  {
    title: "Components",
    href: "/docs/components",
    items: [
      {
        title: "Buttons",
        href: "/docs/components/buttons",
      },
      {
        title: "Cards",
        href: "/docs/components/cards",
      },
      {
        title: "Forms",
        href: "/docs/components/forms",
      },
    ],
  },
  {
    title: "Guides",
    href: "/docs/guides",
    items: [
      {
        title: "Authentication",
        href: "/docs/guides/authentication",
      },
      {
        title: "Database",
        href: "/docs/guides/database",
      },
      {
        title: "Deployment",
        href: "/docs/guides/deployment",
      },
    ],
  },
  {
    title: "API Reference",
    href: "/docs/api-reference",
  },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <aside className="hidden w-64 border-r border-gray-11 lg:block">
        <div className="sticky top-0 flex h-screen flex-col">
          <div className="flex h-16 items-center border-b border-gray-11 px-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/multiverse-logo.png"
                alt="Multiverse"
                width={150}
                height={40}
                className="brightness-200"
              />
            </Link>
          </div>
          <ScrollArea className="flex-1 py-4">
            <div className="px-4">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.href} className="space-y-1">
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm font-medium",
                        pathname === item.href ? "bg-gray-12 text-gray-1" : "text-gray-5 hover:bg-gray-12/50",
                      )}
                    >
                      {item.title}
                    </Link>
                    {item.items?.length && (
                      <div className="ml-4 space-y-1 border-l border-gray-11 pl-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm font-medium",
                              pathname === subItem.href ? "bg-gray-12 text-gray-1" : "text-gray-5 hover:bg-gray-12/50",
                            )}
                          >
                            {subItem.title}
                          </Link>
                        ))}
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
          <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-40 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-gray-14 border-gray-11">
          <div className="flex h-16 items-center border-b border-gray-11 px-4">
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <Image
                src="/images/multiverse-logo.png"
                alt="Multiverse"
                width={150}
                height={40}
                className="brightness-200"
              />
            </Link>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)] py-4">
            <div className="px-4">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.href} className="space-y-1">
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm font-medium",
                        pathname === item.href ? "bg-gray-12 text-gray-1" : "text-gray-5 hover:bg-gray-12/50",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                    {item.items?.length && (
                      <div className="ml-4 space-y-1 border-l border-gray-11 pl-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm font-medium",
                              pathname === subItem.href ? "bg-gray-12 text-gray-1" : "text-gray-5 hover:bg-gray-12/50",
                            )}
                            onClick={() => setOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
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
  )
}
