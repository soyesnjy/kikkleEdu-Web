import axios from 'axios';

// Teacher Data Type
type BoardDataType = {
  title: string;
  author: string;
  date: string;
  content: string;
  isPrivate?: boolean;
  authorIdx?: number;
};

// handleSignupCreate API 반환 데이터 타입 지정
type BoardGetResponseDataType = {
  message?: string;
  status: number;
  data?: {
    message: string;
    data: BoardDataType[];
    lastPageNum: any;
  };
};

// READ
export const handleBoardGet = async (
  query
): Promise<BoardGetResponseDataType> => {
  const { boardIdx, pageNum } = query;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/board/read?
${boardIdx ? `boardIdx=${boardIdx}&` : ''}
${pageNum ? `pageNum=${pageNum}&` : ''}`,
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
