import { notFound } from "next/navigation";
import Header from "@/components/header";
import BookmarkBoard from "@/components/bookmark-board";
import { folders, links } from "@/lib/mock-data";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    notFound();
  }

  const folderLinks = links.filter((link) => link.folderId === folderId);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <BookmarkBoard folders={folders} links={folderLinks} />
    </div>
  );
}
