"use client";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className="absolute right-4 top-4 z-10 h-7 w-7 flex items-center justify-center rounded bg-gray-11 hover:bg-gray-10 text-gray-1 transition"
      aria-label="Copy code"
      type="button"
    >
      {copied ? (
        <CheckIcon className="size-4" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </button>
  );
}
