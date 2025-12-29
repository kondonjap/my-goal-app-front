import { Link } from "react-router-dom";

export default function ComingSoon({ title }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          <Link className="text-white/80 hover:text-white" to="/">
            ← トップへ
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white/70">
          この機能は準備中です。
        </div>
      </div>
    </div>
  );
}
