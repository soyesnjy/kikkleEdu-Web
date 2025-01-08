/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import Modal from 'react-modal';
import AdminTooltip from './AdminTooltip';

const AdminScheduler = () => {
  const [tooltipVisible, setTooltipVisible] = useState(null);
  const [tooltipVecter, setTooltipVecter] = useState('right');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Math Class',
      start: '2025-01-08T10:00:00',
      extendedProps: {
        courseName: 'Mathematics',
        participants: 20,
        times: 2,
        notes: 'Room 101',
      },
    },
    {
      id: 2,
      title: 'English Class',
      start: '2025-01-08T11:00:00',
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
    courseName: '',
    participants: '',
    times: '',
    notes: '',
    date: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  // 툴팁 토글
  //   const toggleTooltip = (eventId) => {
  //     setTooltipVisible((prev) => (prev === eventId ? null : eventId));
  //   };

  const toggleTooltip = (eventId, vector) => {
    setTooltipVisible((prev) => (prev === eventId ? null : eventId));
    setTooltipVecter(vector); // 클릭 위치에 따라 방향 설정
  };

  const handleClick = (e, eventId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX; // 클릭한 화면의 X 좌표
    const midPoint = rect.left + rect.width / 2; // 컴포넌트의 중앙 좌표

    // 클릭 위치에 따라 left/right 설정
    const vector = clickX < midPoint ? 'left' : 'right';
    toggleTooltip(eventId, vector);
  };
  // 이벤트 추가
  const handleAddEvent = async () => {
    const newEventData = {
      id: events.length + 1, // 임시 ID (서버에서 제공 시 업데이트 가능)
      title: newEvent.title,
      start: newEvent.date,
      extendedProps: {
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

  // 이벤트 삭제
  const deleteEvent = async (eventId) => {
    console.log('Deleting event with ID:', eventId);

    // 서버 삭제 요청
    // await deleteEventFromServer(eventId);

    // 로컬 상태 업데이트
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== Number(eventId))
    );

    setTooltipVisible(null); // 툴팁 닫기
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

  // 키보드 이벤트로 삭제 기능
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (tooltipVisible && e.key === 'Delete') {
        deleteEvent(tooltipVisible);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tooltipVisible]);

  // events 로그 출력
  useEffect(() => {
    console.log('events:', events);
  }, [events]);

  const handleEventDidMount = (info) => {
    // 각 이벤트의 부모 요소인 .fc-timegrid-event-harness 수정
    const harness = info.el.closest('.fc-timegrid-event-harness');
    if (harness) {
      // 가로 정렬 제거
      harness.style.width = '100%';
      harness.style.left = '0';

      // 부모 컨테이너에서 모든 이벤트를 세로로 재배치
      const parent = harness.parentNode;
      const children = parent.querySelectorAll('.fc-timegrid-event-harness');

      children.forEach((child, index) => {
        child.style.transform = `translateY(${index}%)`; // 세로로 정렬
        child.style.position = 'absolute';
      });

      // 부모 컨테이너 높이 조정
      parent.style.position = 'relative';
      parent.style.height = `${children.length * 100}%`;

      const timeSlot = parent.closest('.fc-timegrid-slot');
      if (timeSlot) {
        timeSlot.style.height = `${children.length * 50}px`;
      }
    }
  };

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search by Teacher Name"
        value={searchQuery}
        onChange={handleSearch}
      />

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth',
        }}
        slotMinTime="06:00:00"
        slotMaxTime="24:00:00"
        allDaySlot={false}
        dateClick={(info) => openModal(info.dateStr)} // 모달 열기
        events={events}
        eventContent={(arg) => {
          const eventId = arg.event.id;
          const eventProps = arg.event.extendedProps;
          return (
            <>
              <StyledEvent
                onClick={(e) => {
                  handleClick(e, eventId);
                }}
                selected={tooltipVisible === eventId}
              >
                <b>{arg.event.title}</b>
              </StyledEvent>
              {tooltipVisible === eventId && (
                <AdminTooltip
                  vector={tooltipVecter}
                  title={arg.event.title}
                  event={eventProps}
                  onEdit={(e) => {
                    e.stopPropagation();
                    console.log('Tooltip Update!');
                  }}
                />
              )}
            </>
          );
        }}
        // eventDidMount={handleEventDidMount} // 이벤트 배치 후 실행
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
        // slotDuration="01:00:00" // 슬롯 단위: 1시간
        eventDurationEditable={false} // 이벤트 길이 조정 불가
      />

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
  position: relative;
  z-index: 0;

  .fc {
    width: 70vw;
    height: auto;

    direction: ltr;
    text-align: left;
    margin: auto;
    font-family: AppleSDGothicNeoB00;
  }

  .fc-timegrid-slot {
    height: 30px;
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

const EventContainer = styled.div`
  display: flex;
  flex-direction: column; /* 이벤트를 세로로 쌓기 */
  height: 100%; /* 전체 셀 높이 사용 */
`;

const StyledEvent = styled.div`
  width: 100%;
  height: 100%;
  position: relative; /* 툴팁 기준이 되는 부모 컴포넌트 */

  border: ${(props) => (props.selected ? '2px solid red' : '1px solid #ccc')};
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 5px;
  font-size: 12px;

  z-index: 1;

  cursor: pointer;

  b {
    font-size: 14px;
  }
`;

export default AdminScheduler;
