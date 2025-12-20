import { useState } from "react";

export default function GoalForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, deadline, note });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-white/80">目標タイトル</label>
        <input
          type="text"
          className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例）筋トレを週3回続ける"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-white/80">メモ</label>
        <textarea
          className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 min-h-[120px] outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="メモや注意点など"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-red-500 hover:bg-red-600 text-white py-3 font-semibold"
      >
        登録
      </button>
    </form>
  );
}
