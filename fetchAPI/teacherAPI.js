import axios from 'axios';

// READ
// 2024.08.22: 쿼리 삽입 기능 추가
export const handleTeacherGet = async (query) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/teacher?${query?.classIdx ? `classIdx=${query?.classIdx}&` : ''}${query?.dayofweek ? `dayofweek=${query?.dayofweek}&` : ''}${query?.partTime ? `partTime=${query?.partTime}&` : ''}${query?.classTag ? `classTag=${query?.classTag}&` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};
// TODO# CREATE
export const handleTeacherCreate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/teacher`,
      { ReviewData: input },
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
    console.log('ReviewCreate API 호출 실패');
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};
// TODO# DELETE
export const handleTeacherDelete = async (uri) => {
  try {
    const response = await axios.delete(`${uri}`, {
      headers: {
        'Content-Type': 'application/json',
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
// TODO# UPDATE
export const handleTeacherUpdate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/teacher/update`,
      { ReviewData: input },
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
