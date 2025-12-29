import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/DashBoard";

// Goals（既存）
import GoalIndex from "./pages/GoalIndex";
import GoalCreate from "./pages/GoalCreate";
import GoalShow from "./pages/GoalShow";
import GoalEdit from "./pages/GoalEdit";
import IdolsHome from "./pages/IdolsHome";
import IdolVenues from "./pages/IdolVenues";
import IdolMembers from "./pages/IdolMembers";
import IdolEvents from "./pages/IdolEvents";


// Coming soon pages
import Memos from "./pages/Memos";
import Workouts from "./pages/Workouts";
import QA from "./pages/QA";
import Habits from "./pages/Habits";
import Schedule from "./pages/Schedule";
import Ideas from "./pages/Ideas";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-neutral-950 text-white min-h-screen">
        {/* 共通ナビ（最小） */}
        <div className="mx-auto max-w-5xl px-6 py-4 flex gap-4">
          <Link className="text-white/80 hover:text-white" to="/">
            トップ
          </Link>
          <Link className="text-white/80 hover:text-white" to="/goals">
            目標
          </Link>
          <Link className="text-white/80 hover:text-white" to="/idols">
            アイドル
          </Link>
        </div>

        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Features */}
          <Route path="/memos" element={<Memos />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/ideas" element={<Ideas />} />

          {/* Goals */}
          <Route path="/goals" element={<GoalIndex />} />
          <Route path="/goals/new" element={<GoalCreate />} />
          <Route path="/goals/:id" element={<GoalShow />} />
          <Route path="/goals/:id/edit" element={<GoalEdit />} />
          <Route path="/idols" element={<IdolsHome />} />
          <Route path="/idols/venues" element={<IdolVenues />} />
          <Route path="/idols/members" element={<IdolMembers />} />
          <Route path="/idols/events" element={<IdolEvents />} />

          {/* 404 */}
          <Route path="*" element={<div className="p-6">ページがありません</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
