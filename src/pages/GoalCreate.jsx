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
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6">目標を登録する</h1>
        <GoalForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
