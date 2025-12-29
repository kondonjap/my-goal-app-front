import { useEffect, useState } from "react";
import { getGoals } from "../api/goals";
import { Link } from "react-router-dom";

export default function GoalIndex() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getGoals();
      setGoals(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setErrorMsg("一覧の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">目標一覧</h1>
          <button
            onClick={load}
            className="rounded-xl bg-white/15 hover:bg-white/20 border border-white/10 px-4 py-2 font-semibold"
          >
            再読み込み
          </button>
        </div>

        {loading && (
          <div className="text-white/70">読み込み中…</div>
        )}

        {!loading && errorMsg && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
            {errorMsg}
          </div>
        )}

        {!loading && !errorMsg && goals.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
            まだ目標がありません。まずは登録してみよう。
          </div>
        )}

        {!loading && !errorMsg && goals.length > 0 && (
          <div className="grid gap-4">
            {goals.map((g) => (
              <Link
                key={g.id}
                to={`/goals/${g.id}`}
                className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{g.title}</h2>

                    {g.deadline && (
                      <p className="text-sm text-white/60 mt-1">
                        期限：{g.deadline}
                      </p>
                    )}
                  </div>
                </div>

                {g.note && (
                  <p className="text-white/80 mt-4 whitespace-pre-wrap">
                    {g.note}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
