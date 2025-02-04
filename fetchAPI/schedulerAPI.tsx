import axios from 'axios';

// READ
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
// CREATE
export const handleScheduleCreate = async (input) => {
  // console.log(input);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/scheduler/create`,
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
    console.error(err);
    return {
      status: err.response.status,
      message: err.response.data.message,
      data: [],
    };
  }
};
// Group CREATE
export const handleScheduleGroupCreate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/scheduler/create/group`,
      { data: input },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    console.error(err);
    return {
      status: err.response?.status || 500,
      message: err.response?.data?.message || 'Unknown error',
      data: [],
    };
  }
};
// Drag UPDATE
export const handleScheduleDragUpdate = async (input) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_URL}/scheduler/update/drag`,
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
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};
// Click UPDATE
export const handleScheduleClickUpdate = async (input) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_URL}/scheduler/update/click`,
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
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};
// DELETE
export const handleScheduleDelete = async (query) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/scheduler/delete?${query?.eventId ? `eventId=${query?.eventId}&` : ''}`,
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
// Group DELETE
export const handleScheduleGroupDelete = async (query) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/scheduler/delete/group?${query?.groupIdx ? `groupIdx=${query?.groupIdx}&` : ''}`,
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

// 공휴일 API 반환 Data Type
type HolidayType = {
  dateKind: string;
  dateName: string; // 공휴일명 (ex. 설날, 추석)
  isHoliday: string; // 공휴일 여부 (Y/N)
  locdate: string; // 공휴일 날짜 (YYYYMMDD)
  seq: number; // 공휴일 순번
};
// 공휴일 Formatted Data Type
type FormattedHolidayType = {
  date: string;
  name: string;
};
// 공휴일 READ
export const handleScheduleHolidayGet = async (today: Date) => {
  try {
    const response = await axios.get(
      `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${process.env.NEXT_PUBLIC_SERVICE_KEY}&solYear=${today.getFullYear()}&numOfRows=30`
    );

    const holidayData: HolidayType[] =
      response.data.response.body.items.item || [];

    const formattedHolidays: FormattedHolidayType[] = holidayData.map(
      (holiday: HolidayType) => ({
        date: holiday.locdate
          .toString()
          .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'), // YYYYMMDD → YYYY-MM-DD
        name: holiday.dateName,
      })
    );

    return {
      status: 200,
      data: formattedHolidays,
    };
  } catch (err) {
    console.error(err);
    return {
      status: err.response.status,
      data: [],
    };
  }
};
