import axios from 'axios';

// READ
export const handleBoardGet = async (query) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/board/read?${query?.boardIdx ? `boardIdx=${query?.boardIdx}&` : ''}${query?.pageNum ? `pageNum=${query?.pageNum}&` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
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
// CREATE
export const handleBoardCreate = async (input) => {
  // console.log(input);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/board/create`,
      { data: input },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
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
// DELETE
export const handleBoardDelete = async (query) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/board/delete?${query?.boardIdx ? `boardIdx=${query?.boardIdx}&` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
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
// UPDATE
export const handleBoardUpdate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/board/update`,
      { data: input },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
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
