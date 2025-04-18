/* eslint-disable react-hooks/rules-of-hooks */
import styled from 'styled-components';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from 'react-query';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import AdminEvents from './AdminEvents';
import AdminTooltip from './AdminTooltip';
import AdminEventAddModal from './AdminEventAddModal';

import {
  handleScheduleGet,
  handleScheduleDragUpdate,
  handleScheduleClickUpdate,
  handleScheduleCreate,
  handleScheduleGroupCreate,
  handleScheduleDelete,
  handleScheduleGroupDelete,
  handleScheduleHolidayGet,
} from '@/fetchAPI/schedulerAPI';

const dayArr: string[] = ['일', '월', '화', '수', '목', '금', '토'];
const today: Date = new Date();
const colors: { label: string; value: string }[] = [
  { label: '확정', value: '#BAE0FF' },
  { label: '신규', value: '#F0C9FB' },
  { label: '폐강', value: '#FFF' },
  { label: '교체예정', value: '#FE4A4A' },
  { label: '유치원/초등', value: '#D2FFB4' },
  { label: '타지역', value: '#FFEBBF' },
];

// Date Format String 변환 메서드 (HH:MM)
const timeCalulate = (date: string, all: boolean): string => {
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
// KST 변환 메서드
const convertToKST = (utcDate: Date): Date => {
  const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000); // UTC+9
  return kstDate;
};
// 이벤트 id [Number -> String] 변환 메서드
const transformedEvents = (events: EventType[]) => {
  return events.map((event) => ({
    ...event,
    id: event.id.toString(), // id를 string으로 변환
  }));
};

// React Query - 서버에서 데이터를 가져오는 API 함수
const reactQueryFetchEvent = async ({ queryKey }) => {
  const [, monthQuery, searchQuery] = queryKey;
  const response = await handleScheduleGet({
    monthQuery,
    searchQuery,
  });
  return response.data;
};

// events 객체 Type
type EventType = {
  id: number;
  groupIdx?: number; // 그룹 인덱스
  start: string;
  end: string;
  extendedProps: {
    teacherName: string;
    courseName: string;
    participants: number; // 인원수
    times: number; // 타임수
    courseTimes: number; // 수업시간
    notes: string;
  };
  backgroundColor: string;
  title: string;
};
// newEvent 객체 Type
type NewEventType = {
  title: string; //  제목
  teacherName: string; // 강사
  courseName: string; // 강좌명
  participants: number; // 인원수
  times: number; // 타임수
  courseTimes: number; // 수업시간
  notes: string; // 메모
  backgroundColor: string; // 배경색
  date: string; // 날짜
  recursiveEndDate: string; // 반복 종료 날짜
  isAllAdd?: boolean; // 전체 추가 여부
};
// holidays 객체 Type
type HolidayType = {
  date: string;
  name: string;
};
// Tooltip 객체 Type
type TooltipType = {
  visible: boolean;
  content: {
    id: number;
    title?: string;
    start?: string;
    end?: string;
    eventProps?: any;
    backgroundColor?: string;
  } | null;
  position: { top: number; left: number };
};

