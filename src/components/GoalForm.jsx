import { useState } from 'react'


export default function GoalForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      deadline,
      note,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 max-w-md">
      <div>
        <label className="block mb-1">目標タイトル</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例）筋トレを週3回続ける"
        />
      </div>

      <div>
        <label className="block mb-1">期限</label>
        <input
          type="date"
          className="border p-2 w-full"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">メモ</label>
        <textarea
          className="border p-2 w-full"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="メモや注意点など"
        />
      </div>

      <button className="bg-blue-600 text-white p-2 rounded" type="submit">
        登録
      </button>
    </form>
  );
}