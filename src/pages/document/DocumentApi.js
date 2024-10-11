import axios from "axios";

export const postUploadPdf = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(
      `https://api.trymarvin.com/api/v1/documents/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // console.error("There was an error adding the team member!", error);
  }
};

export const documentGetApi = (page, size) => {
  const token = localStorage.getItem("token");

  if (!!token) {
    return axios.get(
      `https://api.trymarvin.com/api/v1/documents/?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};

export const deleteUploadedPdf = async (documentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.delete(
      `https://api.trymarvin.com/api/v1/documents/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("There was an error deleting the question", error);
    throw error;
  }
};

export const addTagsPostApi = async (answerId, tags) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(
      `https://api.trymarvin.com/api/v1/users/answer/${answerId}/add-tags`,
      tags,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // console.error("There was an error adding the team member!", error);
  }
};

export const getSessionTag = () => {
  const token = localStorage.getItem("token");

  if (!!token) {
    return axios.get(`https://api.trymarvin.com/api/v1/users/session-tags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};
