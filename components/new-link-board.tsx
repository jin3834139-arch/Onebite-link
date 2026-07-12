import type { Folder } from "@/lib/types";
import Sidebar from "./sidebar";
import NewLinkForm from "./new-link-form";

export default function NewLinkBoard({ folders }: { folders: Folder[] }) {
  const totalCount = folders.reduce((sum, folder) => sum + folder.linkCount, 0);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-5 pt-9 pb-6">
      <Sidebar totalCount={totalCount} />
      <NewLinkForm folders={folders} />
    </div>
  );
}
