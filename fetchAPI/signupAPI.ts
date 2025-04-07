import axios from 'axios';

// handleSignupCreate API 반환 데이터 타입 지정
type SignupGetResponseDataType = {
  message?: string;
  status: number;
  data?: {
    data: {
      kk_teacher_approve_status: number;
      kk_teacher_created_at: string;
      kk_teacher_dayofweek: string;
      kk_teacher_education: string;
      kk_teacher_file_path: string;
      kk_teacher_history: string;
      kk_teacher_idx: number;
      kk_teacher_introduction: string;
      kk_teacher_location: string;
      kk_teacher_name: string;
      kk_teacher_phoneNum: string;
      kk_teacher_profileImg_path: string;
      kk_teacher_pwd: string;
      kk_teacher_time: string;
      kk_teacher_uid: string;
      kk_teacher_updated_at: string;
    }[];
    lastPageNum: number;
    limit: number;
    page: string;
  };
};

// READ
export const handleSignupGet = async (
  query
): Promise<SignupGetResponseDataType> => {
  const { userClass, name, pageNum } = query;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/signup/read?
${userClass ? `userClass=${userClass}&` : ''}
${name ? `name=${name}&` : ''}
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
      message: err.response.data.message,
      status: err.response.status,
      data: {
        data: [],
        lastPageNum: -1,
        limit: -1,
        page: '-1',
      },
    };
  }
};

// handleSignupCreate API 요청 데이터 타입 지정
type SignupCreateRequestDataType = {
  SignUpData: {
    // 공통
    pUid: string;
    userClass: string;
    passWord: string;
    name: string;
    phoneNumber: string;
    // 강사
    possLocal?: string;
    possClass?: number[];
    possDay?: string[];
    possTime?: string[];
    introduce?: string;
    career?: string;
    education?: string;
    fileData?: {
      fileName: string;
      fileType: string;
      baseData: string | ArrayBuffer;
    };
    // 기관
    address?: string;
    typeA?: string;
  };
};

// handleSignupCreate API 반환 데이터 타입 지정
type SignupCreateResponseDataType = {
  message?: string;
  status: number;
  data?: {
    message: string;
  };
};

// CREATE
export const handleSignupCreate = async (
  post: SignupCreateRequestDataType
): Promise<SignupCreateResponseDataType> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/signup/create`,
      post,
      {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
        withCredentials: true,
      }
    );

    // console.log(res);

    return response;
  } catch (err) {
    console.log(err);
    return {
      status: err.response.status,
      data: {
        message: err.response.data.message,
      },
    };
  }
  // // console.log(url, post);
  // try {
  //   const res = await fetch(`${url}/signup/ai`, {
  //     method: 'POST',
  //     // content-type을 명시하지 않으면 json 파일인지 인식하지 못함
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Authorization: document.cookies.accessToken,
  //     },
  //     body: JSON.stringify(post),
  //   });

  //   // console.log(res);

  //   return res.ok;
  // } catch (err) {
  //   // 에러시 false 반환
  //   console.log(err);
  //   return false;
  // }
};
// UPDATE
export const handleSignupUpdate = async (post) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/signup/update`,
      post,
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
    console.log('API 호출 실패');
    console.error(err);
    return {
      message: err.response.data.message,
      status: err.response.status,
    };
  }
};
// DELETE
export const handleSignupDelete = async (query) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/signup/delete?${query?.userClass ? `userClass=${query?.userClass}&` : ''}${query?.userIdx ? `userIdx=${query?.userIdx}&` : ''}`,
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
