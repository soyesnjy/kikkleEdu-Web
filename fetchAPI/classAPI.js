import axios from 'axios';

// READ
// 2024.08.22: classType 쿼리 추가
// 2024.10.02: classTag 쿼리 추가
export const handleClassGet = async (query) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/class?${query?.classDetail ? `classDetail=${query?.classDetail}&` : ''}${query?.classTag ? `classTag=${query?.classTag}&` : ''}${query?.classType ? `classType=${query?.classType}&` : ''}`,
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
// CREATE
export const handleClassCreate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/review`,
      { ReviewData: input },
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
    console.log('ReviewCreate API 호출 실패');
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};
// DELETE
export const handleClassDelete = async (uri) => {
  try {
    const response = await axios.delete(`${uri}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
      },
      withCredentials: true,
    });
    // console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};
// UPDATE
export const handleClassUpdate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/review/update`,
      { ReviewData: input },
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
