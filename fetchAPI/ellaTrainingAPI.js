import axios from 'axios';

// 엘라 기분관리 훈련 API 호출 함수
export const handleTrainingMoodElla = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/openAI/training_mood_ella`,
      { data: input },
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
    console.log('엘라 기분 훈련 API 호출 실패');
    console.error(err);
    return {
      message: '엘라 기분 훈련 API 호출 실패',
      emotion: 0,
    };
  }
};
// 엘라 기분관리 훈련 데이터 Save API 호출 함수
export const handleTrainingMoodEllaSave = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/openAI/training_mood_ella/save`,
      { data: input },
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
    console.log('엘라 기분 훈련 데이터 저장 API 호출 실패');
    console.error(err);
    return {
      message: '엘라 기분 훈련 데이터 저장 API 호출 실패',
      emotion: 0,
    };
  }
};
// 엘라 기분관리 훈련 데이터 Load API 호출 함수
export const handleTrainingMoodEllaLoad = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/openAI/training_mood_ella/load`,
      { data: input },
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
    console.log('엘라 기분 훈련 데이터 저장 API 호출 실패');
    console.error(err);
    return {
      message: '엘라 기분 훈련 데이터 저장 API 호출 실패',
      emotion: 0,
    };
  }
};
