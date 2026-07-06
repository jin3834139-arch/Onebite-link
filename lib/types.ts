export type Folder = {
  id: string;
  name: string;
  linkCount: number;
};

export type BookmarkLink = {
  id: string;
  folderId: string;
  title: string;
  url: string;
  description: string;
  thumbnail: string;
  createdAt: string;
};
