"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { BookmarkLink } from "./types";
import { links as initialLinks } from "./mock-data";

type NewLinkInput = {
  folderId: string;
  title: string;
  url: string;
  description: string;
  thumbnail: string;
};

type LinksContextValue = {
  links: BookmarkLink[];
  addLink: (input: NewLinkInput) => void;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<BookmarkLink[]>(initialLinks);

  function addLink(input: NewLinkInput) {
    const newLink: BookmarkLink = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString().slice(0, 10),
      ...input,
    };
    setLinks((prev) => [newLink, ...prev]);
  }

  return (
    <LinksContext.Provider value={{ links, addLink }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
}
