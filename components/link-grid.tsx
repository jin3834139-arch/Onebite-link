"use client";

import { useLinks } from "@/lib/links-context";
import LinkCard from "./link-card";

export default function LinkGrid({ folderId }: { folderId?: string }) {
  const { links } = useLinks();
  const filteredLinks = folderId
    ? links.filter((link) => link.folderId === folderId)
    : links;

  if (filteredLinks.length === 0) {
    return (
      <main className="flex flex-1 items-center justify-center rounded-2xl bg-[var(--surface)] text-sm text-[var(--text-sub)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        등록된 링크가 없습니다.
      </main>
    );
  }

  return (
    <main className="grid flex-1 auto-rows-min grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {filteredLinks.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </main>
  );
}
