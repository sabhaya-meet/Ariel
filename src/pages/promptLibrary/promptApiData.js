import axios from "axios";

export const promptGetData = () => {
  const token = localStorage.getItem("token");

  if (!!token) {
    return axios.get(`https://api.trymarvin.com/api/v1/libraries/prompts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export const runQuestionPromptPostApi = async (questionId, payLoadData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `
https://api.trymarvin.com/api/v1/users/library/${questionId}/generate
`,
      payLoadData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("There was an error adding the team member!", error);
  }
};

export const responseGetApi = (question_id) => {
  const token = localStorage.getItem("token");

  if (!!token) {
    return axios.get(
      `
https://api.trymarvin.com/api/v1/users/library/${question_id}/responses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};

export const libraryLikeQuestion = async (
  question_id,
  questionAnswerId,
  likedQuestionPayload
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.patch(
      `
https://api.trymarvin.com/api/v1/users/library/${question_id}/responses/${questionAnswerId}
`,
      likedQuestionPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("There was an error adding the team member!", error);
  }
};
