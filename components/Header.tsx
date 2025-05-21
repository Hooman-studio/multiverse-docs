import Link from "next/link";
import Image from "next/image";
import SearchInput from "@/components/search-input";

export default function Header() {
  return (
    <header className="w-full h-16 flex items-center justify-between border-b border-gray-11 bg-gray-14 px-4 lg:px-6 z-30 fixed top-0">
      <div className="flex items-center">
        <Link href="/" className="flex items-center ml-12 lg:ml-0">
          <Image
            src="/images/multiverse-logo.png"
            alt="Multiverse"
            width={120}
            height={32}
            className="brightness-200"
            priority
          />
        </Link>
      </div>

      <SearchInput className="max-w-md" />
    </header>
  );
}
