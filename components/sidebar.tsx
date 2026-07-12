"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFolders } from "@/lib/folders-context";
import { useLinks } from "@/lib/links-context";
import FolderList from "./folder-list";

export default function Sidebar() {
  const pathname = usePathname();
  const isAllActive = pathname === "/";
  const { folders } = useFolders();
  const { links } = useLinks();
  const totalCount = links.length;

  return (
    <aside className="hidden w-56 shrink-0 flex-col gap-6 sm:flex">
      <Link
        href="/"
        className={`nav-item flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] font-bold ${
          isAllActive
            ? "nav-item-active"
            : "text-[var(--text)]"
        }`}
      >
        <span>ALL</span>
        <span className="text-xs font-normal opacity-70">{totalCount}</span>
      </Link>

      <div className="flex flex-col gap-1">
        <p className="px-3 text-xs font-medium uppercase tracking-wide text-[var(--text-sub)]">
          폴더
        </p>
        <FolderList folders={folders} />
      </div>
    </aside>
  );
}
