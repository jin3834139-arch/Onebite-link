import Header from "@/components/header";
import BookmarkBoard from "@/components/bookmark-board";
import { links } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <BookmarkBoard links={links} />
    </div>
  );
}
