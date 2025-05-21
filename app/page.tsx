import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-start gap-8">
      <div className="space-y-6">
        <div className="flex items-center">
          <Image
            src="/images/multiverse-logo.png"
            alt="Multiverse"
            width={200}
            height={50}
            className="brightness-200"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Multiverse Computing
        </h1>
        <p className="text-xl text-gray-5"></p>
      </div>
      <div className="flex gap-4">
        <Button
          className="bg-brand-rose-1 hover:bg-brand-rose-1/90 text-white"
          asChild
        >
          <Link href="/docs/getting-started">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="https://multiversecomputing.com">Website</Link>
        </Button>
      </div>
      {/* <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-11 p-6">
          <h3 className="mb-2 text-xl font-medium">L</h3>
          <p className="text-gray-5">
            Write your documentation in Markdown with JSX components.
          </p>
        </div>
        <div className="rounded-lg border border-gray-11 p-6">
          <h3 className="mb-2 text-xl font-medium">Syntax Highlighting</h3>
          <p className="text-gray-5">
            Beautiful code blocks with syntax highlighting for various
            languages.
          </p>
        </div>
        <div className="rounded-lg border border-gray-11 p-6">
          <h3 className="mb-2 text-xl font-medium">Dark Mode</h3>
          <p className="text-gray-5">
            A sleek dark theme for comfortable reading.
          </p>
        </div>
        <div className="rounded-lg border border-gray-11 p-6">
          <h3 className="mb-2 text-xl font-medium">Responsive Design</h3>
          <p className="text-gray-5">
            Looks great on all devices, from mobile to desktop.
          </p>
        </div>
      </div> */}
    </div>
  );
}
