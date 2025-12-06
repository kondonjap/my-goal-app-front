import GoalForm from "../components/GoalForm";
import { createGoal } from "../api/goals";

export default function GoalCreate() {
  const handleSubmit = async (data) => {
    console.log("送信データ:", data);

    try {
      await createGoal(data);
      alert("登録しました！");
    } catch (e) {
      console.error(e);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">目標を登録する</h1>
      <GoalForm onSubmit={handleSubmit} />
    </div>
  );
}
