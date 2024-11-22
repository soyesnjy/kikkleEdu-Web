import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // dateClick 사용을 위한 플러그인

// import { useRecoilState } from 'recoil';
// import { mobile } from '@/store/state';

// import { koreanLocale } from '@fullcalendar/core/locales/ko'; // 추가된 한국어 로케일

// const events = [{ title: 'Meeting', start: new Date() }];

// const renderEventContent = (eventInfo) => (
//   <>
//     <b>{eventInfo.timeText}</b>
//     <i>{eventInfo.event.title}</i>
//   </>
// );

// const renderDayCell = (arg) => {
//   return arg.date.getDate(); // 날짜만 표시하도록 설정
// };

const AdminCalendar = ({ dateArr }) => {
  const [tmpDateArr, setTmpDateArr] = useState([]);
  // const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  // 렌더링 시 date 갱신
  useEffect(() => {
    // console.log(dateArr);
    setTmpDateArr([...dateArr]);
  }, []);

  const renderDayCell = (arg) => {
    const dateObj = new Date(arg.date);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    const tmpDate = `${year}-${month}-${day}`;

    const isHighlighted = tmpDateArr.includes(tmpDate);
    // console.log(arg.date);
    return (
      <div
        className={`fc-daygrid-day-frame ${
          isHighlighted ? 'highlighted-date-range' : ''
        }`}
      >
        {arg.date.getDate()}
      </div>
    );
  };

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        // dateClick={handleDateClick}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        locale="ko"
        dayCellContent={renderDayCell}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  z-index: 0;

  .fc {
    width: 50vw;
    height: 60vh;
    direction: ltr;
    text-align: center;
    margin: auto;
    font-family: AppleSDGothicNeoB00;
  }

  .fc-toolbar {
    width: fit-content;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .fc-toolbar-title {
    color: black;
    background: none;
    border-radius: 40px;
    padding: 10px 1rem;
    font-size: 1rem;
    font-family: AppleSDGothicNeoB00;
  }

  .fc-prev-button,
  .fc-next-button {
    background-color: transparent;
    border: none;
    color: #bdbdbd;
    font-size: 20px;
    cursor: pointer;
    padding: 0.2rem;
  }

  .fc-daygrid-day,
  .fc-scrollgrid-sync-inner,
  .fc-scrollgrid,
  .fc-scrollgrid-section,
  .fc-scrollgrid-section table,
  .fc-scrollgrid-liquid,
  .fc-daygrid-body-unbalanced .fc-scrollgrid-sync-table,
  .fc-scrollgrid-sync-table td,
  .fc-scrollgrid-sync-table th,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: none;
  }

  .fc-col-header-cell {
    font-size: 1rem;
    color: #888888;
    font-weight: 700;
    font-family: Pretendard;
  }

  .fc-daygrid-day {
    background: none;
    padding: 6px;
  }

  .fc-daygrid-day-events {
    display: none;
  }

  .fc-daygrid-day-frame {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: auto;
  }

  .fc-daygrid-day.fc-day-today {
    background-color: white;
  }

  .fc-daygrid-day-number {
    width: 100px;
    height: 100px;

    color: #888888;
    font-family: Pretendard;
    font-weight: 700;
    font-size: 1.4rem;
  }

  .fc-daygrid-day-frame .highlighted-date-range {
    /* width: 100%; */
    background: linear-gradient(90deg, #4b95a2, #50a58e);
    border-radius: 10px;
    color: white;
  }

  @media (max-width: 1440px) {
    padding: 0;

    .fc {
      width: 60vw;
      height: 60vh;
    }

    .fc-toolbar-title {
      padding: 10px 4rem;
      margin: 0;
      font-size: 1rem;
      font-family: AppleSDGothicNeoB00;
    }

    .fc-col-header-cell {
      font-size: 1rem;
      color: #888888;
    }

    .fc-daygrid-day-number {
      width: 80px;
      height: 80px;

      font-size: 1rem;
      font-family: AppleSDGothicNeoB00;
      font-weight: 600;
    }
  }

  @media (max-width: 768px) {
    padding: 0;

    .fc {
      width: 80vw;
      height: 26rem;
    }

    .fc-toolbar-title {
      padding: 10px 4rem;
      margin: 0;
      font-size: 1rem;
      font-family: AppleSDGothicNeoB00;
    }

    .fc-col-header-cell {
      font-size: 1rem;
      color: #888888;
    }

    .fc-daygrid-day-number {
      width: 50px;
      height: 50px;

      font-size: 1rem;
      font-family: AppleSDGothicNeoB00;
      font-weight: 600;
    }
  }
`;

export default AdminCalendar;
