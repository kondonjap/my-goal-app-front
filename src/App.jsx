import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import GoalIndex from "./pages/GoalIndex";
import GoalCreate from "./pages/GoalCreate";
import GoalShow from "./pages/GoalShow";
import GoalEdit from "./pages/GoalEdit";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-neutral-950 text-white min-h-screen">
        {/* 共通ナビ */}
        <div className="mx-auto max-w-5xl px-6 py-4 flex gap-4">
          <Link className="text-white/80 hover:text-white" to="/">
            トップ
          </Link>
          <Link className="text-white/80 hover:text-white" to="/goals">
            目標
          </Link>
          <Link className="text-white/80 hover:text-white" to="/goals/new">
            目標登録
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* Goals */}
          <Route path="/goals" element={<GoalIndex />} />
          <Route path="/goals/new" element={<GoalCreate />} />
          <Route path="/goals/:id" element={<GoalShow />} />
          <Route path="/goals/:id/edit" element={<GoalEdit />} />

          {/* 404 */}
          <Route path="*" element={<div className="p-6">ページがありません</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
