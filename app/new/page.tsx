import Header from "@/components/header";
import NewLinkBoard from "@/components/new-link-board";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <NewLinkBoard folders={folders} />
    </div>
  );
}
