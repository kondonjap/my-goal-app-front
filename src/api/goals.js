import axios from "axios";

// 目標表示画面
export const getGoals = async () => {
  const res = await axios.get("http://localhost:8000/api/goals");
  return res.data; // 例: [{id, title, deadline, note, created_at...}]
};
// 目標登録画面
export const createGoal = (data) => {
  return axios.post("http://127.0.0.1:8000/api/goals", data);
};
