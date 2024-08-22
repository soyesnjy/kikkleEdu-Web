import React, { useEffect, useState } from 'react';
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
// const renderDayCell = (arg) => {
//   return arg.date.getDate(); // 날짜만 표시하도록 설정
// };

const Calendar = ({ setDate, date }) => {
  const [tmpDateArr, setTmpDateArr] = useState([]);

  // 렌더링 시 date 갱신
  useEffect(() => {
    setTmpDateArr([...date]);
  }, []);

  const handleDateClick = (arg) => {
    const dateObj = new Date(arg.dateStr);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    const tmpDate = `${year}-${month}-${day}`;

    if (date.includes(arg.dateStr)) {
      setDate([...date.filter((el) => el !== arg.dateStr)]);
      setTmpDateArr([...tmpDateArr.filter((el) => el !== tmpDate)]);
    } else {
      setDate([...date, arg.dateStr]);
      setTmpDateArr([...tmpDateArr, tmpDate]);
    }
  };

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
        dateClick={handleDateClick}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        locale="ko"
        dayCellContent={renderDayCell}
      />
      {/* <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // interactionPlugin 추가
        initialView="dayGridMonth"  
        weekends={true}
        // events={events}
        // eventContent={renderEventContent}
        dateClick={handleDateClick} // 클릭 시 발생하는 이벤트
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }} // Toolbar 구성
        locale="ko" // 로케일 설정
        // dayHeaderFormat={{ weekday: 'short' }}
        dayCellContent={renderDayCell} // 날짜 헤더 형식 설정
      /> */}
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
  .fc-scrollgrid-sync-table th {
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
    width: 100px;
    height: 100px;
    color: #888888;
    font-family: Pretendard;
    font-weight: 700;
    font-size: 1.4rem;
  }

  .fc-daygrid-day-number:hover {
    color: #56ccf2;
  }

  /* 날짜 범위 강조 스타일 */
  .fc-daygrid-day-frame .highlighted-date-range {
    width: 100%;
    background: linear-gradient(90deg, #4b95a2, #50a58e);
    border-radius: 10px;
    color: white;
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

// const CalendarContainer = styled.div`
//   background-color: #f8f8f8;
//   padding: 1rem 2rem;
//   z-index: 0;

//   .fc {
//     width: 70vw;
//     height: 810px;
//     direction: ltr;
//     text-align: center;
//     margin: auto;
//     font-family: AppleSDGothicNeoB00;
//   }

//   .fc-toolbar {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin-bottom: 20px;
//   }

//   // 타이틀 관련 - 2024년 N월
//   .fc-toolbar-title {
//     color: black; /* Purple color */
//     background: none;
//     border-radius: 40px;
//     padding: 10px 9rem;
//     margin: 0 5rem;

//     font-size: 1rem;
//     font-family: AppleSDGothicNeoB00;
//   }

//   // 달력 넘기기 버튼
//   .fc-prev-button,
//   .fc-next-button {
//     background-color: transparent;
//     border: none;
//     color: #bdbdbd; /* Light gray color */
//     font-size: 20px;
//     cursor: pointer;
//   }

//   // 모든 테두리 제거
//   .fc-daygrid-day,
//   .fc-col-header-cell,
//   .fc-scrollgrid-sync-inner,
//   .fc-scrollgrid,
//   .fc-scrollgrid-section,
//   .fc-scrollgrid-section table,
//   .fc-scrollgrid-liquid,
//   .fc-daygrid-body-unbalanced .fc-scrollgrid-sync-table, /* Unbalanced rows */
//   .fc-scrollgrid-sync-table td, /* Cells within the table */
//   .fc-scrollgrid-sync-table th {
//     border: none;
//   }

//   // 요일
//   .fc-daygrid-day {
//     background: none;
//     padding: 6px; // 내부 간격
//   }

//   // 요일 영역
//   .fc-col-header-cell {
//     background: none;
//     font-size: 2rem;
//   }

//   // 이벤트 영역
//   .fc-daygrid-day-events {
//     display: none;
//   }

//   // 날짜 영역
//   .fc-day {
//   }

//   // 날짜 내부 영역
//   .fc-daygrid-day-frame {
//     background-color: #eae9f2;
//     border-radius: 10px;

//     display: flex;
//     justify-content: center;
//     align-items: center;

//     cursor: pointer;
//   }

//   // 오늘 날짜 프레임 강조
//   .fc-day-today {
//     .fc-daygrid-day-frame {
//       background-color: #9051ff;
//     }

//     .fc-daygrid-day-number {
//       color: #fff;
//     }
//   }

//   .fc-daygrid-day.fc-day-today {
//     background-color: #f8f8f8; //Highlighted day
//   }

//   .fc-daygrid-day-frame:hover {
//     background-color: #e1bee7;
//   }

//   .fc-daygrid-day-number {
//     color: #888888; /* Dark gray text color */
//     font-family: AppleSDGothicNeoB00;
//     font-size: 2rem;
//     font-weight: 600;
//   }

//   @media (max-width: 768px) {
//     .fc {
//       height: 26rem;
//     }

//     .fc-toolbar-title {
//       padding: 10px 4rem;
//       margin: 0;
//       font-size: 1rem;
//       font-family: AppleSDGothicNeoB00;
//     }

//     .fc-col-header-cell {
//       background-color: #f8f8f8;
//       font-size: 1rem;
//     }

//     .fc-daygrid-day-number {
//       font-size: 1rem;
//       font-family: AppleSDGothicNeoB00;
//       font-weight: 600;
//     }

//     .fc-daygrid-day-frame {
//       padding: 5px;
//     }
//   }
// `;

export default Calendar;
