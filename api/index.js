import axios from "axios";

const BASE_URL = "https://gym-backend-eight.vercel.app/"; 

const apiBackend = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Register member on the backend
const registerMember = async (memberData) => {
  console.log(memberData);
  try {
    const response = await apiBackend.post("/register", memberData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login member on the backend
const loginMember = async (memberData) => {
  try {
    const response = await apiBackend.post("/login", memberData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all members from the backend
const getAllMembers = async () => {
  try {
    const response = await apiBackend.get("/members");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// read member by ID from the backend
const getMemberById = async (memberId) => {
  try {
    const response = await apiBackend.get(`/members/${memberId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update member by ID on the backend
const updateMemberById = async (memberId, newData) => {
  try {
    const response = await apiBackend.put(`/update/${memberId}`, { newData });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete member by ID on the backend
const deleteMemberById = async (memberId) => {
  try {
    const response = await apiBackend.delete(`/delete/${memberId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

module.exports = {
  registerMember,
  loginMember,
  getAllMembers,
  getMemberById,
  updateMemberById,
  deleteMemberById,
};
