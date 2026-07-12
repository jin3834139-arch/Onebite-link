import type { BookmarkLink } from "@/lib/types";
import Sidebar from "./sidebar";
import LinkGrid from "./link-grid";

export default function BookmarkBoard({ links }: { links: BookmarkLink[] }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-5 pt-9 pb-6">
      <Sidebar totalCount={links.length} />
      <LinkGrid links={links} />
    </div>
  );
}
