import type { BookmarkLink, Folder } from "@/lib/types";
import Sidebar from "./sidebar";
import LinkGrid from "./link-grid";

export default function BookmarkBoard({
  folders,
  links,
}: {
  folders: Folder[];
  links: BookmarkLink[];
}) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-6 py-6">
      <Sidebar folders={folders} totalCount={links.length} />
      <LinkGrid links={links} />
    </div>
  );
}
