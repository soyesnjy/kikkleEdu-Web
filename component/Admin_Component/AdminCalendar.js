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
    width: 35vw;

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

    /* border: 1px solid black; */
  }

  .fc-toolbar-title {
    color: black;
    background: none;
    border-radius: 40px;
    padding: 10px 1rem;
    font-size: 1rem;
    font-family: AppleSDGothicNeoB00;

    /* border: 1px solid black; */
  }

  .fc-prev-button,
  .fc-next-button {
    background-color: transparent;
    border: none;
    color: #bdbdbd;
    font-size: 20px;
    cursor: pointer;

    padding: 0.2rem;

    /* border: 1px solid black; */
  }

  .fc-daygrid-day,
  .fc-col-header-cell,
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

  .fc-daygrid-day {
    background: none;
    padding: 6px;
  }

  .fc-col-header {
    display: none;
  }

  /* .fc-col-header-cell {
    background: none;
    font-size: 2rem;
  } */

  .fc-daygrid-day-events {
    display: none;
  }

  .fc-day {
  }

  .fc-daygrid-day-frame {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    /* cursor: pointer; */
    cursor: auto;
  }

  /* .fc-day-today .fc-daygrid-day-frame {
    background-color: #9051ff;
    color: #fff;
  } */

  .fc-daygrid-day.fc-day-today {
    background-color: white;
  }

  /* .fc-daygrid-day-frame:hover {
    background-color: #e1bee7;
  } */

  .fc-daygrid-day-number {
    width: 100px;
    height: 100px;
    color: #888888;
    font-family: Pretendard;
    font-weight: 700;
    font-size: 1.4rem;
  }

  .fc-daygrid-day-number:hover {
    /* color: #56ccf2; */
  }

  /* 날짜 범위 강조 스타일 */
  .fc-daygrid-day-frame .highlighted-date-range {
    width: 100%;
    background: linear-gradient(90deg, #4b95a2, #50a58e);
    border-radius: 10px;
    color: white;
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
      background-color: #f8f8f8;
      font-size: 1rem;
    }

    .fc-daygrid-day-number {
      width: 50px;
      height: 50px;

      font-size: 1rem;
      font-family: AppleSDGothicNeoB00;
      font-weight: 600;
    }

    .fc-daygrid-day-frame {
    }

    .fc-daygrid-day-frame .highlighted-date-range {
    }
  }
`;

export default AdminCalendar;
