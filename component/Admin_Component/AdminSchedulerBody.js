/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';

import AdminEvents from './AdminEvents';

const dayArr = ['일', '월', '화', '수', '목', '금', '토'];
const today = new Date();

const AdminSchedulerBody = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Math Class',
      start: '2025-01-15T10:00:00',
      extendedProps: {
        courseName: 'Mathematics',
        participants: 20,
        times: 2,
        notes: '직접 메모가 가능한 메모장으로 기타메모부분',
      },
    },
    {
      id: 2,
      title: 'English Class',
      start: '2025-01-15T11:00:00',
      extendedProps: {
        courseName: 'English Literature',
        participants: 15,
        times: 3,
        notes: 'Room 202',
      },
    },
  ]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    dayAndTime: '',
    courseName: '',
    participants: '',
    times: '',
    notes: '',
    date: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(today); // 선택된 날짜 상태

  const selectedDateRef = useRef(selectedDate); // 실시간 selectedDate 참조
  const aCalendarRef = useRef(null); // A캘린더의 ref
  const bCalendarRef = useRef(null); // B캘린더의 ref

  // selectedDate 상태 업데이트와 동시에 참조 업데이트
  const updateSelectedDate = (date) => {
    setSelectedDate(date);
    selectedDateRef.current = date; // 상태와 참조 동기화
  };

  // B캘린더 날짜 클릭 시 A캘린더와 동기화
  const handleDateClick = (info) => {
    const newDate = new Date(info.date);
    updateSelectedDate(newDate); // 선택된 날짜 업데이트

    if (aCalendarRef.current) {
      aCalendarRef.current.getApi().gotoDate(newDate); // A캘린더 날짜 이동
    }
  };

  // A캘린더 날짜 변경 시 B캘린더와 동기화
  const handleDatesSet = (info) => {
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
  };

  // 모달 열기
  const openModal = (date) => {
    setNewEvent((prev) => ({ ...prev, date }));
    setModalOpen(true);
  };
  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setNewEvent({
      title: '',
      courseName: '',
      participants: '',
      notes: '',
      date: '',
    });
  };

  // 이벤트 추가
  const handleAddEvent = async () => {
    const newEventData = {
      id: events.length + 1, // 임시 ID (서버에서 제공 시 업데이트 가능)
      title: newEvent.title,
      start: newEvent.date,
      extendedProps: {
        dayAndTime: `${dayArr[new Date(newEvent.date).getDay()]}요일/ ${newEvent.date.split('T')[1]} ~ ${newEvent.dayAndTime}`,
        courseName: newEvent.courseName,
        participants: newEvent.participants,
        times: newEvent.times,
        notes: newEvent.notes,
      },
    };

    // 서버로 이벤트 추가가 요청
    // await createStartOnServer(newEventData);

    setEvents((prevEvents) => [
      ...prevEvents,
      {
        ...newEventData,
        id: prevEvents.length + 1,
      },
    ]);
    closeModal();
  };

  // 이벤트 드래그 후 start 정보만 수정
  const handleEventDrop = (info) => {
    const { event } = info;

    // 수정된 start 정보만 반영
    const updatedEvent = {
      id: event.id,
      start: event.start.toISOString(),
    };

    console.log('updatedEvent: ', updatedEvent);

    // 서버로 업데이트 요청
    // updateStartOnServer(updatedEvent);

    // 로컬 상태 업데이트 (start만 변경)
    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === Number(updatedEvent.id)
          ? { ...evt, start: updatedEvent.start }
          : evt
      )
    );
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
  useEffect(() => {
    console.log('events:', events);
  }, [events]);

  // B캘린더 DayCell Render 메서드
  const renderDayCell = (arg) => {
    const dateObj = new Date(arg.date);
    // Day Cell 클릭 시 isHighlighted 트리거 On
    const isHighlighted =
      selectedDate && dateObj.toDateString() === selectedDate.toDateString(); // 선택된 날짜와 비교

    return (
      <div
        className={`fc-daygrid-day-frame ${
          isHighlighted ? 'highlighted-date-range' : ''
        }`}
      >
        {dateObj.getDate()}
      </div>
    );
  };

  return (
    <Container>
      <MiniCalendarWrapper>
        <FullCalendar
          ref={bCalendarRef} // B캘린더 ref
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          dateClick={handleDateClick} // 날짜 클릭 이벤트 핸들러
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          dayCellContent={renderDayCell} // 커스텀 dayCellContent
          locale="ko"
        />
      </MiniCalendarWrapper>
      <SchedulerWrapper>
        <SearchInput
          type="text"
          placeholder="Search by Teacher Name"
          value={searchQuery}
          onChange={handleSearch}
        />
        <FullCalendar
          ref={aCalendarRef} // A캘린더 ref
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next customToday',
            center: 'title',
            right: 'timeGridWeek,dayGridMonth',
          }}
          customButtons={{
            customToday: {
              text: 'Today',
              click: () => {
                aCalendarRef.current?.getApi().gotoDate(today); // 오늘 날짜로 이동
                updateSelectedDate(today); // 선택된 날짜 초기화
              },
            },
          }}
          slotMinTime="06:00:00"
          slotMaxTime="24:00:00"
          allDaySlot={false}
          datesSet={handleDatesSet} // 날짜 이동 이벤트 핸들러
          dateClick={(info) => openModal(info.dateStr)} // 모달 열기
          events={events}
          eventContent={(arg) => {
            return (
              <AdminEvents
                eventId={arg.event.id}
                eventTitle={arg.event.title}
                eventStart={arg.event.start}
                eventProps={arg.event.extendedProps}
                setEvents={setEvents}
              />
            );
          }}
          editable={true}
          eventOverlap={true}
          slotEventOverlap={false} // 이벤트가 겹치지 않고 새로 배치
          eventDrop={handleEventDrop} // Drag&Drop Handler: start 정보 수정
          eventOrder="title"
          locale="ko"
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 24시간 표기법
          }}
          // slotDuration="00:10:00" // 슬롯 단위: 1시간
          eventDurationEditable={false} // 이벤트 길이 조정
        />
      </SchedulerWrapper>

      {/* 모달 */}
      <StyledModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Add Event Modal"
      >
        <ModalContent>
          <label>
            제목:
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
          </label>
          <label>
            요일/시간: {dayArr[new Date(newEvent.date).getDay()]}요일/
            {newEvent.date && newEvent.date.split('T')[1]?.slice(0, 6)} ~ ?
          </label>
          <label>
            강좌명:
            <input
              type="text"
              value={newEvent.courseName}
              onChange={(e) =>
                setNewEvent({ ...newEvent, courseName: e.target.value })
              }
            />
          </label>
          <label>
            인원수:
            <input
              type="number"
              value={newEvent.participants}
              onChange={(e) =>
                setNewEvent({ ...newEvent, participants: e.target.value })
              }
            />
          </label>
          <label>
            타임수:
            <input
              type="number"
              value={newEvent.times}
              onChange={(e) =>
                setNewEvent({ ...newEvent, times: e.target.value })
              }
            />
          </label>
          <label>
            Notes:
            <input
              type="text"
              value={newEvent.notes}
              onChange={(e) =>
                setNewEvent({ ...newEvent, notes: e.target.value })
              }
            />
          </label>
          <button onClick={handleAddEvent}>Add Event</button>
          <button onClick={closeModal} style={{ marginTop: '10px' }}>
            Cancel
          </button>
        </ModalContent>
      </StyledModal>
    </Container>
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
  .fc {
    width: 300px;
    height: 400px;

    direction: ltr;
    text-align: left;
    margin: auto;
    font-family: AppleSDGothicNeoB00;
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
    background: linear-gradient(90deg, #4b95a2, #50a58e);
    border-radius: 10px;
    color: white;
  }
`;

const SchedulerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;

  .fc {
    width: 65vw;
    height: auto;

    direction: ltr;
    text-align: left;
    margin: auto;
    font-family: AppleSDGothicNeoB00;
  }

  .fc-timegrid-slot {
    height: 25px;
  }

  .fc-timegrid-col-events {
    display: flex !important; /* 강제로 플렉스 컨테이너로 설정 */
    flex-direction: column !important; /* 세로 정렬 */
    align-items: flex-start !important; /* 왼쪽 정렬 */
  }

  .fc-timegrid-event-harness {
  }

  .fc-event {
    width: 100%;
    height: 100%;
  }

  .fc-event-main {
    width: 100%;
    height: 100%;
  }
`;

const SearchInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  width: 300px;
  font-size: 16px;
`;

const StyledModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  width: 400px;
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

export default AdminSchedulerBody;
