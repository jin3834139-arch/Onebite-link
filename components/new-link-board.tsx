import Sidebar from "./sidebar";
import NewLinkForm from "./new-link-form";

export default function NewLinkBoard() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-5 pt-9 pb-6">
      <Sidebar />
      <NewLinkForm />
    </div>
  );
}
