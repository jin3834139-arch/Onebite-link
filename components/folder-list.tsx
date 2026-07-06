import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/lib/types";
import { FolderIcon } from "./icons";

export default function FolderList({ folders }: { folders: Folder[] }) {
  const pathname = usePathname();

  if (folders.length === 0) {
    return (
      <p className="px-3 text-sm text-zinc-400 dark:text-zinc-500">
        폴더가 없습니다.
      </p>
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
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                isSelected
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-white/10"
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
