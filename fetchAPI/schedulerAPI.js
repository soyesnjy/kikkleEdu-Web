import axios from 'axios';

// #TODO: READ
export const handleScheduleGet = async (query) => {
  const { monthQuery, searchQuery } = query;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/scheduler/read?${monthQuery ? `monthQuery=${monthQuery}&` : ''}${searchQuery ? `searchQuery=${searchQuery}&` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return {
      status: response.status,
      data: response.data.data,
    };
  } catch (err) {
    console.error(err);
    return {
      status: err.response.status,
      data: [],
    };
  }
};
// #TODO: CREATE
export const handleScheduleCreate = async (input) => {
  // console.log(input);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/board/create`,
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
      status: err.response.status,
      message: err.response.data.message,
    };
  }
};
// #TODO: DELETE
export const handleScheduleDelete = async (query) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/board/delete?${query?.boardIdx ? `boardIdx=${query?.boardIdx}&` : ''}`,
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
    };
  }
};
// #TODO: UPDATE
export const handleScheduleUpdate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/board/update`,
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
    console.log('Gpt API 호출 실패');
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};

// 공휴일 READ
export const handleScheduleHolidayGet = async (today) => {
  try {
    const response = await axios.get(
      `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${process.env.NEXT_PUBLIC_SERVICE_KEY}&solYear=${today.getFullYear()}&numOfRows=30`
    );

    // console.log(response);
    const data = response.data.response.body.items.item || [];
    const holidayList = Array.isArray(data) ? data : [data]; // 데이터가 배열인지 확인
    const formattedHolidays = holidayList.map((holiday) => ({
      date: holiday.locdate
        .toString()
        .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'), // YYYYMMDD → YYYY-MM-DD
      name: holiday.dateName,
    }));

    return formattedHolidays;
  } catch (err) {
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};
