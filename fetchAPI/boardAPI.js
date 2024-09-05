import axios from 'axios';

// TODO# READ
export const handleBoardGet = async (query) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/board/read?${query?.boardIdx ? `boardIdx=${query?.boardIdx}&` : ''}${query?.pageNum ? `pageNum=${query?.pageNum}&` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};
// TODO# CREATE
export const handleBoardCreate = async (input) => {
  console.log(input);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/board/create`,
      { data: input },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.log('ReservationCreate API 호출 실패');
    console.error(err);
    return {
      status: err.response.status,
      message: err.response.data.message,
    };
  }
};
// TODO# DELETE
export const handleBoardDelete = async (query) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/board/delete?${query?.reservationIdx ? `reservationIdx=${query?.reservationIdx}&` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    // console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};
// TODO# UPDATE
export const handleBoardUpdate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/board/update`,
      input,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.log('Gpt API 호출 실패');
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};
