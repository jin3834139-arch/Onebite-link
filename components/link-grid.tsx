import type { BookmarkLink } from "@/lib/types";
import LinkCard from "./link-card";

export default function LinkGrid({ links }: { links: BookmarkLink[] }) {
  if (links.length === 0) {
    return (
      <main className="flex flex-1 items-center justify-center rounded-2xl bg-[var(--surface)] text-sm text-[var(--text-sub)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        등록된 링크가 없습니다.
      </main>
    );
  }

  return (
    <main className="grid flex-1 auto-rows-min grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </main>
  );
}
