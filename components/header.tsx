"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusIcon, FolderIcon } from "./icons";
import NewFolderModal from "./new-folder-modal";

export default function Header() {
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-[var(--surface)] px-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <Link
        href="/"
        className="link-hover text-xl font-bold tracking-tight text-[var(--text)]"
      >
        한입 링크
      </Link>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsNewFolderOpen(true)}
          className="btn-secondary flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[15px] font-bold"
        >
          <FolderIcon />
          새 폴더
        </button>

        <Link
          href="/new"
          className="btn-primary flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[15px] font-bold text-white"
        >
          <PlusIcon />
          새 링크
        </Link>
      </div>

      {isNewFolderOpen && (
        <NewFolderModal onClose={() => setIsNewFolderOpen(false)} />
      )}
    </header>
  );
}
