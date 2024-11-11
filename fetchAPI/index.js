import axios from 'axios';

export const loginAPI = async (post) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/login/kk`,
      post,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    // console.log(res);

    return response;
  } catch (err) {
    // 에러시 false 반환
    console.log(err);
    return {
      message: err.response.data.message,
      status: err.response.status,
    };
  }
};

export const logoutAPI = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/login/kk/logout`,
      null,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    // 에러시 false 반환
    console.log(err);
    return false;
  }
};

export const loginAPI_OAuth_URL = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/login/oauth_url`,
      null,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    // 에러시 false 반환
    console.log(err);
    return false;
  }

  // try {
  //   const res = await fetch(`${url}/login/oauth_url`, {
  //     method: 'POST',
  //     credentials: 'include',
  //     // content-type을 명시하지 않으면 json 파일인지 인식하지 못함
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Authorization: document.cookies.accessToken,
  //     },
  //     body: JSON.stringify(post),
  //   }).then((res) => res.json());
  //   // console.log(res);
  //   return res.data;
  // } catch (err) {
  //   // 에러시 false 반환
  //   console.log(err);
  //   return false;
  // }
};

export const loginAPI_OAuth_URL_Kakao = async () => {
  // console.log(url, post);
  // post는 플랫폼 정보
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/login/oauth_url/kakao`,
      null,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    // 에러시 false 반환
    console.log(err);
    return false;
  }
};

export const loginAPI_OAuth_Approve_Google = async (post) => {
  // console.log(url, post);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/login/oauth_token/google`,
      post,
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
    console.log('UserExpiratio API 호출 실패');
    console.error(err.response);
    return {
      status: err.response.status,
    };
  }

  // try {
  //   const res = await fetch(`${url}`, {
  //     method: 'POST',
  //     credentials: 'include',
  //     // content-type을 명시하지 않으면 json 파일인지 인식하지 못함
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Authorization: document.cookies.accessToken,
  //     },
  //     body: JSON.stringify(post),
  //   });
  //   // console.log(res);
  //   return res;
  // } catch (err) {
  //   // 에러시 false 반환
  //   console.log(err);
  //   return false;
  // }
};

export const loginAPI_OAuth_Approve_Kakao = async (post) => {
  // console.log(url, post);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/login/oauth_token/kakao`,
      post,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    console.log('UserExpiratio API 호출 실패');
    console.error(err);
    return {
      status: err.response.status,
    };
  }
  // try {
  //   const res = await fetch(`${url}`, {
  //     method: 'POST',
  //     credentials: 'include',
  //     // content-type을 명시하지 않으면 json 파일인지 인식하지 못함
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Authorization: document.cookies.accessToken,
  //     },
  //     body: JSON.stringify(post),
  //   });
  //   // console.log(res);
  //   return res;
  // } catch (err) {
  //   // 에러시 false 반환
  //   console.log(err);
  //   return false;
  // }
};
