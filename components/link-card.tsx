import Image from "next/image";
import type { BookmarkLink } from "@/lib/types";

export default function LinkCard({ link }: { link: BookmarkLink }) {
  const hostname = getHostname(link.url);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-black/[.08] bg-white transition-shadow hover:shadow-lg dark:border-white/[.145] dark:bg-zinc-900"
    >
      <div className="relative flex h-32 items-center justify-center bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={link.thumbnail}
          alt=""
          width={48}
          height={48}
          className="opacity-80 dark:invert"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {link.title}
        </h3>
        <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
          {link.description}
        </p>
        <span className="mt-auto pt-2 text-xs text-zinc-400 dark:text-zinc-500">
          {hostname}
        </span>
      </div>
    </a>
  );
}

function getHostname(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}
