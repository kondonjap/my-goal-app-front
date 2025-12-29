import { Link } from "react-router-dom";

const Card = ({ title, desc, to, status = "ready" }) => {
  const base =
    "block rounded-2xl border border-white/10 bg-white/5 p-6 transition";
  const ready = "hover:bg-white/10";
  const disabled = "opacity-60 cursor-not-allowed";

  if (status === "coming_soon") {
    return (
      <div className={`${base} ${disabled}`}>
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-white/60 mt-2 text-sm">{desc}</div>
        <div className="mt-4 text-sm text-white/60">準備中</div>
      </div>
    );
  }

  return (
    <Link to={to} className={`${base} ${ready}`}>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-white/60 mt-2 text-sm">{desc}</div>
      <div className="mt-4 text-sm text-white/80">→ 開く</div>
    </Link>
  );
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">人生の管理画面</h1>
          <p className="text-white/60 mt-2">
            自己分析・行動・身体をまとめて管理するダッシュボード
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            title="メモ"
            desc="思ったことをサクッと残す"
            to="/memos"
            status="coming_soon"
          />
          <Card
            title="目標"
            desc="目標の登録・一覧・詳細・編集"
            to="/goals"
            status="ready"
          />
          <Card
            title="筋トレ"
            desc="種目・重量・回数を記録する"
            to="/workouts"
            status="coming_soon"
          />
          <Card
            title="1問1答"
            desc="問い→答えで自己理解を深める"
            to="/qa"
            status="coming_soon"
          />
          <Card
            title="習慣化リスト"
            desc="毎日のチェックで積み上げる"
            to="/habits"
            status="coming_soon"
          />
          <Card
            title="スケジュール"
            desc="予定・やることを登録する"
            to="/schedule"
            status="coming_soon"
          />
          <Card
            title="アイデア箱"
            desc="思いつきをストックする"
            to="/ideas"
            status="coming_soon"
          />
          <Card
            title="アイドル"
            desc="現場の記録・チェキ・支出の可視化"
            to="/idols"
            status="ready"
          />
        </div>
      </div>
    </div>
  );
}
