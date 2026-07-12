"use client";

import { useState, type FormEvent } from "react";
import { useFolders } from "@/lib/folders-context";

export default function NewFolderModal({ onClose }: { onClose: () => void }) {
  const { addFolder } = useFolders();
  const [name, setName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    addFolder(trimmed);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 px-5">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-[var(--surface)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      >
        <h2 className="text-xl font-bold text-[var(--text)]">새 폴더</h2>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="folder-name"
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            폴더 이름
          </label>
          <input
            id="folder-name"
            type="text"
            autoFocus
            required
            placeholder="폴더 이름을 입력하세요"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input-field rounded-xl px-4 py-3.5 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1 rounded-xl px-5 py-3.5 text-[17px] font-bold"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!name.trim()}
            className="btn-primary flex-1 rounded-xl px-5 py-3.5 text-[17px] font-bold text-white"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
