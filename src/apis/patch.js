import axios from "axios";

export const userProfileImage = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.patch(
      `https://api.trymarvin.com/api/v1/users/images/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("There was an error adding the team member!", error);
  }
};
