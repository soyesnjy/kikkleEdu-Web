import axios from 'axios';

// KakaoPay Ready
export const handleKakaoPayReady = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/kakaopay/ready`,
      { readyData: input },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    // console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.log('handlePayReady 호출 실패');
    console.error(err);
  }
};

// KakaoPay Approve
export const handleKakaoPayApprove = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/kakaopay/approve`,
      { approveData: input },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    console.log('ReviewCreate API 호출 실패');
    console.error(err);
    return {
      status: 400,
    };
  }
};

// User Expiration period 조회
export const handleUserExpiration = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/kakaopay/expiration`,
      { data: input },
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
      status: 400,
    };
  }
};
