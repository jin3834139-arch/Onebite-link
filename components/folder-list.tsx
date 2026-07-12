"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { Folder } from "@/lib/types";
import { useFolders } from "@/lib/folders-context";
import { FolderIcon, PencilIcon, TrashIcon } from "./icons";
import DeleteFolderModal from "./delete-folder-modal";
import EditFolderModal from "./edit-folder-modal";

export default function FolderList({ folders }: { folders: Folder[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { deleteFolder } = useFolders();
  const [pendingDelete, setPendingDelete] = useState<Folder | null>(null);
  const [pendingEdit, setPendingEdit] = useState<Folder | null>(null);

  if (folders.length === 0) {
    return (
      <p className="px-3 text-sm text-[var(--text-sub)]">폴더가 없습니다.</p>
    );
  }

  function handleConfirmDelete() {
    if (!pendingDelete) return;
    const wasActive = pathname === `/folder/${pendingDelete.id}`;
    deleteFolder(pendingDelete.id);
    setPendingDelete(null);
    if (wasActive) {
      router.push("/");
    }
  }

  return (
    <>
      <ul className="flex flex-col gap-1">
        {folders.map((folder) => {
          const isSelected = pathname === `/folder/${folder.id}`;

          return (
            <li key={folder.id} className="group relative">
              <Link
                href={`/folder/${folder.id}`}
                className={`nav-item flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[15px] ${
                  isSelected ? "nav-item-active" : "text-[var(--text)]"
                }`}
              >
                <FolderIcon className="shrink-0 opacity-70" />
                <span className="flex-1 truncate text-left">{folder.name}</span>
                <span className="text-xs opacity-70 group-hover:hidden">
                  {folder.linkCount}
                </span>
              </Link>
              <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 group-hover:flex">
                <button
                  type="button"
                  onClick={() => setPendingEdit(folder)}
                  aria-label={`${folder.name} 폴더 수정`}
                  className={`rounded-lg p-1.5 ${
                    isSelected
                      ? "text-white hover:opacity-80"
                      : "text-[var(--text-sub)] hover:text-[var(--accent)]"
                  }`}
                >
                  <PencilIcon />
                </button>
                <button
                  type="button"
                  onClick={() => setPendingDelete(folder)}
                  aria-label={`${folder.name} 폴더 삭제`}
                  className={`rounded-lg p-1.5 ${
                    isSelected
                      ? "text-white hover:opacity-80"
                      : "text-[var(--text-sub)] hover:text-[var(--error)]"
                  }`}
                >
                  <TrashIcon />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {pendingEdit && (
        <EditFolderModal
          folder={pendingEdit}
          onClose={() => setPendingEdit(null)}
        />
      )}

      {pendingDelete && (
        <DeleteFolderModal
          folderName={pendingDelete.name}
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
