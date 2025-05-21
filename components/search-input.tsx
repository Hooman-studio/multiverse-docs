"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { addBasePath } from "next/dist/client/add-base-path";

// Type for Pagefind result
interface PagefindResult {
  excerpt: string;
  meta: { title: string };
  raw_url: string;
  sub_results: { excerpt: string; title: string; url: string }[];
  url: string;
}

const DEV_SEARCH_NOTICE =
  "Search isn't available in development. Run `next build` and `next start` to test search.";

export function SearchInput({ className }: { className?: string }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut: focus input on / or Cmd+K/Ctrl+K
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const el = document.activeElement;
      if (
        !el ||
        ["INPUT", "SELECT", "BUTTON", "TEXTAREA"].includes(el.tagName) ||
        (el as HTMLElement).isContentEditable
      ) {
        return;
      }
      if (
        event.key === "/" ||
        (event.key === "k" &&
          !event.shiftKey &&
          (navigator.userAgent.includes("Mac") ? event.metaKey : event.ctrlKey))
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Search logic
  const handleSearch = useCallback(async (value: string) => {
    if (!value) {
      setResults([]);
      setError("");
      setOpen(false);
      return;
    }
    setIsLoading(true);
    if (!(window as any).pagefind) {
      try {
        (window as any).pagefind = await import(
          addBasePath("/_pagefind/pagefind.js")
        );
        await (window as any).pagefind.options({ baseUrl: "/" });
      } catch (err: any) {
        setError(
          process.env.NODE_ENV !== "production" &&
            err?.message?.includes("Failed to fetch")
            ? DEV_SEARCH_NOTICE
            : `${err?.constructor?.name || "Error"}: ${err?.message}`
        );
        setIsLoading(false);
        setOpen(true);
        return;
      }
    }
    const response = await (window as any).pagefind!.debouncedSearch(value);
    if (!response) return;
    const data = await Promise.all(response.results.map((o: any) => o.data()));
    setIsLoading(false);
    setError("");
    setResults(
      data.map((newData: PagefindResult) => ({
        ...newData,
        sub_results: newData.sub_results.map((r) => {
          const url = r.url.replace(/\.html$/, "").replace(/\.html#/, "#");
          return { ...r, url };
        }),
      }))
    );
    setOpen(true);
  }, []);

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch(search);
    }, 200);
    return () => clearTimeout(timeout);
  }, [search, handleSearch]);

  // Handle result click
  const handleSelect = (url: string) => {
    setOpen(false);
    setSearch("");
    if (url.startsWith("#")) {
      location.href = url;
    } else {
      router.push(url);
    }
  };

  return (
    <div className={cn("w-full my-4", className)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search documentation…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => search && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            autoComplete="off"
            className="bg-gray-12/50"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full max-w-[320px]">
          {error ? (
            <DropdownMenuItem disabled>
              <span className="text-red-500 text-xs">{error}</span>
            </DropdownMenuItem>
          ) : isLoading ? (
            <DropdownMenuItem disabled>
              <span className="text-xs">Loading…</span>
            </DropdownMenuItem>
          ) : results.length ? (
            results.map((result, i) => (
              <DropdownMenuItem
                key={i}
                onSelect={() => handleSelect(result.url)}
                className="flex flex-col items-start gap-0.5"
              >
                <span className="font-medium text-sm">{result.meta.title}</span>
                <span className="text-xs text-muted-foreground line-clamp-2">
                  {result.excerpt}
                </span>
              </DropdownMenuItem>
            ))
          ) : search ? (
            <DropdownMenuItem disabled>
              <span className="text-xs">No results found.</span>
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SearchInput;
