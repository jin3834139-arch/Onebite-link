import Link from "next/link";
import { PlusIcon } from "./icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-black/[.08] bg-white/80 px-6 py-4 backdrop-blur-sm dark:border-white/[.145] dark:bg-black/80">
      <Link
        href="/"
        className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
      >
        한입 링크
      </Link>

      <Link
        href="/new"
        className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        <PlusIcon />
        새 링크
      </Link>
    </header>
  );
}
