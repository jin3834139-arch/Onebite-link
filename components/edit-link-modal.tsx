"use client";

import { useState, type FormEvent } from "react";
import { useFolders } from "@/lib/folders-context";
import { useLinks } from "@/lib/links-context";
import type { BookmarkLink } from "@/lib/types";

export default function EditLinkModal({
  link,
  onClose,
}: {
  link: BookmarkLink;
  onClose: () => void;
}) {
  const { folders } = useFolders();
  const { updateLink } = useLinks();
  const [folderId, setFolderId] = useState(link.folderId);
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !folderId) return;

    updateLink(link.id, {
      folderId,
      title: trimmedTitle,
      description: description.trim(),
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 px-5">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-[var(--surface)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      >
        <h2 className="text-xl font-bold text-[var(--text)]">링크 수정</h2>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-link-folder"
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            폴더
          </label>
          <select
            id="edit-link-folder"
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

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-link-title"
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            제목
          </label>
          <input
            id="edit-link-title"
            type="text"
            required
            placeholder="링크 제목을 입력하세요"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="input-field rounded-xl px-4 py-3.5 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-link-description"
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            설명
          </label>
          <textarea
            id="edit-link-description"
            rows={3}
            placeholder="링크 설명을 입력하세요"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="input-field resize-none rounded-xl px-4 py-3.5 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)]"
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
            disabled={!title.trim()}
            className="btn-primary flex-1 rounded-xl px-5 py-3.5 text-[17px] font-bold text-white"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
