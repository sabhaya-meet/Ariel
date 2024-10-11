// Data.js
export const columns = [
  { name: "Title", uid: "title" },
  { name: "Start Date", uid: "start_ts" },
  { name: "Lead Writer", uid: "leadWriter" },
  { name: "Pending", uid: "pending_question" },
  { name: "In Progress", uid: "active_question" },
  { name: "Completed", uid: "completed_question" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

import axios from "axios";

export const getsessionsApi = (page, size) => {
  const token = localStorage.getItem("token");

  if (!!token) {
    return axios.get(
      `https://api.trymarvin.com/api/v1/sessions/?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};

export const users = [
  {
    id: 1,
    title: "Example Title",
    startdate: "Jun 26, 2024",
    leadWriter: "meet sabhaya",
    email: "sabhayameet76980@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    pending: 0,
    inprogress: 0,
    completed: 0,
    status: "pending",
  },
  // Add more users as needed
];

export const createRfpSession = async (data, getSession) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `https://api.trymarvin.com/api/v1/sessions/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return getSession();
  } catch (error) {
    console.log("There was an error adding the team member!", error);
    throw new Error(error);
  }
};

export const deleteSessionApi = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.delete(
      `https://api.trymarvin.com/api/v1/sessions/${id}`,
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

export const updateSessionApi = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      return await axios
        .put(`https://api.trymarvin.com/api/v1/sessions/${id}`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } catch (error) {
    alert("one of the field is empty");
    throw error;
  }
};

export const getsessionById = (id) => {
  const token = localStorage.getItem("token");

  if (!!token) {
    return axios.get(`https://api.trymarvin.com/api/v1/sessions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export const updateRfpDetails = async (id, updateData) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      return await axios
        .put(
          `https://api.trymarvin.com/api/v1/sessions/${id}`,
          updateData,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .catch((error) => {
          console.log(error);
        });
    }
  } catch (error) {
    alert("one of the field is empty");
    throw error;
  }
};

export const sessionPDF = async (id, formData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.patch(
      `https://api.trymarvin.com/api/v1/sessions/${id}`,
      formData,
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

export const getParticipants = (id) => {
  const token = localStorage.getItem("token");

  if (!!token) {
    return axios.get(
      `https://api.trymarvin.com/api/v1/sessions/${id}/participants`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};

export const inviteSessionParticipant = async (payLoadData, id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `https://api.trymarvin.com/api/v1/sessions/${id}/invite/`,
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

export const deleteSessionParticipant = async (sessionId, participantId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.delete(
      `https://api.trymarvin.com/api/v1/sessions/${sessionId}/participants/${participantId}`,
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

export const createSessionAiQuestion = async (payLoadData, id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `https://api.trymarvin.com/api/v1/sessions/${id}/question/gen-answer/`,
      payLoadData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("There was an error adding the team member!", error);
  }
};

export const deleteQuestionApi = async (sessionId, question_id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.delete(
      `https://api.trymarvin.com/api/v1/sessions/${sessionId}/question/${question_id}`,
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

export const AiQuestionUpdateApi = async (
  sessionId,
  question_id,
  updateQuestion
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.patch(
      `https://api.trymarvin.com/api/v1/sessions/${sessionId}/question/${question_id}
`,
      updateQuestion,
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

export const AiQuestionAnswerUpdateApi = async (
  sessionId,
  question_id,
  answer_id,
  updateQuestionAnswer
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.patch(
      `https://api.trymarvin.com/api/v1/sessions/${sessionId}/question/${question_id}/answer/${answer_id}`,
      updateQuestionAnswer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("There was an error adding the team member!", error);
    throw error;
  }
};

export const createQuestionAnswerApi = async (
  sessionId,
  question_id,
  payLoadData
) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `https://api.trymarvin.com/api/v1/sessions/${sessionId}/question/${question_id}/answer/`,
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

export const getSessionConversations = (sessionId, question_id) => {
  const token = localStorage.getItem("token");

  if (!!token) {
    return axios.get(
      `https://api.trymarvin.com/api/v1/sessions/${sessionId}/questions/${question_id}/conversation/
`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};

export const postSessionConversations = async (
  sessionId,
  question_id,
  payloadData
) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `https://api.trymarvin.com/api/v1/sessions/${sessionId}/questions/${question_id}/conversation/`,
      payloadData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("There was an error adding the team member!", error);
  }
};

export const QuestionLikedPatchApi = async (
  answer_id,
  likedQuestionPayload
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.patch(
      `https://api.trymarvin.com/api/v1/users/liked-answers/${answer_id}
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

export const createSessionQuestion = async (sessionId, payLoadData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `https://api.trymarvin.com/api/v1/sessions/${sessionId}/question`,
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

export const inviteQuestionParticipant = async (
  sesstionId,
  questionId,
  payLoadData
) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `https://api.trymarvin.com/api/v1/sessions/${sesstionId}/question/${questionId}/invite/`,
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

export const participantDeleteApi = async (
  sessionId,
  question_id,
  participantId
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.delete(
      `https://api.trymarvin.com/api/v1/sessions/${sessionId}/question/${question_id}/participants/${participantId}`,
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

export const getCitationApi = (answer_id) => {
  const token = localStorage.getItem("token");

  if (!!token) {
    return axios.get(
      `https://api.trymarvin.com/api/v1/sessions/answer/${answer_id}/citation
`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};

export const citation_is_flagged = async (
  is_flagged_id,
  likedQuestionPayload
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.patch(
      `https://api.trymarvin.com/api/v1/sessions/citation/${is_flagged_id}/
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

export const getUserActivity = (sessionId, question_id) => {
  const token = localStorage.getItem("token");

  if (!!token) {
    return axios.get(
      `https://api.trymarvin.com/api/v1/sessions/${sessionId}/question/${question_id}/activities
`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};
