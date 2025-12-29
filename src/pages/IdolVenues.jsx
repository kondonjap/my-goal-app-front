import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVenues, createVenue } from "../api/idols";

export default function IdolVenues() {
  const [venues, setVenues] = useState([]);
  const [name, setName] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getVenues();
      setVenues(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setErrorMsg("会場の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    setErrorMsg("");
    try {
      await createVenue({ name: name.trim(), prefecture: prefecture.trim() || null });
      setName("");
      setPrefecture("");
      await load();
    } catch (e) {
      console.error(e);
      setErrorMsg("会場の登録に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">会場管理</h1>
            <p className="text-white/60 mt-2">現場記録で使う会場を登録</p>
          </div>
          <div className="flex gap-4">
            <Link className="text-white/80 hover:text-white" to="/idols">
              ← アイドルトップ
            </Link>
            <Link className="text-white/80 hover:text-white" to="/">
              トップ
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 登録 */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="text-lg font-semibold mb-4">会場を追加</div>

            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm text-white/80">会場名 *</label>
              <input
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例）Zepp Sapporo"
                required
              />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-sm text-white/80">都道府県（任意）</label>
              <input
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10"
                value={prefecture}
                onChange={(e) => setPrefecture(e.target.value)}
                placeholder="例）北海道"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-white/15 hover:bg-white/20 border border-white/10 px-4 py-3 font-semibold disabled:opacity-50"
            >
              {saving ? "登録中…" : "登録"}
            </button>

            {errorMsg && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-200">
                {errorMsg}
              </div>
            )}
          </form>

          {/* 一覧 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">会場一覧</div>
              <button
                onClick={load}
                className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 text-sm"
              >
                再読み込み
              </button>
            </div>

            {loading && <div className="text-white/70">読み込み中…</div>}

            {!loading && venues.length === 0 && (
              <div className="text-white/70">まだ会場がありません</div>
            )}

            {!loading && venues.length > 0 && (
              <div className="grid gap-3">
                {venues.map((v) => (
                  <div
                    key={v.id}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="font-semibold">{v.name}</div>
                    {v.prefecture && (
                      <div className="text-sm text-white/60 mt-1">{v.prefecture}</div>
                    )}
                    <div className="text-xs text-white/40 mt-2">ID: {v.id}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
