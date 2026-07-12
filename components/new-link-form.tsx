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
        className="flex h-fit w-full max-w-lg flex-col gap-5 rounded-2xl bg-[var(--surface)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="url" className="text-sm font-medium text-[var(--text-sub)]">
            링크 주소
          </label>
          <input
            id="url"
            type="url"
            required
            placeholder="https://example.com"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="input-field rounded-xl px-4 py-3.5 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="folder" className="text-sm font-medium text-[var(--text-sub)]">
            폴더
          </label>
          <select
            id="folder"
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            className="input-field rounded-xl px-4 py-3.5 text-[17px] text-[var(--text)]"
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
          className="btn-primary mt-2 rounded-xl px-5 py-3.5 text-[17px] font-bold text-white"
        >
          저장
        </button>
      </form>
    </main>
  );
}
