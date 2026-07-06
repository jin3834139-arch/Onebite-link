import type { BookmarkLink } from "@/lib/types";
import LinkCard from "./link-card";

export default function LinkGrid({ links }: { links: BookmarkLink[] }) {
  if (links.length === 0) {
    return (
      <main className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-zinc-300 text-sm text-zinc-400 dark:border-zinc-700 dark:text-zinc-500">
        등록된 링크가 없습니다.
      </main>
    );
  }

  return (
    <main className="grid flex-1 auto-rows-min grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </main>
  );
}
