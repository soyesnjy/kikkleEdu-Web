import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // dateClick 사용을 위한 플러그인

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
        initialDate={dateArr[0]} // 초기 표시할 Month 날짜
        initialView="dayGridMonth" // 월별로 보기
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
    width: 500px;
    height: 520px;

    direction: ltr;
    text-align: center;
    font-family: AppleSDGothicNeoB00;
  }

  .fc-toolbar {
    div {
      display: flex; /* 버튼들을 가로 정렬 */
      justify-content: center;
      align-items: center;
      gap: 0.4rem; /* 버튼 간 간격 */
    }
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

  .fc-daygrid-body-unbalanced .fc-scrollgrid-sync-table {
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
  }

  .fc-daygrid-day-events {
    display: none;
  }

  .fc-daygrid-day-frame {
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
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
    width: 70px;
    height: 70px;

    padding: 0;

    color: #888888;
    font-family: Pretendard;
    font-weight: 700;
    font-size: 1.2rem;
  }

  /* 날짜 범위 강조 스타일 */
  .fc-daygrid-day-frame .highlighted-date-range {
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
      width: 60px;
      height: 60px;

      font-size: 1rem;
      font-family: AppleSDGothicNeoB00;
      font-weight: 600;
    }
  }

  @media (max-width: 768px) {
    padding: 0;

    .fc {
      width: 340px;
      height: 400px;
    }

    .fc-toolbar-title {
      padding: 0;
      margin: 0;
      font-size: 1rem;
      font-family: AppleSDGothicNeoB00;

      div {
        display: flex; /* 버튼들을 가로 정렬 */
        justify-content: center;
        align-items: center;
        gap: 0.4rem; /* 버튼 간 간격 */
      }
    }

    .fc-col-header-cell {
      background-color: #f8f8f8;
      font-size: 1rem;
    }

    .fc-daygrid-day-number {
      width: 45px;
      height: 45px;

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
