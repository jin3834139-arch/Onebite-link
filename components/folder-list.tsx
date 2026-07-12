import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/lib/types";
import { FolderIcon } from "./icons";

export default function FolderList({ folders }: { folders: Folder[] }) {
  const pathname = usePathname();

  if (folders.length === 0) {
    return (
      <p className="px-3 text-sm text-[var(--text-sub)]">폴더가 없습니다.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => {
        const isSelected = pathname === `/folder/${folder.id}`;

        return (
          <li key={folder.id}>
            <Link
              href={`/folder/${folder.id}`}
              className={`nav-item flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[15px] ${
                isSelected ? "nav-item-active" : "text-[var(--text)]"
              }`}
            >
              <FolderIcon className="shrink-0 opacity-70" />
              <span className="flex-1 truncate text-left">{folder.name}</span>
              <span className="text-xs opacity-70">{folder.linkCount}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
