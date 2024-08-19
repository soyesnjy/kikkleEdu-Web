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
    return { status: err.response.status };
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

export const signupAPI = async (url, post) => {
  // console.log(url, post);
  try {
    const res = await fetch(`${url}/signup/ai`, {
      method: 'POST',
      // content-type을 명시하지 않으면 json 파일인지 인식하지 못함
      headers: {
        'Content-Type': 'application/json',
        // Authorization: document.cookies.accessToken,
      },
      body: JSON.stringify(post),
    });

    // console.log(res);

    return res.ok;
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
    console.log(response);
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
    console.log(response);
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

// 감정 분석 API 호출 함수
export const emotionAPI = async (messageArr) => {
  // 감정 분석 API 호출
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/openAI/emotion`,
      {
        method: 'POST',
        headers: {
          accept: 'application.json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageArr }),
      }
    )
      .then((res) => res.json())
      .then((data) => data);
    return result.message + parseInt(Math.random() * 10);
  } catch (err) {
    console.error(err);
    return '부정' + parseInt(Math.random() * 10);
  }
};
// Clova Voice API 호출 함수
export const handleClovaVoice = async (text) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/openAI/tts`,
    {
      speaker: 'nminyoung',
      volume: '0',
      speed: '0',
      pitch: '0',
      text,
      format: 'mp3',
    },
    { responseType: 'arraybuffer' }
  );

  // console.log(response.data);
  const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
  const audioUrl = URL.createObjectURL(audioBlob);
  // const audio = new Audio(audioUrl);
  // console.log(audioUrl);
  return audioUrl;
};
// 아바타 응답 API 호출 함수
export const handleGptCompletion = async (input, path) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}${path}`,
      { EBTData: input },
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
    console.log('Gpt API 호출 실패');
    console.error(err);
    return {
      status: err.response.status,
      message: '미안해 지금은 대화가 힘들어...조금 뒤에 다시 말해줄래?',
      emotion: 0,
    };
  }
};
// ClearCookies API 호출 함수
export const handleClearCookies = async (path) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log('Gpt API 호출 실패');
    console.error(err);
    return {
      message: '미안해 지금은 대화가 힘들어...조금 뒤에 다시 말해줄래?',
      emotion: 0,
    };
  }
};
// ConsultLogSave API 호출 함수
export const handleConsultLogSave = async (input, path) => {
  console.log('ConsultLogSave 호출');
  //console.log(input, path);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}${path}`,
      { EBTData: input },
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
    console.log('Gpt API 호출 실패');
    console.error(err);
    return {
      status: err.response.status,
      message: '미안해 지금은 대화가 힘들어...조금 뒤에 다시 말해줄래?',
      emotion: 0,
    };
  }
};

// 정서행동 검사 (11종) 결과 반환 API 호출 함수
export const handleEbtResult = async (input, path) => {
  console.log('Ebt Result 호출');
  //console.log(input, path);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}${path}`,
      { EBTData: input },
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
    console.log('Gpt API 호출 실패');
    console.error(err);
    return {
      status: err.response.status,
      message: '미안해 지금은 대화가 힘들어...조금 뒤에 다시 말해줄래?',
      emotion: 0,
    };
  }
};

// 캘린더 데이터 반환 API 호출 함수
export const handleCalendarResult = async (input) => {
  console.log('Calendar Result API 호출');
  //console.log(input, path);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/openAI/calendar`,
      { EBTData: input },
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
    console.log('API 호출 실패');
    console.error(err);
  }
};
