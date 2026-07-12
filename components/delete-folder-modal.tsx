"use client";

export default function DeleteFolderModal({
  folderName,
  onCancel,
  onConfirm,
}: {
  folderName: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 px-5">
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-[var(--surface)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl font-bold text-[var(--text)]">폴더 삭제</h2>
          <p className="text-[15px] text-[var(--text-sub)]">
            <span className="font-bold text-[var(--text)]">{folderName}</span>{" "}
            폴더를 정말 삭제하시겠어요?
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1 rounded-xl px-5 py-3.5 text-[17px] font-bold"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-danger flex-1 rounded-xl px-5 py-3.5 text-[17px] font-bold text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
