import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // dateClick 사용을 위한 플러그인
// import { koreanLocale } from '@fullcalendar/core/locales/ko'; // 추가된 한국어 로케일
import styled from 'styled-components';

const events = [{ title: 'Meeting', start: new Date() }];

const renderEventContent = (eventInfo) => (
  <>
    <b>{eventInfo.timeText}</b>
    <i>{eventInfo.event.title}</i>
  </>
);
const renderDayCell = (arg) => {
  return arg.date.getDate(); // 날짜만 표시하도록 설정
};

const Calendar = ({ setIsOpen, setDate }) => {
  const handleDateClick = (arg) => {
    // 오늘보다 이전 날짜일 경우에만 모달 오픈
    if (new Date(arg.dateStr) < new Date()) {
      setDate(arg.dateStr);
      setIsOpen(true);
    }
    // else alert('미래는 볼 수 없어');
  };

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // interactionPlugin 추가
        initialView="dayGridMonth"
        weekends={true}
        // events={events}
        eventContent={renderEventContent}
        dateClick={handleDateClick} // 클릭 시 발생하는 이벤트
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }} // Toolbar 구성
        locale="ko" // 로케일 설정
        // dayHeaderFormat={{ weekday: 'short' }}
        dayCellContent={renderDayCell} // 날짜 헤더 형식 설정
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  background-color: #f8f8f8;
  padding: 1rem 2rem;
  z-index: 0;

  .fc {
    width: 90vw;
    height: 810px;
    direction: ltr;
    text-align: center;
    margin: auto;
    font-family: AppleSDGothicNeoB00;
  }

  .fc-toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  // 타이틀 관련 - 2024년 N월
  .fc-toolbar-title {
    color: white; /* Purple color */
    background-color: #9051ff;
    border-radius: 40px;
    padding: 10px 9rem;
    margin: 0 5rem;

    font-size: 24px;
    font-family: AppleSDGothicNeoB00;
  }

  // 달력 넘기기 버튼
  .fc-prev-button,
  .fc-next-button {
    background-color: transparent;
    border: none;
    color: #bdbdbd; /* Light gray color */
    font-size: 20px;
    cursor: pointer;
  }

  // 모든 테두리 제거
  .fc-daygrid-day,
  .fc-col-header-cell,
  .fc-scrollgrid-sync-inner,
  .fc-scrollgrid,
  .fc-scrollgrid-section,
  .fc-scrollgrid-section table,
  .fc-scrollgrid-liquid,
  .fc-daygrid-body-unbalanced .fc-scrollgrid-sync-table, /* Unbalanced rows */
  .fc-scrollgrid-sync-table td, /* Cells within the table */
  .fc-scrollgrid-sync-table th {
    border: none;
  }

  // 요일
  .fc-daygrid-day {
    background-color: #f8f8f8;
    padding: 6px; // 내부 간격
  }

  // 요일 영역
  .fc-col-header-cell {
    /* background-color: #f8f8f8; */
    font-size: 2rem;
  }

  // 이벤트 영역
  .fc-daygrid-day-events {
    display: none;
  }

  // 날짜 영역
  .fc-day {
  }

  // 날짜 내부 영역
  .fc-daygrid-day-frame {
    background-color: #eae9f2;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }

  // 오늘 날짜 프레임 강조
  .fc-day-today {
    .fc-daygrid-day-frame {
      background-color: #9051ff;
    }

    .fc-daygrid-day-number {
      color: #fff;
    }
  }

  .fc-daygrid-day.fc-day-today {
    background-color: #f8f8f8; //Highlighted day
  }

  .fc-daygrid-day-frame:hover {
    background-color: #e1bee7;
  }

  .fc-daygrid-day-number {
    color: #888888; /* Dark gray text color */
    font-family: AppleSDGothicNeoB00;
    font-size: 2rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .fc {
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
      font-size: 1rem;
      font-family: AppleSDGothicNeoB00;
      font-weight: 600;
    }

    .fc-daygrid-day-frame {
      padding: 5px;
    }
  }
`;

export default Calendar;
