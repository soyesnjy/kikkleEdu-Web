import axios from 'axios';

// Teacher Attend READ
export const handleMypageTeacherAttendGet = async (query) => {
  const { agencyIdx, userIdx, name, pageNum } = query;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/mypage/teacher/attend/read?
${agencyIdx ? `agencyIdx=${agencyIdx}&` : ''}
${userIdx ? `userIdx=${userIdx}&` : ''}
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
    // console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return {
      status: err.response.status,
      message: err.response.data.message,
      data: {},
    };
  }
};
// Agency Reservation READ
export const handleMypageAgencyReservationGet = async (query) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/mypage/agency/reservation/read?${query?.userIdx ? `userIdx=${query?.userIdx}&` : ''}${query?.name ? `name=${query?.name}&` : ''}${query?.pageNum ? `pageNum=${query?.pageNum}&` : ''}`,
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
      data: {},
    };
  }
};
// TODO# CREATE
export const handleMypageCreate = async (post) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/signup/create`,
      post,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
        withCredentials: true,
      }
    );

    // console.log(res);

    return response;
  } catch (err) {
    console.log(err);
    return {
      message: err.response.data.message,
      status: err.response.status,
    };
  }
};
// Teacher Attend UPDATE
export const handleMypageUpdate = async (post) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/mypage/teacher/attend/update`,
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
    console.error(err);
    return {
      message: err.response.data.message,
      status: err.response.status,
    };
  }
};
// TODO# DELETE
export const handleMypageDelete = async (query) => {
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
