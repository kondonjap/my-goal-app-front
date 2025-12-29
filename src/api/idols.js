import axios from "axios";

const BASE = "http://localhost:8000/api";

export const getVenues = async () => {
  const res = await axios.get(`${BASE}/idol/venues`);
  return res.data;
};

export const createVenue = async (data) => {
  const res = await axios.post(`${BASE}/idol/venues`, data);
  return res.data;
};

export const getMembers = async () => {
  const res = await axios.get(`${BASE}/idol/members`);
  return res.data;
};

export const createMember = async (data) => {
  const res = await axios.post(`${BASE}/idol/members`, data);
  return res.data;
};
