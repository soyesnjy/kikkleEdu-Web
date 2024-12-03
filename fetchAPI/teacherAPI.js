import axios from 'axios';

// READ
// 2024.08.22: 쿼리 삽입 기능 추가
// 2024.12.03: 구조 분해 할당 로직으로 변경
export const handleTeacherGet = async (query) => {
  const {
    main,
    classType,
    teacherIdx,
    classIdx,
    dayofweek,
    partTime,
    classTag,
  } = query;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/teacher/read?
${main ? `main=${main}&` : ''}
${classType ? `classType=${classType}&` : ''}
${teacherIdx ? `teacherIdx=${teacherIdx}&` : ''}
${classIdx ? `classIdx=${classIdx}&` : ''}
${dayofweek ? `dayofweek=${dayofweek}&` : ''}
${partTime ? `partTime=${partTime}&` : ''}
${classTag ? `classTag=${classTag}&` : ''}`,
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
      message: err.response.data.message,
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
// TODO# DELETE
export const handleTeacherDelete = async (uri) => {
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
// TODO# UPDATE
export const handleTeacherUpdate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/teacher/update`,
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
