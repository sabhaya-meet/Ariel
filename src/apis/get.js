import axios from "axios";

export const userDetailsGetApi = (dispatch) => {
  const token = localStorage.getItem("token");
  if (!!token) {
    axios.get("https://api.trymarvin.com/api/v1/users/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};
