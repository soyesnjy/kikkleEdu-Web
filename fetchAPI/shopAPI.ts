import axios from 'axios';

// API 요청 데이터 타입 지정
type PortOnePayCompleateRequestDataType = {
  data: {
    paymentId: string;
  };
};

// API 반환 데이터 타입 지정
type PortOnePayCompleateResponseDataType = {
  data?: {
    status: string;
    message: string;
  };
};

// PortOne Payment Request
export const handlePortOnePayCompleate = async (
  post: PortOnePayCompleateRequestDataType
): Promise<PortOnePayCompleateResponseDataType> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/shop/portone/compleate`,
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
      data: {
        status: err.response.status,
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
