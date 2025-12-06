import axios from "axios";

export const createGoal = (data) => {
  return axios.post("http://localhost/api/goals", data);
};
