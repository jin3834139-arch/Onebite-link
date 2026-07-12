import Image from "next/image";
import type { BookmarkLink } from "@/lib/types";

export default function LinkCard({ link }: { link: BookmarkLink }) {
  const hostname = getHostname(link.url);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col overflow-hidden rounded-2xl bg-[var(--surface)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
    >
      <div className="relative flex h-32 items-center justify-center bg-[var(--accent-soft)]">
        <Image src={link.thumbnail} alt="" width={48} height={48} className="opacity-80" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="line-clamp-1 text-[17px] font-bold text-[var(--text)]">
          {link.title}
        </h3>
        <p className="line-clamp-2 text-sm text-[var(--text-sub)]">
          {link.description}
        </p>
        <span className="mt-auto pt-2 text-xs text-[var(--placeholder)]">
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
