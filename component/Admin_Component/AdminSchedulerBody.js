/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import Modal from 'react-modal';
import AdminEvents from './AdminEvents';
import AdminTooltip from './AdminTooltip';
import AdminEventAddModal from './AdminEventAddModal';

import {
  handleScheduleGet,
  handleScheduleHolidayGet,
} from '@/fetchAPI/schedulerAPI';

const dayArr = ['일', '월', '화', '수', '목', '금', '토'];
const today = new Date();
const colors = [
  { label: '확정', value: '#BAE0FF' },
  { label: '신규', value: '#F0C9FB' },
  { label: '폐강', value: '#F3F3F3' },
  { label: '교체예정', value: '#FE4A4A' },
  { label: '유치원/초등', value: '#D2FFB4' },
  { label: '타지역', value: '#FFEBBF' },
];
const defaultEvents = [
  {
    id: 1,
    title: 'Math Class',
    start: '2025-01-22T11:00:00',
    end: '2025-01-22T11:50:00',
    backgroundColor: '#BAE0FF',
    extendedProps: {
      teacherName: '김철수', // 신규
      courseName: 'Mathematics',
      participants: 20,
      times: 2,
      courseTimes: 50, // 신규
      notes: '직접 메모가 가능한 메모장으로 기타메모 부분',
    },
  },
  {
    id: 2,
    title: 'English Class',
    start: '2025-01-22T11:10:00',
    end: '2025-01-22T12:00:00',
    backgroundColor: '#F0C9FB',
    extendedProps: {
      teacherName: '고영희', // 신규
      courseName: 'English Literature',
      participants: 15,
      times: 3,
      courseTimes: 50, // 신규
      notes: 'Room 202',
    },
  },
];

// Date Format String 변환 메서드 (HH:MM)
const timeCalulate = (date, all) => {
  const dateObj = new Date(date);

  if (all) {
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    return `${year}.${month}.${day}`;
  }

  const hour = ('0' + dateObj.getHours()).slice(-2);
  const min = ('0' + dateObj.getMinutes()).slice(-2);

  return `${hour}:${min}`;
};

