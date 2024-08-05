import axios from "axios";

// READ
export const handleReviewGet = async (uri) => {
  try {
    const response = await axios.get(`${uri}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    // console.log(response);
    return response;
  } catch (err) {
    console.log("Gpt API 호출 실패");
    console.error(err);
    return {
      status: err.response.status,
      message: "미안해 지금은 대화가 힘들어...조금 뒤에 다시 말해줄래?",
      emotion: 0,
    };
  }
};
// CREATE
export const handleReviewCreate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/review`,
      { ReviewData: input },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.log("ReviewCreate API 호출 실패");
    console.error(err);
    return {
      status: 400,
    };
  }
};
// DELETE
export const handleReviewDelete = async (uri) => {
  try {
    const response = await axios.delete(`${uri}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    // console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};
// UPDATE
export const handleReviewUpdate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/review/update`,
      { ReviewData: input },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.log("Gpt API 호출 실패");
    console.error(err);
    return {
      status: err.response.status,
      message: "미안해 지금은 대화가 힘들어...조금 뒤에 다시 말해줄래?",
      emotion: 0,
    };
  }
};
