import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import GoalCreate from "./pages/GoalCreate";
import GoalIndex from "./pages/GoalIndex";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-neutral-950 text-white min-h-screen">
        <div className="mx-auto max-w-3xl px-6 py-4 flex gap-4">
          <Link className="text-white/80 hover:text-white" to="/goals">
            一覧
          </Link>
          <Link className="text-white/80 hover:text-white" to="/goals/new">
            登録
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/goals" replace />} />
          <Route path="/goals" element={<GoalIndex />} />
          <Route path="/goals/new" element={<GoalCreate />} />
          <Route path="*" element={<div className="p-6">ページがありません</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
