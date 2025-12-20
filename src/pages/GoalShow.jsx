import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getGoal, deleteGoal } from "../api/goals";

export default function GoalShow() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const data = await getGoal(id);
        setGoal(data);
      } catch (e) {
        console.error(e);
        setErrorMsg("詳細の取得に失敗しました（存在しないIDかも）");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // ★ 削除処理
  const handleDelete = async () => {
    const ok = window.confirm("この目標を削除しますか？");
    if (!ok) return;

    try {
      await deleteGoal(id);
      alert("削除しました");
      navigate("/goals"); // 一覧へ戻る
    } catch (e) {
      console.error(e);
      alert("削除に失敗しました");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">目標の詳細</h1>
          <Link className="text-white/80 hover:text-white" to="/goals">
            ← 一覧へ
          </Link>
        </div>

        {loading && <div className="text-white/70">読み込み中…</div>}

        {!loading && errorMsg && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
            {errorMsg}
          </div>
        )}

        {!loading && !errorMsg && goal && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">{goal.title}</h2>

            {goal.note && (
              <div className="mt-4">
                <div className="text-sm text-white/60 mb-2">メモ</div>
                <p className="whitespace-pre-wrap text-white/85">
                  {goal.note}
                </p>
              </div>
            )}

            {/* ★ 削除ボタン */}
            <div className="mt-8 flex justify-end gap-3">
               <Link
                to={`/goals/${goal.id}/edit`}
                className="rounded-xl bg-white/15 hover:bg-white/20 border border-white/10 px-4 py-2 font-semibold"
              >
                編集
              </Link>
              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 font-semibold"
              >
                削除
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
