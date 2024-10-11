import axios from "axios";

export const deleteTeamMember = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.delete(
      `https://api.trymarvin.com/api/v1/teams/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("There was an error deleting the team member!", error);
    throw error;
  }
};

export const addTeamMember = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `https://api.trymarvin.com/api/v1/teams/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("There was an error adding the team member!", error);
  }
};
