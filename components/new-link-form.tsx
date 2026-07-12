"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useFolders } from "@/lib/folders-context";
import { useLinks } from "@/lib/links-context";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!url || !folderId) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "링크 정보를 가져오지 못했어요.");
      }

      addLink({
        folderId,
        title: data.title,
        url: data.url,
        description: data.description,
        thumbnail: data.thumbnail || "/globe.svg",
      });

      router.push(`/folder/${folderId}`);
    } catch {
      setError("링크 정보를 가져오지 못했어요. 주소를 확인하고 다시 시도해주세요.");
      setIsSubmitting(false);
    }
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

        {error && <p className="text-sm text-[var(--error)]">{error}</p>}

        <button
          type="submit"
          disabled={!url || isSubmitting}
          className="btn-primary mt-2 rounded-xl px-5 py-3.5 text-[17px] font-bold text-white"
        >
          {isSubmitting ? "가져오는 중..." : "저장"}
        </button>
      </form>
    </main>
  );
}
