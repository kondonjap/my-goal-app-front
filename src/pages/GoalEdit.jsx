import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGoal, updateGoal } from "../api/goals";

export default function GoalEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const g = await getGoal(id);
        setTitle(g.title ?? "");
        setDeadline(g.deadline ?? "");
        setNote(g.note ?? "");
      } catch (e) {
        console.error(e);
        setErrorMsg("読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      await updateGoal(id, { title, deadline, note });
      alert("更新しました");
      navigate(`/goals/${id}`);
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">目標を編集</h1>
          <Link className="text-white/80 hover:text-white" to="/">
            ← トップへ
          </Link>
          <Link className="text-white/80 hover:text-white" to={`/goals/${id}`}>
            ← 詳細へ
          </Link>
        </div>

        {loading && <div className="text-white/70">読み込み中…</div>}

        {!loading && errorMsg && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
            {errorMsg}
          </div>
        )}

        {!loading && !errorMsg && (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/80">目標タイトル</label>
              <input
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例）筋トレを週3回続ける"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/80">期限</label>
              <input
                type="date"
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/80">メモ</label>
              <textarea
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 min-h-[140px] outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="メモや注意点など"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Link
                to={`/goals/${id}`}
                className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2"
              >
                キャンセル
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-white/15 hover:bg-white/20 border border-white/10 px-4 py-2 font-semibold disabled:opacity-50"
              >
                {saving ? "更新中…" : "更新"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
