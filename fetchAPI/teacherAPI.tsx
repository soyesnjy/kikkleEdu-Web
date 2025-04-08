import axios from 'axios';

// Teacher Data Type
type TeacherDataType = {
  kk_teacher_idx: number;
  kk_teacher_name: string;
  kk_teacher_introduction: string;
  kk_teacher_profileImg_path: string;
  kk_teacher_education: string;
  kk_teacher_history: string;
  kk_teacher_location: string;
  kk_teacher_dayofweek: string;
  kk_teacher_class_titles: string;
  kk_teacher_phoneNum?: string;
  kk_teacher_class_idxs?: string;
  kk_teacher_time?: string;
};

// handleSignupCreate API 반환 데이터 타입 지정
type TeacherGetResponseDataType = {
  message?: string;
  status: number;
  data: {
    message: string;
    data: TeacherDataType[];
  };
};

// READ
export const handleTeacherGet = async (
  query
): Promise<TeacherGetResponseDataType> => {
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
      data: {
        message: err.response.data.message,
        data: [],
      },
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
