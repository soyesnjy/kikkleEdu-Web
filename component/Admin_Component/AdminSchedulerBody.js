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
const colors = [
  { label: '파란색', value: '#A3BCFF' },
  { label: '핑크색', value: '#FFA3F6' },
  { label: '주황색', value: '#FF7A00' },
  { label: '초록색', value: '#2BB215' },
  { label: '하늘색', value: '#55D0F6' },
  { label: '살구색', value: '#FFC9A3' },
];

const AdminSchedulerBody = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Math Class',
      start: '2025-01-15T11:00:00',
      end: '2025-01-15T11:50:00',
      extendedProps: {
        courseName: 'Mathematics',
        participants: 20,
        times: 2,
        notes: '직접 메모가 가능한 메모장으로 기타메모부분',
      },
      backgroundColor: '#FFA3F6',
    },
    {
      id: 2,
      title: 'English Class',
      start: '2025-01-15T11:10:00',
      end: '2025-01-15T12:00:00',
      extendedProps: {
        courseName: 'English Literature',
        participants: 15,
        times: 3,
        notes: 'Room 202',
      },
      backgroundColor: '#FF7A00',
    },
  ]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    dayAndTime: '',
    courseName: '',
    participants: '',
    times: '',
    notes: '',
    backgroundColor: '',
    date: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(today); // 선택된 날짜 상태
  const [scheduleForm, setScheduleForm] = useState('week');

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
      dayAndTime: '',
      courseName: '',
      participants: '',
      times: '',
      notes: '',
      backgroundColor: '',
      date: '',
    });
  };

  // 이벤트 추가
  const handleAddEvent = async () => {
    const startDate = new Date(newEvent.date);
    const endDate = new Date(startDate.getTime() + 50 * 60 * 1000); // start + 50분

    const newEventData = {
      id: events.length + 1, // 임시 ID (서버에서 제공 시 업데이트 가능)
      title: newEvent.title,
      start: newEvent.date,
      end: endDate.toISOString(),
      extendedProps: {
        dayAndTime: `${dayArr[new Date(newEvent.date).getDay()]}요일/ ${newEvent.date.split('T')[1]} ~ ${newEvent.dayAndTime}`,
        courseName: newEvent.courseName,
        participants: newEvent.participants,
        times: newEvent.times,
        notes: newEvent.notes,
      },
      backgroundColor: newEvent.backgroundColor,
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
    const startDate = new Date(event.start);
    const endDate = new Date(startDate.getTime() + 50 * 60 * 1000); // 50분 후 계산

    // 수정된 start 정보만 반영
    const updatedEvent = {
      id: Number(event.id),
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };

    console.log('updatedEvent: ', updatedEvent);

    // 서버로 업데이트 요청
    // updateStartOnServer(updatedEvent);

    // 로컬 상태 업데이트 (start만 변경)
    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === Number(updatedEvent.id)
          ? { ...evt, start: updatedEvent.start, end: updatedEvent.end }
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
      <SchedulerWrapper form={scheduleForm}>
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
            left: 'prev,next,title,customToday',
            // center: 'title',
            right: 'customWeek,customMonth',
          }}
          titleFormat={{
            year: undefined, // 연도 표시 제거
            month: 'long', // 월 이름 전체 (e.g., January)
            day: 'numeric', // 날짜 (e.g., 1)
          }}
          customButtons={{
            customToday: {
              text: 'today',
              click: () => {
                aCalendarRef.current?.getApi().gotoDate(today); // 오늘 날짜로 이동
                updateSelectedDate(today); // 선택된 날짜 초기화
              },
            },
            customWeek: {
              text: '주간', // "timeGridWeek" 버튼의 텍스트 변경
              click: () => {
                setScheduleForm('week');
                aCalendarRef.current?.getApi().changeView('timeGridWeek');
              },
            },
            customMonth: {
              text: '월간', // "dayGridMonth" 버튼의 텍스트 변경
              click: () => {
                setScheduleForm('month');
                aCalendarRef.current?.getApi().changeView('dayGridMonth');
              },
            },
          }}
          slotMinTime="10:00:00"
          slotMaxTime="22:00:00"
          allDaySlot={false}
          datesSet={handleDatesSet} // 날짜 이동 이벤트 핸들러
          dateClick={(info) => {
            if (scheduleForm === 'week') openModal(info.dateStr);
          }} // 모달 열기
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
          editable={scheduleForm === 'week'} // week Form일 경우에만 편집 가능
          eventOverlap={scheduleForm === 'week'} // week Form일 경우에만 편집 가능
          slotEventOverlap={false} // 이벤트가 겹치지 않고 새로 배치
          eventDrop={handleEventDrop} // Drag&Drop Handler: start 정보 수정
          eventOrder="title"
          locale="ko"
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 24시간 표기법
          }}
          slotDuration="00:10:00" // 슬롯 단위: 1시간
          // slotLabelInterval="01:00:00" // 1시간마다 라벨 표시
          defaultTimedEventDuration="00:10:00" // 이벤트 기본 지속 시간 10분
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
          <label>Notes</label>
          <textarea
            value={newEvent.notes}
            onChange={(e) =>
              setNewEvent({ ...newEvent, notes: e.target.value })
            }
          />
          <ColorSelectWrapper selectedColor={newEvent.backgroundColor}>
            <label>
              색상:
              <select
                value={newEvent.backgroundColor}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    backgroundColor: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  색상을 선택하세요
                </option>
                {colors.map((color) => (
                  <option
                    key={color.value}
                    value={color.value}
                    style={{ backgroundColor: color.value, color: '#000' }}
                  >
                    {color.label}
                  </option>
                ))}
              </select>
            </label>
          </ColorSelectWrapper>
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

  /* .fc-day-other {
    visibility: hidden;
  } */
`;

const SchedulerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;

  .fc {
    padding: 1rem;
    width: 65vw;
    height: 90vh;

    direction: ltr;
    text-align: left;
    margin: auto;
    font-family: AppleSDGothicNeoB00;
  }

  .fc-timegrid-slot {
    border-bottom: 1px solid #ddd; /* 슬롯 경계선 */
  }
  .fc-timegrid-axis-cushion {
    font-size: 12px; /* 라벨 텍스트 크기 조정 */
  }

  .fc-daygrid-day-events {
    height: 100px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .fc-event {
    width: 100%;
  }

  .fc-event-main {
    width: 100%;
    height: 100%;
  }

  .fc-toolbar-title {
    width: 200px;
    display: inline;
    padding-left: 1rem;

    font-size: 1.2rem;
    font-family: Pretendard;
    font-weight: 600;
    text-align: left;
  }

  .fc-toolbar-chunk {
    div {
      display: flex; /* 버튼들을 가로 정렬 */
      justify-content: center;
      align-items: center;
      gap: 0.2rem; /* 버튼 간 간격 */
    }
  }

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

    &:hover {
      background-color: #378e56;
    }
  }

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

    &:hover {
      background-color: #378e56;
    }
  }

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

    &:hover {
      background-color: #378e56;
    }
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

export default AdminSchedulerBody;
