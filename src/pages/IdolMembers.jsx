import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMembers, createMember } from "../api/idols";

export default function IdolMembers() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getMembers();
      setMembers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setErrorMsg("推しの取得に失敗しました");
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
      await createMember({ name: name.trim(), group_name: groupName.trim() || null });
      setName("");
      setGroupName("");
      await load();
    } catch (e) {
      console.error(e);
      setErrorMsg("推しの登録に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">推し管理</h1>
            <p className="text-white/60 mt-2">チェキ集計の土台を登録</p>
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
            <div className="text-lg font-semibold mb-4">推しを追加</div>

            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm text-white/80">名前 *</label>
              <input
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例）Aちゃん"
                required
              />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-sm text-white/80">グループ名（任意）</label>
              <input
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="例）〇〇48"
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
              <div className="text-lg font-semibold">推し一覧</div>
              <button
                onClick={load}
                className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 text-sm"
              >
                再読み込み
              </button>
            </div>

            {loading && <div className="text-white/70">読み込み中…</div>}

            {!loading && members.length === 0 && (
              <div className="text-white/70">まだ推しがありません</div>
            )}

            {!loading && members.length > 0 && (
              <div className="grid gap-3">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="font-semibold">{m.name}</div>
                    {m.group_name && (
                      <div className="text-sm text-white/60 mt-1">
                        {m.group_name}
                      </div>
                    )}
                    <div className="text-xs text-white/40 mt-2">ID: {m.id}</div>
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
