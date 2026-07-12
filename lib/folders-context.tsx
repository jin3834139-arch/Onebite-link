"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Folder } from "./types";
import { folders as initialFolders } from "./mock-data";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  function addFolder(name: string) {
    setFolders((prev) => [...prev, { id: crypto.randomUUID(), name }]);
  }

  function renameFolder(id: string, name: string) {
    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name } : folder))
    );
  }

  function deleteFolder(id: string) {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }

  return (
    <FoldersContext.Provider
      value={{ folders, addFolder, renameFolder, deleteFolder }}
    >
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }
  return context;
}