const AdminSchedulerBody = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    teacherName: '', // 신규
    courseName: '',
    participants: 0,
    times: 0,
    courseTimes: 0, // 신규
    notes: '',
    backgroundColor: '',
    date: '',
    recursiveEndDate: '', // 신규
  });
  const [currentDateMonth, setCurrentDateMonth] = useState(
    today.getMonth() + 1
  ); // A 캘린더 currentDate Month
  const [holidays, setHolidays] = useState([]); // 공휴일 데이터 배열 (공공데이터)
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(today); // 미니 달력(B)에서 선택된 날짜
  const [selectedEventId, setSelectedEventId] = useState(-1); // 선택된 eventID
  const [scheduleForm, setScheduleForm] = useState('week'); // 스케줄폼 (week || month)
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: null,
    position: { top: 0, left: 0 },
  }); // 툴팁 상태

  const selectedDateRef = useRef(selectedDate); // 실시간 selectedDate 참조
  const aCalendarRef = useRef(null); // A캘린더의 ref
  const bCalendarRef = useRef(null); // B캘린더의 ref

  // 공휴일 Check 메서드
  const isHoliday = (date) => {
    if (!holidays.length) return false;
    return holidays.some(
      (holiday) => new Date(holiday.date).toDateString() === date.toDateString()
    );
  };
  // selectedDate 업데이트 핸들러 - 미니 달력(B)에서 선택된 날짜 업데이트와 동시에 참조(selectedDateRef) 업데이트
  const updateSelectedDate = (date) => {
    setSelectedDate(date);
    selectedDateRef.current = date; // 상태와 참조 동기화
  };
  // 미니 달력(B) 날짜 클릭 핸들러 - A캘린더와 동기화
  const handleDateClickB = (info) => {
    const newDate = new Date(info.date);
    updateSelectedDate(newDate); // 선택된 날짜 업데이트

    if (aCalendarRef.current) {
      aCalendarRef.current.getApi().gotoDate(newDate); // A캘린더 날짜 이동
    }

    // 툴팁 닫기
    handleResetTooptip();
  };
  // 메인 스케줄러(A) 날짜 변경 핸들러 - B캘린더와 동기화
  const handleDatesSetA = (info) => {
    const startDate = new Date(info.start);
    const endDate = new Date(info.end);
    const selectedMonth = selectedDateRef?.current?.getMonth();

    let newData = startDate;

    // start와 end의 Month가 다를 경우 selectedDate 기준으로 결정
    if (info.view.type === 'dayGridMonth') {
      newData = info.view.currentStart;
    } else if (startDate.getMonth() !== endDate.getMonth()) {
      newData = selectedMonth === startDate.getMonth() ? startDate : endDate;
    }

    if (bCalendarRef.current) {
      bCalendarRef.current.getApi().gotoDate(newData); // B캘린더 날짜 이동
    }
    // A 캘린더 Month 갱신
    if (aCalendarRef?.current?.getApi()?.currentData.currentDate) {
      setCurrentDateMonth(
        aCalendarRef?.current?.getApi()?.currentData.currentDate.getMonth() + 1
      );
    }

    // 툴팁 닫기
    handleResetTooptip();
  };

  // 미니 달력(B) 렌더 메서드
  const renderDayHeaderB = (arg) => {
    const dayStyle = {
      color:
        arg.date.getDay() === 0
          ? 'red'
          : arg.date.getDay() === 6
            ? 'blue'
            : 'black',
    };

    return <div style={dayStyle}>{`${dayArr[arg.date.getDay()]}`}</div>;
  };
  const renderDayCellB = (arg) => {
    const dateObj = new Date(arg.date);

    // 오늘 날짜와 선택된 날짜를 비교
    const isHighlighted =
      selectedDate && dateObj.toDateString() === selectedDate.toDateString();

    // 이전/다음 달 날짜인지 확인
    const isOtherMonth =
      arg.date.getMonth() !== arg.view.currentStart.getMonth();

    return (
      <GridDayMonthContainerB
        className={`fc-daygrid-day-frame ${
          isHighlighted ? 'highlighted-date-range' : ''
        }`}
        isOtherMonth={isOtherMonth}
        color={
          arg.date.getDay() === 0 || isHoliday(arg.date)
            ? 'red'
            : arg.date.getDay() === 6
              ? 'blue'
              : '#7e7e7e'
        }
      >
        {dateObj.getDate()}
      </GridDayMonthContainerB>
    );
  };
  // 메인 스케줄러(A) 렌더 메서드
  const renderDayHeaderA = (arg) => {
    const dayStyle = {
      color:
        arg.date.getDay() === 0 || isHoliday(arg.date)
          ? 'red'
          : arg.date.getDay() === 6
            ? 'blue'
            : 'black',
    };

    return (
      <div style={dayStyle}>
        {`${scheduleForm === 'week' ? arg.date.getDate() : ''} ${dayArr[arg.date.getDay()]}`}
      </div>
    );
  };
  const renderDayCellA = (arg) => {
    const dateObj = new Date(arg.date);

    // 이전/다음 달 날짜인지 확인
    const isOtherMonth =
      arg.date.getMonth() !== arg.view.currentStart.getMonth();

    return (
      <GridDayMonthContainerA
        className={`fc-daygrid-day-frame`}
        isOtherMonth={isOtherMonth}
        color={
          arg.date.getDay() === 0 || isHoliday(arg.date)
            ? 'red'
            : arg.date.getDay() === 6
              ? 'blue'
              : '#7e7e7e'
        }
      >
        {dateObj.getDate()}
      </GridDayMonthContainerA>
    );
  };
  const renderEventCellA = (arg) => {
    return (
      <AdminEvents
        eventId={arg.event.id}
        eventTitle={arg.event.title}
        eventTeacher={arg.event.extendedProps.teacherName}
        eventStart={arg.event.start}
        eventBackColor={arg.event.backgroundColor}
        scheduleForm={scheduleForm}
        selectedEventId={selectedEventId}
        timeCalulate={timeCalulate}
      />
    );
  };

  // 모달 열기 - newEvent date 속성 갱신
  const openModal = (info) => {
    if (scheduleForm === 'month') return;
    handleResetTooptip();
    setNewEvent((prev) => ({ ...prev, date: info.dateStr }));
    setModalOpen(true);
  };
  // 모달 닫기 - newEvent 초기화
  const closeModal = () => {
    setModalOpen(false);
    setNewEvent({
      title: '',
      teacherName: '', // 신규
      courseName: '',
      participants: 0,
      times: 0,
      courseTimes: 0, // 신규
      notes: '',
      backgroundColor: '',
      date: '',
      recursiveEndDate: '', // 신규
    });
  };

  // 툴팁 리셋 핸들러
  const handleResetTooptip = () => {
    setSelectedEventId(-1);
    setTooltip({
      visible: false,
      content: null,
      position: { top: 0, left: 0 },
    });
  };
  // 이벤트 클릭 핸들러 (툴팁 관련 위치 계산)
  const handleEventClick = (info) => {
    const { id, title, start, end, extendedProps, backgroundColor } =
      info.event;

    // 툴팁이 켜진 경우 끄기 (토글)
    if (tooltip.visible && tooltip.content.id === id) {
      handleResetTooptip();
      return;
    }
    // 이벤트 요소의 위치 계산
    const rect = info.el.getBoundingClientRect();
    const tooltipPosition = {
      top: rect.top + window.scrollY, // 중앙 Y
      left: rect.left + window.scrollX + rect.width, // 오른쪽에 표시
    };

    // 이벤트가 마지막 주(금,토요일)인 경우
    if (new Date(start).getDay() === 6 || new Date(start).getDay() === 5) {
      delete tooltipPosition.left; // 왼쪽 위치 제거
      tooltipPosition.left = rect.left + window.scrollX - 300; // 툴팁을 왼쪽으로 표시 (Tooltip Width === 300)
    }
    setSelectedEventId(id);
    setTooltip({
      visible: true,
      content: {
        id,
        title,
        start,
        end,
        eventProps: extendedProps,
        backgroundColor,
      },
      position: tooltipPosition,
    });
  };

  // 이벤트 Insert 핸들러
  const handleAddEvent = async (newEvent) => {
    const startDate = new Date(newEvent.date);
    const endDate = new Date(
      startDate.getTime() + newEvent.courseTimes * 60 * 1000
    );

    const newEventData = {
      id: events.length + 1, // 임시 ID (서버에서 제공 시 업데이트 가능)
      title: newEvent.title,
      start: newEvent.date,
      end: endDate.toISOString(),
      extendedProps: {
        teacherName: newEvent.teacherName,
        courseName: newEvent.courseName,
        participants: newEvent.participants,
        times: newEvent.times,
        courseTimes: newEvent.courseTimes,
        notes: newEvent.notes,
      },
      backgroundColor: newEvent.backgroundColor || '#BAE0FF',
    };

    // 서버로 이벤트 추가가 요청
    // await createStartOnServer(newEventData);

    if (newEvent.recursiveEndDate) {
      const recursiveEndDate = new Date(newEvent.recursiveEndDate);
      const dayOfWeek = startDate.getDay(); // 시작 날짜의 요일

      const recursiveEvents = [];
      // [startDate ~ recursiveEndDate] date === dayOfWeek 비교
      for (
        let date = new Date(startDate);
        date <= recursiveEndDate;
        date.setDate(date.getDate() + 1)
      ) {
        if (date.getDay() === dayOfWeek) {
          const eventEndDate = new Date(
            date.getTime() + newEvent.courseTimes * 60 * 1000
          );

          // #TODO: 서버에서 id 반환받은 뒤 적용하기
          recursiveEvents.push({
            ...newEventData,
            id: events.length + recursiveEvents.length + 1,
            start: date.toISOString(),
            end: eventEndDate.toISOString(),
          });
        }
      }

      // 3) 기존 이벤트 상태에 새로운 반복 이벤트 목록 추가
      setEvents((prevEvents) => [...prevEvents, ...recursiveEvents]);
    } else {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          ...newEventData,
          id: prevEvents.length + 1,
        },
      ]);
    }

    handleResetTooptip();
    closeModal();
  };

  // 이벤트 Drop 핸들러 start 정보만 수정
  const handleEventDrop = (info) => {
    const { event } = info;
    const startDate = new Date(event.start);
    const endDate = new Date(
      startDate.getTime() + event.extendedProps.courseTimes * 60 * 1000
    ); // 50분 후 계산

    // 수정된 start 정보만 반영
    const updatedEvent = {
      id: Number(event.id),
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };

    console.log('updatedEvent: ', updatedEvent);

    // 서버로 업데이트 요청
    // updateStartOnServer(updatedEvent);

    // A 캘린더를 드롭한 Month로 이동
    if (aCalendarRef.current) {
      aCalendarRef.current.getApi().gotoDate(startDate); // A캘린더 날짜 이동
    }

    // 로컬 상태 업데이트 (start만 변경)
    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === Number(updatedEvent.id)
          ? {
              ...evt,
              start: updatedEvent.start,
              end: updatedEvent.end,
            }
          : evt
      )
    );
    handleResetTooptip();
  };
  // 이벤트 Update 핸들러
  const handleEventUpdate = (event) => {
    console.log('Tooltip Update!');

    // 수정된 start 정보만 반영

    console.log('updatedEvent: ', event);

    // 서버로 업데이트 요청
    // updateStartOnServer(updatedEvent);

    // 로컬 상태 업데이트 (start만 변경)
    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === Number(event.id) ? { ...evt, ...event } : evt
      )
    );
    handleResetTooptip();
  };
  // 이벤트 Delete 핸들러
  const deleteEvent = async (eventId) => {
    console.log('Deleting event with ID:', eventId);

    // 서버 삭제 요청
    // await deleteEventFromServer(eventId);

    // 로컬 상태 업데이트
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== Number(eventId))
    );

    handleResetTooptip();
  };
  // 검색 필터
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setEvents((prevEvents) =>
      query
        ? prevEvents.filter((event) =>
            event.extendedProps.courseName?.toLowerCase().includes(query)
          )
        : [...prevEvents]
    );
  };

  // events 로그 출력
  // useEffect(() => {
  //   console.log('currentDateMonth:', currentDateMonth);
  // }, [currentDateMonth]);

  useEffect(() => {
    try {
      // 공휴일 Get (공공 데이터)
      if (!holidays.length) {
        handleScheduleHolidayGet(today).then((formattedHolidays) => {
          setHolidays(formattedHolidays);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Event GET
  useEffect(() => {
    try {
      if (currentDateMonth > 0) {
        // 스케줄 Get Handler 호출
        handleScheduleGet({
          monthQuery: currentDateMonth, // 선택 날짜
          searchQuery,
        }).then((res) => {
          setEvents(res.data);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [searchQuery, currentDateMonth]);

  // Delete 삭제 기능
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedEventId !== -1 && e.key === 'Delete') {
        e.stopPropagation(); // 이벤트 전파 차단
        if (confirm('삭제 하시겠습니까?') === true) {
          deleteEvent(selectedEventId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEventId]);

  return (
    <>
      <Container>
        {/* 미니 달력 */}
        <MiniCalendarWrapper>
          <MiniCalendarTitle>{`강사 스케줄 관리`}</MiniCalendarTitle>
          {/* B 캘린더 */}
          <FullCalendar
            ref={bCalendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            dateClick={handleDateClickB} // 날짜 클릭 이벤트 핸들러
            headerToolbar={{
              left: '',
              center: 'prev,title,next',
              right: '',
            }}
            dayHeaderContent={renderDayHeaderB}
            dayCellContent={renderDayCellB} // 커스텀 dayCellContent
            locale="ko"
          />
        </MiniCalendarWrapper>
        {/* 메인 스케줄러 */}
        <SchedulerWrapper form={scheduleForm}>
          <SearchInput
            type="text"
            placeholder="강사 검색"
            value={searchQuery}
            onChange={handleSearch}
          />
          {/* A 캘린더 */}
          <FullCalendar
            ref={aCalendarRef} // A캘린더 ref
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next,title,customToday',
              // center: 'title',
              right: 'customWeek,customMonth',
            }}
            titleFormat={{
              year: undefined, // 연도 표시 제거
              month: 'long', // 월 이름 전체 (e.g., January)
              day: 'numeric', // 날짜 (e.g., 1)
            }}
            dayHeaderContent={renderDayHeaderA}
            customButtons={{
              customToday: {
                text: 'today',
                click: () => {
                  handleResetTooptip();
                  updateSelectedDate(today); // 선택된 날짜 초기화
                  aCalendarRef.current?.getApi().gotoDate(today); // 오늘 날짜로 이동
                },
              },
              customWeek: {
                text: '주간', // "timeGridWeek" 버튼의 텍스트 변경
                click: () => {
                  handleResetTooptip();
                  setScheduleForm('week');
                  aCalendarRef.current?.getApi().changeView('timeGridWeek');
                },
              },
              customMonth: {
                text: '월간', // "dayGridMonth" 버튼의 텍스트 변경
                click: () => {
                  handleResetTooptip();
                  setScheduleForm('month');
                  aCalendarRef.current?.getApi().changeView('dayGridMonth');
                },
              },
            }}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false, // 24시간 표기법
            }}
            slotLabelContent={(arg) => {
              // 기존 시간 표시와 함께 추가 텍스트를 삽입
              return (
                <SlotLabelContainer>
                  <SlotLabelContent>{arg.text}</SlotLabelContent>{' '}
                </SlotLabelContainer>
              );
            }}
            slotMinTime="10:00:00"
            slotMaxTime="23:00:00"
            slotDuration="00:10:00" // 슬롯 단위: 1시간
            // defaultTimedEventDuration="00:10:00" // 이벤트 기본 지속 시간 10분
            // slotLabelInterval="01:00:00" // 1시간마다 라벨 표시
            allDaySlot={false}
            datesSet={handleDatesSetA} // 날짜 이동 이벤트 핸들러
            dateClick={openModal} // 날짜 클릭 시 이벤트 추가 모달 오픈
            events={events}
            eventClick={handleEventClick} // 이벤트 Click
            eventContent={renderEventCellA} // 이벤트 Cell
            editable={true} // week Form일 경우에만 편집 가능
            eventOverlap={true} // week Form일 경우에만 편집 가능
            slotEventOverlap={false} // 이벤트가 겹치지 않고 새로 배치
            eventDrop={handleEventDrop} // Drag&Drop Handler: start 정보 수정
            eventOrder={scheduleForm === 'week' ? 'title' : 'start'} // 이벤트 조건부 정렬
            eventDurationEditable={false} // 이벤트 길이 조정
            dayCellContent={scheduleForm === 'month' ? renderDayCellA : null} // 커스텀 dayCellContent
            locale="ko"
            height="auto"
          />
        </SchedulerWrapper>
        {/* 이벤트 Add Modal */}
        <AdminEventAddModal
          modalOpen={modalOpen}
          closeModal={closeModal}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          dayArr={dayArr}
          colors={colors}
          handleAddEvent={handleAddEvent}
          timeCalulate={timeCalulate}
        />
      </Container>
      {/* New 툴팁 */}
      {tooltip.visible && tooltip.content && (
        <AdminTooltipContainer
          onClick={(e) => e.stopPropagation()} // 툴팁 닫기 방지
          top={tooltip.position.top}
          left={tooltip.position.left}
        >
          <AdminTooltip
            id={tooltip.content.id}
            title={tooltip.content.title}
            start={tooltip.content.start}
            end={tooltip.content.end}
            event={tooltip.content.eventProps}
            backgroundColor={tooltip.content.backgroundColor}
            onEdit={handleEventUpdate} // 툴팁에서 이벤트 내용 수정
            timeCalulate={timeCalulate}
            handleResetTooptip={handleResetTooptip}
            dayArr={dayArr}
            colors={colors}
          />
        </AdminTooltipContainer>
      )}
    </>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  position: relative;
  z-index: 0;

  gap: 2rem;
`;

const MiniCalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .fc {
    width: 17vw;
    height: 400px;
    padding: 1rem;

    border: 2px solid #efefef;
    border-radius: 10px;
  }

  .fc-daygrid-day.fc-day-today {
    background-color: white;
  }

  .fc-scrollgrid-liquid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: none;
  }

  .fc-daygrid-day-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .fc-daygrid-day-events {
    display: none;
  }

  .fc-daygrid-day-number {
    padding: 0;
    width: 40px;
    height: 40px;
    /* color: #888888;
    font-family: Pretendard;
    font-weight: 700;
    font-size: 1.4rem; */
  }

  .highlighted-date-range {
    background: #eaf0ff;
    border: 2px solid #45b26b;
    border-radius: 10px;
  }

  // toolbar 관련
  .fc-toolbar-chunk {
    div {
      display: flex; /* 버튼들을 가로 정렬 */
      justify-content: center;
      align-items: center;
      gap: 0.4rem; /* 버튼 간 간격 */
    }

    // 이전, 다음 버튼
    .fc-prev-button,
    .fc-next-button {
      padding: 0.4rem;
      border: none;
      border-radius: 4px;
      background-color: white;
      color: #787878;

      /* box-shadow: 0px 1.94px 2.58px 0px #00000040; */

      &:hover {
        background-color: #378e56;
        color: white;
      }
    }
    // 날짜 title
    .fc-toolbar-title {
      width: 90px;
      display: inline;

      font-size: 1rem;
      font-family: Pretendard;
      font-weight: 600;
      text-align: left;
    }
  }

  // header 관련
  .fc-col-header-cell {
    .fc-scrollgrid-sync-inner {
      text-align: center;

      a {
        font-size: 0.7rem;
        font-family: Pretendard;
        font-weight: 600;
        text-align: left;
      }
    }
  }
`;

const MiniCalendarTitle = styled.div`
  width: 100%;

  background-color: #45b26b;
  color: white;

  border: none;
  border-radius: 10px;

  padding: 0.7rem 1.2rem;
  margin-right: 0.5rem;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: center;
`;

const SchedulerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;

  .fc {
    padding: 1rem 0;
    width: 65vw;
    height: auto;

    direction: ltr;
    text-align: left;
    margin: auto;
    font-family: AppleSDGothicNeoB00;

    --fc-event-border-color: 'none'; // Default Border color 제거
  }

  .fc-timegrid-slot {
    border-bottom: 1px solid #ddd;
  }

  .fc-timegrid-event-harness {
    border: none;
  }

  // Month dayCell 관련
  .fc-daygrid-day-events {
    height: 80px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  // todayCell 관련 (주간 + 월간)
  .fc-timegrid-col.fc-day-today,
  .fc-daygrid-day.fc-day-today {
    background-color: #eaf0ff;
    border: 2px solid #45b26b;
  }

  // toolbar 관련
  .fc-toolbar-chunk {
    div {
      display: flex; /* 버튼들을 가로 정렬 */
      justify-content: center;
      align-items: center;
      gap: 0.4rem; /* 버튼 간 간격 */
    }
    // 이전, 다음 버튼
    .fc-prev-button,
    .fc-next-button {
      padding: 0.3rem 0.5rem; /* 버튼 내부 여백 */
      border: none; /* 테두리 제거 */
      border-radius: 4px; /* 둥근 모서리 */
      background-color: #f0f0f0;
      color: #787878;

      box-shadow: 0px 1.94px 2.58px 0px #00000040;

      &:hover {
        background-color: #378e56;
        color: white;
      }
    }
    // 날짜 title
    .fc-toolbar-title {
      width: 200px;
      display: inline;
      padding-left: 1rem;

      font-size: 1.2rem;
      font-family: Pretendard;
      font-weight: 600;
      text-align: left;
    }
    // 오늘 버튼
    .fc-customToday-button {
      border: none; /* 테두리 제거 */
      border-radius: 4px; /* 둥근 모서리 */
      padding: 0.3rem 1rem; /* 버튼 내부 여백 */
      cursor: pointer; /* 클릭 가능 커서 */

      font-size: 1rem;
      font-family: Pretendard;
      font-weight: 400;
      text-align: left;

      background-color: #f0f0f0;
      color: black;

      box-shadow: 0px 1.94px 2.58px 0px #00000040;

      &:hover {
        background-color: #378e56;
        color: white;
      }
    }
    // 주간 버튼
    .fc-customWeek-button {
      padding: 0.3rem 1.2rem;
      font-size: 1rem;
      font-family: Pretendard;
      font-weight: 400;
      text-align: left;

      border: none;

      background-color: ${(props) =>
        props.form === 'week' ? '#378E56' : '#F0F0F0'};
      color: ${(props) => (props.form === 'week' ? 'white' : 'black')};

      box-shadow: 0px 1.94px 2.58px 0px #00000040;

      &:hover {
        background-color: #378e56;
        color: white;
      }
    }
    // 월간 버튼
    .fc-customMonth-button {
      padding: 0.3rem 1.2rem;

      font-size: 1rem;
      font-family: Pretendard;
      font-weight: 400;
      text-align: left;

      border: none;

      background-color: ${(props) =>
        props.form === 'month' ? '#378E56' : '#F0F0F0'};
      color: ${(props) => (props.form === 'month' ? 'white' : 'black')};

      box-shadow: 0px 1.94px 2.58px 0px #00000040;

      &:hover {
        background-color: #378e56;
        color: white;
      }
    }
  }

  // header 관련
  .fc-col-header-cell {
    background-color: #f2f2f2;
    padding: 0.5rem 0;

    .fc-scrollgrid-sync-inner {
      padding-left: 0.4rem;
      text-align: left;

      a {
        font-size: 1.2rem;
        font-family: Pretendard;
        font-weight: 600;
        text-align: left;
      }
    }
  }
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 0.5rem;
  padding-left: 1.2rem;

  border: 2px solid #dfdfdf;
  border-radius: 10px;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;
`;

const EventAddModal = styled(Modal)`
  width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 1000;

  outline: none;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 14px;
    font-weight: bold;
  }

  input {
    padding: 8px;
    font-size: 14px;
  }

  button {
    padding: 10px 15px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ColorSelectWrapper = styled.div`
  position: relative;
  width: 200px;

  select {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: ${(props) => props.selectedColor || '#fff'};
    color: ${(props) => (props.selectedColor ? '#fff' : '#000')};
    cursor: pointer;
    appearance: none; /* 기본 드롭다운 화살표 제거 */
  }

  option {
    background-color: ${(props) => props.color || '#fff'} !important;
    color: #000;
  }
`;

const AdminTooltipContainer = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  z-index: 1000;
`;

const SlotLabelContainer = styled.div`
  padding: 0.3rem 0.7rem;
`;

const SlotLabelContent = styled.span`
  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;
`;

const GridDayMonthContainerB = styled.div`
  background-color: ${(props) =>
    props.isOtherMonth ? '#e0e0e0' : '#f5f5f5'}; /* 이전/다음 달 배경 */
  color: ${(props) =>
    props.isOtherMonth
      ? '#e0e0e0'
      : props.color}; /* 이전/다음 달 텍스트 색상 */

  border-radius: 10px;
  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;
`;

const GridDayMonthContainerA = styled.div`
  background-color: white;
  color: ${(props) => (props.isOtherMonth ? '' : props.color)};

  border-radius: 10px;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;
`;

export default AdminSchedulerBody;
