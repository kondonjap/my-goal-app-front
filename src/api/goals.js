import axios from "axios";

// 目標表示画面
export const getGoals = async () => {
  const res = await axios.get("http://localhost:8000/api/goals");
  return res.data;
};

// 目標詳細画面
export const getGoal = async (id) => {
  const res = await axios.get(`http://localhost:8000/api/goals/${id}`);
  return res.data;
};

// 目標登録画面
export const createGoal = (data) => {
  return axios.post("http://127.0.0.1:8000/api/goals", data);
};

// 目標更新画面
export const updateGoal = async (id, data) => {
  const res = await axios.put(`http://localhost:8000/api/goals/${id}`, data);
  return res.data;
};

//目標削除画面
export const deleteGoal = async (id) => {
  await axios.delete(`http://localhost:8000/api/goals/${id}`);
};
