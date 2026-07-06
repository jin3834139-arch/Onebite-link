"use client";

import { useState, type FormEvent } from "react";
import type { Folder } from "@/lib/types";

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="flex flex-1 justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex h-fit w-full max-w-lg flex-col gap-5 rounded-xl border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-zinc-900"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="url"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            링크 주소
          </label>
          <input
            id="url"
            type="url"
            required
            placeholder="https://example.com"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="rounded-lg border border-black/[.08] bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="folder"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            폴더
          </label>
          <select
            id="folder"
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            className="rounded-lg border border-black/[.08] bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500"
          >
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!url}
          className="mt-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          저장
        </button>
      </form>
    </main>
  );
}
