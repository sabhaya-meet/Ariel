import axios from "axios";
import { format } from "date-fns";

// export const likedSessionAIAnswerGetApi = (startDate, endDate, teammate_id) => {
//   const token = localStorage.getItem("token");
//   if (!!token) {
//     return axios.get(
//       // `https://api.trymarvin.com/api/v1/users/liked-answers?direction=asc&question__direction=asc`,
//  let url =
//  `
//   https://api.trymarvin.com/api/v1/users/liked-answers?search=&creation_date__gte=${startDate}&creation_date__lte=${endDate}&user_ids=${teammate_id}`,

//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   }
// };

export const likedSessionAIAnswerGetApi = (
  searchQuery,
  startDate,
  endDate,
  teammate_id = undefined,
  tags = undefined,
  contractTpye = undefined
) => {
  const token = localStorage.getItem("token");
  if (!!token) {
    let url = `https://api.trymarvin.com/api/v1/users/liked-answers`;

    return axios.get(url, {
      params: {
        search: searchQuery,
        creation_date__gte: startDate,
        creation_date__lte: endDate,
        user_ids: teammate_id,
        tags: tags,
        contract_type: contractTpye,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export function teamMembersGetApi(setTeamMembers) {
  const token = localStorage.getItem("token");
  if (token) {
    axios
      .get(`https://api.trymarvin.com/api/v1/teams/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTeamMembers(response.data.items);
      });
  }
}

export const removeTagPostApi = async (answer_id, removeTag) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `https://api.trymarvin.com/api/v1/users/answer/${answer_id}/remove-tags`,
      removeTag,
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

export const savedQuestionAnswerUpdateApi = async (
  sessionId,
  question_id,
  answer_id,
  answerUpdatePayload
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.patch(
      `https://api.trymarvin.com/api/v1/sessions/${sessionId}/question/${question_id}/answer/${answer_id}`,
      answerUpdatePayload,
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
