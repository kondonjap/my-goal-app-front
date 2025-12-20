import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">人生の管理画面</h1>
          <p className="text-white/60 mt-2">
            自己分析・目標・振り返りをまとめて管理するダッシュボード
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* 目標 */}
          <Link
            to="/goals"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition block"
          >
            <div className="text-xl font-semibold">目標</div>
            <div className="text-white/60 mt-2 text-sm">
              目標の登録・一覧・詳細・編集
            </div>
            <div className="mt-4 text-sm text-white/80">→ 開く</div>
          </Link>

          {/* ダミー（今後追加する機能） */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 opacity-60">
            <div className="text-xl font-semibold">自己分析</div>
            <div className="text-white/60 mt-2 text-sm">
              価値観 / 強み弱み / 人生の軸（準備中）
            </div>
            <div className="mt-4 text-sm text-white/60">準備中</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 opacity-60">
            <div className="text-xl font-semibold">日記 / 振り返り</div>
            <div className="text-white/60 mt-2 text-sm">
              今日の気づき・感情・改善点（準備中）
            </div>
            <div className="mt-4 text-sm text-white/60">準備中</div>
          </div>
        </div>
      </div>
    </div>
  );
}
