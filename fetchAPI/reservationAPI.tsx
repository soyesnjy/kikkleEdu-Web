import axios from 'axios';

// handleSignupCreate API 반환 데이터 타입 지정
type ReservationGetResponseDataType = {
  message?: string;
  status: number;
  data?: {
    data: {
      kk_agency_name: string;
      kk_agency_phoneNum: string;
      kk_class_idx: number;
      kk_class_title: string;
      kk_reservation_approve_status: number;
      kk_reservation_date: string;
      kk_reservation_idx: number;
      kk_reservation_time: string;
      kk_teacher_idx: number;
      teacher_info: string;
      total_count: number;
    }[];
    lastPageNum: number;
    limit: number;
    page: string;
  };
};

// READ
export const handleReservationGet = async (
  query
): Promise<ReservationGetResponseDataType> => {
  const { date, pageNum } = query;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/reservation/read?
${date ? `date=${date}&` : ''}
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
// CREATE
export const handleReservationCreate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/reservation/create`,
      { data: input },
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
    console.log('ReservationCreate API 호출 실패');
    console.error(err);
    return {
      message: err.response.data.message,
      status: err.response.status,
    };
  }
};
// DELETE
export const handleReservationDelete = async (query) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/reservation/delete?${query?.reservationIdx ? `reservationIdx=${query?.reservationIdx}&` : ''}`,
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
// TODO# UPDATE
export const handleReservationUpdate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/reservation/update`,
      input,
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
      message: err.response.data.message,
      status: err.response.status,
    };
  }
};