const AdminSchedulerBody = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [newEvent, setNewEvent] = useState<NewEventType>({
    title: '',
    teacherName: '',
    courseName: '',
    participants: 0,
    times: 0,
    courseTimes: 0,
    notes: '',
    backgroundColor: '',
    date: '',
    recursiveEndDate: '',
  });
  const [currentDateMonth, setCurrentDateMonth] = useState<number>(
    today.getMonth() + 1
  ); // A 캘린더 currentDate Month
  const [holidays, setHolidays] = useState<HolidayType[]>([]); // 공휴일 데이터 배열 (공공데이터)
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(today); // 미니 달력(B)에서 선택된 날짜
  const [selectedEventId, setSelectedEventId] = useState<number>(-1); // 선택된 eventID (이벤트 Delete 용도)
  const [scheduleForm, setScheduleForm] = useState<string>('week'); // 스케줄폼 (week || month)
  const [tooltip, setTooltip] = useState<TooltipType>({
    visible: false,
    content: null,
    position: { top: 0, left: 0 },
  }); // Tooltip 상태

  const selectedDateRef = useRef<Date | null>(selectedDate); // 실시간 selectedDate 참조
  const aCalendarRef = useRef<FullCalendar | null>(null); // A캘린더의 ref
  const bCalendarRef = useRef<FullCalendar | null>(null); // B캘린더의 ref

  // 공휴일 확인 메서드
  const isHoliday = useCallback(
    (date: Date): boolean => {
      if (!holidays.length) return false;
      return holidays.some(
        (holiday: HolidayType) =>
          new Date(holiday.date).toDateString() === date.toDateString()
      );
    },
    [holidays]
  );
  // selectedDate 업데이트 핸들러 - 미니 달력(B)에서 선택된 날짜 업데이트와 동시에 참조(selectedDateRef) 업데이트
  const updateSelectedDate = useCallback((date: Date) => {
    setSelectedDate(date);
    selectedDateRef.current = date; // 상태와 참조 동기화
  }, []);
  // 미니 달력(B) 날짜 클릭 핸들러 - A캘린더와 동기화
  const handleDateClickB = useCallback((info) => {
    const newDate = new Date(info.date);
    updateSelectedDate(newDate); // 선택된 날짜 업데이트

    if (aCalendarRef.current) {
      aCalendarRef.current.getApi().gotoDate(newDate); // A캘린더 날짜 이동
    }

    // 툴팁 닫기
    handleResetTooltip();
  }, []);
  // 메인 스케줄러(A) 날짜 변경 핸들러 - B캘린더와 동기화
  const handleDatesSetA = useCallback((info) => {
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
    if (aCalendarRef?.current?.getApi()?.getDate()) {
      setCurrentDateMonth(
        aCalendarRef?.current?.getApi()?.getDate().getMonth() + 1
      );
    }

    // 툴팁 닫기
    handleResetTooltip();
  }, []);

  // 미니 달력(B) 렌더 메서드
  const renderDayHeaderB = useCallback((arg) => {
    const dayStyle = {
      color:
        arg.date.getDay() === 0
          ? 'red'
          : arg.date.getDay() === 6
            ? 'blue'
            : 'black',
    };

    return <div style={dayStyle}>{`${dayArr[arg.date.getDay()]}`}</div>;
  }, []);

  const renderDayCellB = useCallback(
    (arg) => {
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
    },
    [selectedDate]
  );
  // 메인 스케줄러(A) 렌더 메서드
  const renderDayHeaderA = useCallback((arg) => {
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
  }, []);
  const renderDayCellA = useCallback((arg) => {
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
  }, []);
  const renderEventCellA = useCallback(
    (arg) => {
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
    },
    [scheduleForm, selectedEventId]
  );

  // 모달 Open 핸들러 - newEvent date 속성 갱신
  const openModal = useCallback((info: { dateStr: string }) => {
    handleResetTooltip(); // Tooltip 닫기
    setNewEvent((prevNewEvent) => ({ ...prevNewEvent, date: info.dateStr })); // newEvent date 속성 갱신
    setModalOpen(true);
  }, []);
  // 모달 Close 핸들러 - newEvent 초기화
  const handleCloseModal = useCallback(() => {
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
  }, []);

  // Tooltip Reset 핸들러
  const handleResetTooltip = useCallback(() => {
    setSelectedEventId(-1);
    setTooltip({
      visible: false,
      content: null,
      position: { top: 0, left: 0 },
    });
  }, []);
  // Tooltip Open 핸들러 - Tooltip 위치 계산
  const handleOpenTooltip = useCallback(
    (info) => {
      const { id, title, start, end, extendedProps, backgroundColor } =
        info.event;

      // 툴팁이 켜진 경우 끄기 (토글)
      if (tooltip.visible && tooltip.content && tooltip.content.id === id) {
        handleResetTooltip();
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
    },
    [tooltip]
  );

  // (new)이벤트 Check 핸들러
  const handleNewEventCheck = (event) => {
    const {
      title,
      teacherName,
      courseName,
      times,
      courseTimes,
      backgroundColor,
      recursiveEndDate,
    } = event;

    if (!title) {
      alert('제목을 입력하세요');
      return false;
    }
    if (!teacherName) {
      alert('강사를 입력하세요');
      return false;
    }
    if (!courseName) {
      alert('강좌명을 입력하세요');
      return false;
    }
    if (!times) {
      alert('타임수를 입력하세요');
      return false;
    }
    if (!courseTimes) {
      alert('수업시간을 선택하세요');
      return false;
    }
    if (!backgroundColor) {
      alert('색상을 선택하세요');
      return false;
    }
    if (
      recursiveEndDate &&
      new Date(recursiveEndDate) < new Date(newEvent.date)
    ) {
      alert('날짜를 똑바로 입력하세요 (이전 날짜 불가능)');
      return false;
    }

    return true;
  };
  // 이벤트 Insert 핸들러
  const handleInsertEvent = async (newEvent) => {
    // newEvent Check
    if (!handleNewEventCheck(newEvent)) return;

    const startDate = new Date(newEvent.date);
    const endDate = new Date(
      startDate.getTime() + newEvent.courseTimes * 60 * 1000
    );

    // 한국 시간 변환
    const startDateKST = convertToKST(startDate);
    const endDateKST = convertToKST(endDate);

    const newEventData = {
      // id: events.length + 1, // 임시 ID (서버에서 제공 시 업데이트 가능)
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

    // 이벤트 단일 추가
    // 서버 이벤트 추가 요청
    const res = await handleScheduleCreate({
      ...newEventData,
      start: startDateKST.toISOString(), // 한국 시간
      end: endDateKST.toISOString(), // 한국 시간
    });
    if (res.status === 200) {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          ...newEventData,
          id: res.data.data.id, // 추가된 이벤트의 DB Table PK
        },
      ]);
    } else alert('Insert Fail');

    handleResetTooltip();
    handleCloseModal();
  };
  // 이벤트 Group Insert 핸들러
  const handleGroupInsertEvent = async (newEvent) => {
    if (!handleNewEventCheck(newEvent)) return;

    if (!newEvent.recursiveEndDate) {
      alert('날짜를 선택해주세요');
      return;
    }

    const startDate = new Date(newEvent.date);
    const endDate = new Date(
      startDate.getTime() + newEvent.courseTimes * 60 * 1000
    );

    const startDateKST = convertToKST(startDate);
    const endDateKST = convertToKST(endDate);

    const baseEventData = {
      title: newEvent.title,
      start: startDateKST.toISOString(),
      end: endDateKST.toISOString(),
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

    const requestData = {
      ...baseEventData,
      isAllAdd: newEvent.isAllAdd,
      recursiveEndDate: newEvent.recursiveEndDate,
    };

    // 서버로 전송
    const res = await handleScheduleGroupCreate(requestData);
    if (res.status === 200) {
      setEvents((prevEvents) => [
        ...prevEvents,
        ...res.data.data.map((resData) => {
          return { ...baseEventData, ...resData };
        }),
      ]);
    } else {
      alert('Insert Fail');
    }

    handleResetTooltip();
    handleCloseModal();
  };
  // 이벤트 Drop 핸들러 start 정보만 수정
  const handleEventDrop = async (info) => {
    const { event } = info;
    const startDate = new Date(event.start);
    const endDate = new Date(
      startDate.getTime() + event.extendedProps.courseTimes * 60 * 1000
    );

    // 한국 시간 변환
    const startDateKST = convertToKST(startDate);
    const endDateKST = convertToKST(endDate);

    // 서버 상태 업데이트 - KST 적용
    const updatedEvent = {
      id: Number(event.id),
      start: startDateKST.toISOString(),
      end: endDateKST.toISOString(),
    };

    // 서버로 업데이트 요청
    const res = await handleScheduleDragUpdate(updatedEvent);

    if (res.status === 200) {
      // A 캘린더를 드롭한 Month로 이동
      if (aCalendarRef.current) {
        aCalendarRef.current.getApi().gotoDate(startDate); // A 캘린더 날짜 이동
      }
      handleResetTooltip();
      // 로컬 상태 업데이트 - UTC 적용
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === Number(event.id)
            ? {
                ...evt,
                start: startDate.toISOString(),
                end: endDate.toISOString(),
                groupIdx: 0,
              }
            : evt
        )
      );
    }
    // Update 실패
    else info.revert();
  };
  // 이벤트 Click Update 핸들러
  const handleEventClickUpdate = async (event) => {
    // 서버 전용 Update Input
    const updateInput = {
      ...event,
      end: convertToKST(new Date(event.end)), // 한국 시간 적용
    };
    // 서버로 업데이트 요청
    const res = await handleScheduleClickUpdate(updateInput);
    // 업데이트 성공 - 로컬 상태 업데이트. UTC 시간 적용
    if (res.status === 200) {
      // 전체 수정일 경우
      if (event.isAllEdit) {
        setEvents((prevEvents) =>
          prevEvents.map((evt) => {
            delete event.id; // group 조건. evt에 id 덮어쓰기 방지
            return evt.groupIdx === event.groupIdx
              ? {
                  ...evt,
                  ...event,
                  end: new Date(
                    new Date(evt.start).getTime() +
                      event.extendedProps.courseTimes * 60 * 1000
                  ).toISOString(),
                }
              : evt;
          })
        );
      } else
        setEvents((prevEvents) =>
          prevEvents.map((evt) =>
            evt.id === event.id ? { ...evt, ...event } : evt
          )
        );
    } else alert('Update Fail');
    handleResetTooltip();
  };
  // 이벤트 Delete 핸들러
  const handleDeleteEvent = async (eventId) => {
    // 서버 삭제 요청
    const res = await handleScheduleDelete({ eventId });

    if (res.status === 200) {
      // 로컬 상태 업데이트
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== Number(eventId))
      );
      handleResetTooltip();
    } else alert('Delete Fail');
  };
  // 이벤트 Group Delete 핸들러
  const handleGroupDelete = async (groupIdx) => {
    const res = await handleScheduleGroupDelete({ groupIdx });

    if (res.status === 200) {
      // 로컬 상태 업데이트
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.groupIdx !== Number(groupIdx))
      );
      handleResetTooltip();
    } else alert('Delete Fail');
  };

  // Search 핸들러
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Serach Query Debounce
  const useDebounce = (value: string, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // React Query 데이터 가져오기
  const {
    data: eventData,
    isLoading,
    error,
  } = useQuery(
    ['events', currentDateMonth, debouncedSearchQuery], // Query Key
    reactQueryFetchEvent, // Query Function
    {
      enabled: currentDateMonth > 0, // 유효한 값일 때만 실행
      staleTime: 5000, // 5초 동안 신선한 상태 유지
      cacheTime: 10000, // 10초 동안 캐시 유지
      keepPreviousData: true, // 데이터를 가져오는 동안 기존 데이터 유지
    }
  );

  // useEffect(() => {
  //   console.log(events);
  // }, [events]);

  // 공휴일 Data Get
  useEffect(() => {
    try {
      if (!holidays.length) {
        handleScheduleHolidayGet(today).then((res) => {
          if (res.status === 200) setHolidays([...res.data]);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // 가져온 서버 데이터를 `events` 상태에 반영
  useEffect(() => {
    if (eventData) setEvents(eventData);
  }, [eventData]);

  // Delete 삭제 기능
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedEventId !== -1 && e.key === 'Delete') {
        e.stopPropagation(); // 이벤트 전파 차단
        if (confirm('삭제 하시겠습니까?') === true) {
          handleDeleteEvent(selectedEventId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEventId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

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
                  handleResetTooltip();
                  updateSelectedDate(today); // 선택된 날짜 초기화
                  aCalendarRef.current?.getApi().gotoDate(today); // 오늘 날짜로 이동
                },
              },
              customWeek: {
                text: '주간', // "timeGridWeek" 버튼의 텍스트 변경
                click: () => {
                  handleResetTooltip();
                  setScheduleForm('week');
                  aCalendarRef.current?.getApi().changeView('timeGridWeek');
                },
              },
              customMonth: {
                text: '월간', // "dayGridMonth" 버튼의 텍스트 변경
                click: () => {
                  handleResetTooltip();
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
                  <SlotLabelContent>{arg.text}</SlotLabelContent>
                </SlotLabelContainer>
              );
            }}
            slotMinTime="10:00:00"
            slotMaxTime="23:00:00"
            slotDuration="00:10:00" // 슬롯 단위: 1시간
            // defaultTimedEventDuration="00:10:00" // 이벤트 기본 지속 시간 10분
            // slotLabelInterval="00:10:00" // 1시간마다 라벨 표시
            allDaySlot={false}
            datesSet={handleDatesSetA} // 날짜 이동 이벤트 핸들러
            dateClick={scheduleForm === 'week' ? openModal : undefined} // 날짜 클릭 시 이벤트 추가 모달 오픈
            events={transformedEvents(events)} // 이벤트 데이터
            eventClick={handleOpenTooltip} // 이벤트 Click
            eventContent={renderEventCellA} // 이벤트 Cell
            editable={true} // week Form일 경우에만 편집 가능
            eventOverlap={true} // week Form일 경우에만 편집 가능
            slotEventOverlap={false} // 이벤트가 겹치지 않고 새로 배치
            eventDrop={handleEventDrop} // Drag&Drop Handler: start 정보 수정
            eventOrder={
              scheduleForm === 'week' ? 'extendedProps.teacherName' : 'start'
            } // 이벤트 정렬 (주간: 강사명순 / 월간: 시작시간순)
            eventDurationEditable={false} // 이벤트 길이 조정
            dayCellContent={scheduleForm === 'month' ? renderDayCellA : null} // 커스텀 dayCellContent
            locale="ko"
            height="auto"
          />
        </SchedulerWrapper>
        {/* 이벤트 Add Modal */}
        <AdminEventAddModal
          modalOpen={modalOpen}
          closeModal={handleCloseModal}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          dayArr={dayArr}
          colors={colors}
          handleAddEvent={handleInsertEvent}
          handleGroupInsertEvent={handleGroupInsertEvent}
          timeCalulate={timeCalulate}
        />
      </Container>
      {/* Tooltip */}
      {tooltip.visible && tooltip.content && (
        <AdminTooltipContainer
          onClick={(e) => e.stopPropagation()} // 툴팁 닫기 방지
          top={tooltip.position.top}
          left={tooltip.position.left}
        >
          <AdminTooltip
            id={tooltip.content.id}
            title={tooltip.content.title || ''}
            start={tooltip.content.start || ''}
            end={tooltip.content.end || ''}
            event={tooltip.content.eventProps}
            backgroundColor={tooltip.content.backgroundColor || ''}
            handleEventClickUpdate={handleEventClickUpdate} // 툴팁에서 이벤트 내용 수정
            handleResetTooltip={handleResetTooltip}
            handleGroupDelete={handleGroupDelete}
            timeCalulate={timeCalulate}
            dayArr={dayArr}
            colors={colors}
          />
        </AdminTooltipContainer>
      )}
    </>
  );
};

type SchedulerWrapperType = {
  form: string;
};

type TooltipContainerType = {
  left?: number;
  top?: number;
};

type GridDayMonthContainerType = {
  isOtherMonth: boolean;
  color: string;
};

// Styled Components
const Container = styled.div`
  display: flex;
  position: relative;
  z-index: 0;

  gap: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const MiniCalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .fc {
    width: 330px;
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

  @media (max-width: 768px) {
    .fc {
      width: 100%;
      height: 400px;
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

const SchedulerWrapper = styled.div<SchedulerWrapperType>`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;

  .fc {
    width: 100%;
    padding: 1rem 0;
    height: auto;

    --fc-event-border-color: 'none'; // Default 이벤트 테두리 제거
  }

  .fc-timegrid-slot {
    border-bottom: 1px solid #ddd;
  }

  // Month dayCell 관련
  .fc-daygrid-day-events {
    height: 130px;
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

const AdminTooltipContainer = styled.div<TooltipContainerType>`
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

const GridDayMonthContainerB = styled.div<GridDayMonthContainerType>`
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

const GridDayMonthContainerA = styled.div<GridDayMonthContainerType>`
  background-color: white;
  color: ${(props) => (props.isOtherMonth ? '' : props.color)};

  border-radius: 10px;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;
`;

export default AdminSchedulerBody;
