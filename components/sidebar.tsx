"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/lib/types";
import FolderList from "./folder-list";

export default function Sidebar({
  folders,
  totalCount,
}: {
  folders: Folder[];
  totalCount: number;
}) {
  const pathname = usePathname();
  const isAllActive = pathname === "/";

  return (
    <aside className="hidden w-56 shrink-0 flex-col gap-4 sm:flex">
      <Link
        href="/"
        className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
          isAllActive
            ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
            : "text-zinc-700 hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-white/10"
        }`}
      >
        <span>ALL</span>
        <span className="text-xs font-normal opacity-70">{totalCount}</span>
      </Link>

      <div className="flex flex-col gap-1">
        <p className="px-3 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          폴더
        </p>
        <FolderList folders={folders} />
      </div>
    </aside>
  );
}
