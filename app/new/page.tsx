import Header from "@/components/header";
import NewLinkBoard from "@/components/new-link-board";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <NewLinkBoard folders={folders} />
    </div>
  );
}
