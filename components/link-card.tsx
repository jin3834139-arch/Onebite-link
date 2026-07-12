"use client";

import Image from "next/image";
import { useState } from "react";
import type { BookmarkLink } from "@/lib/types";
import { useLinks } from "@/lib/links-context";
import { PencilIcon, TrashIcon } from "./icons";
import DeleteLinkModal from "./delete-link-modal";
import EditLinkModal from "./edit-link-modal";

export default function LinkCard({ link }: { link: BookmarkLink }) {
  const { deleteLink } = useLinks();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const hostname = getHostname(link.url);

  return (
    <div className="group relative">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--surface)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      >
        <div className="relative flex h-32 items-center justify-center bg-[var(--accent-soft)]">
          <Image src={link.thumbnail} alt="" width={48} height={48} className="opacity-80" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-5">
          <h3 className="line-clamp-1 text-[17px] font-bold text-[var(--text)]">
            {link.title}
          </h3>
          <p className="line-clamp-2 text-sm text-[var(--text-sub)]">
            {link.description}
          </p>
          <span className="mt-auto pt-2 text-xs text-[var(--placeholder)]">
            {hostname}
          </span>
        </div>
      </a>

      <div className="absolute right-3 top-3 hidden items-center gap-1 group-hover:flex">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label={`${link.title} 링크 수정`}
          className="rounded-lg bg-white/90 p-1.5 text-[var(--text-sub)] hover:text-[var(--accent)]"
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          onClick={() => setIsConfirmingDelete(true)}
          aria-label={`${link.title} 링크 삭제`}
          className="rounded-lg bg-white/90 p-1.5 text-[var(--text-sub)] hover:text-[var(--error)]"
        >
          <TrashIcon />
        </button>
      </div>

      {isEditing && (
        <EditLinkModal link={link} onClose={() => setIsEditing(false)} />
      )}

      {isConfirmingDelete && (
        <DeleteLinkModal
          linkTitle={link.title}
          onCancel={() => setIsConfirmingDelete(false)}
          onConfirm={() => {
            deleteLink(link.id);
            setIsConfirmingDelete(false);
          }}
        />
      )}
    </div>
  );
}

function getHostname(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}
