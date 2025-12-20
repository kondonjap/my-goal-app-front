import GoalForm from "../components/GoalForm";
import { createGoal } from "../api/goals";

export default function GoalCreate() {
  const handleSubmit = async (data) => {
    try {
      await createGoal(data);
      alert("登録しました！");
    } catch (e) {
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">目標を登録する</h1>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <GoalForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
