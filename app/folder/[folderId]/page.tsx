import Header from "@/components/header";
import BookmarkBoard from "@/components/bookmark-board";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <BookmarkBoard folderId={folderId} />
    </div>
  );
}
