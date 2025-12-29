import { Link } from "react-router-dom";

export default function IdolsHome() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">アイドル</h1>
            <p className="text-white/60 mt-2">現場記録の土台を整える</p>
          </div>
          <Link className="text-white/80 hover:text-white" to="/">
            ← トップへ
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/idols/venues"
            className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <div className="text-xl font-semibold">会場管理</div>
            <div className="text-white/60 mt-2 text-sm">
              よく行くライブ会場を登録（可視化の土台）
            </div>
            <div className="mt-4 text-sm text-white/80">→ 開く</div>
          </Link>

          <Link
            to="/idols/members"
            className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <div className="text-xl font-semibold">推し管理</div>
            <div className="text-white/60 mt-2 text-sm">
              推し（アイドル）を登録（チェキ集計の土台）
            </div>
            <div className="mt-4 text-sm text-white/80">→ 開く</div>
          </Link>

          <Link
            to="/idols/events"
            className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <div className="text-xl font-semibold">現場記録</div>
            <div className="text-white/60 mt-2 text-sm">
              ライブ情報入力
            </div>
            <div className="mt-4 text-sm text-white/80">→ 開く</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
