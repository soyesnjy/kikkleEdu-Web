import axios from 'axios';

// PT 결과 분석 API 호출 함수
export const handlePtAnalsys = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/openAI/analysis_pt`,
      { PTDataSend: input },
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
    console.log('PT 결과 분석 API 호출 실패');
    console.error(err);
    return {
      message: '해당 서비스는 로그인 후 사용 가능합니다!',
      emotion: 0,
    };
  }
};

// EBT 결과 분석 API 호출 함수
export const handleEbtAnalsys = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/openAI/analysis`,
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
    console.log('EBT 결과 분석 API 호출 실패');
    console.error(err);

    return {
      message: '해당 서비스는 로그인 후 사용 가능합니다!',
      emotion: 0,
    };
  }
};
