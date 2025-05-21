"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";

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

// Extend Window interface for pagefind
declare global {
  interface Window {
    pagefind: any;
  }
}

// Helper to load pagefind.js from public folder
const loadPagefindScript = () => {
  return new Promise<void>((resolve, reject) => {
    if ((window as any).Pagefind) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "pagefind-script";
    script.src = "/_pagefind/pagefind.js";
    script.type = "module";
    script.async = true;
    script.onload = async () => {
      console.log("Pagefind window: ", (window as any).Pagefind);
      await (window as any).Pagefind.options({ baseUrl: "/" });
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export async function importPagefind() {
  window.pagefind = await import(
    // @ts-ignore: webpackIgnore is intentional for runtime import and no type declarations exist
    /* webpackIgnore: true */ "/_pagefind/pagefind.js"
  );
  await window.pagefind.options({
    baseUrl: "/",
    // ... more search options
  });
}

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
      if (
        event.key === "/" ||
        (event.key === "k" &&
          !event.shiftKey &&
          (navigator.userAgent.includes("Mac") ? event.metaKey : event.ctrlKey))
      ) {
        event.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Search logic
  const handleSearch = useCallback(async (value: string) => {
    setSearch(value);
    if (!value) {
      setResults([]);
      setError("");
      return;
    }
    setIsLoading(true);
    if (!(window as any).pagefind) {
      try {
        await importPagefind();
      } catch (err: any) {
        setError(
          process.env.NODE_ENV !== "production"
            ? DEV_SEARCH_NOTICE
            : `${err?.constructor?.name || "Error"}: ${err?.message}`
        );
        setIsLoading(false);
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
        url: newData.url.replace(/\.html$/, "").replace(/\.html#/, "#"),
        sub_results: newData.sub_results.map((r) => {
          const url = r.url.replace(/\.html$/, "").replace(/\.html#/, "#");
          return { ...r, url };
        }),
      }))
    );
  }, []);

  // Handle input change
  const handleInputChange = (value: string) => {
    handleSearch(value);
  };

  // Handle selecting a result
  const handleSelect = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={"ghost"}>
        <span>Search</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-brand-rose-1/10 bg-brand-rose-1/5 px-1.5 font-mono text-[10px] font-medium text-brand-rose-1 opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={search}
          onValueChange={handleInputChange}
          ref={inputRef}
        />
        <CommandList>
          {isLoading && <CommandItem disabled>Loading...</CommandItem>}
          {error && <CommandItem disabled>{error}</CommandItem>}
          {!isLoading && !error && results.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {!isLoading && !error && results.length > 0 && (
            <CommandGroup heading="Results">
              {results.map((result, idx) => (
                <CommandItem
                  key={result.url + idx}
                  onSelect={() => handleSelect(result.url)}
                  value={result.meta.title}
                >
                  <div>
                    <div className="font-medium">{result.meta.title}</div>
                    <div
                      className="text-xs text-muted-foreground line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: result.excerpt }}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default SearchInput;
