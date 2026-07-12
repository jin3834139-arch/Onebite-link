"use client";

import { useFolders } from "@/lib/folders-context";
import Sidebar from "./sidebar";
import LinkGrid from "./link-grid";

export default function BookmarkBoard({ folderId }: { folderId?: string }) {
  const { folders } = useFolders();
  const folderExists = !folderId || folders.some((folder) => folder.id === folderId);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-5 pt-9 pb-6">
      <Sidebar />
      {folderExists ? (
        <LinkGrid folderId={folderId} />
      ) : (
        <main className="flex flex-1 items-center justify-center rounded-2xl bg-[var(--surface)] text-sm text-[var(--text-sub)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          존재하지 않는 폴더입니다.
        </main>
      )}
    </div>
  );
}
