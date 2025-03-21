import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import AdminCustomColorSelect from './AdminCustomColorSelect';
import AdminCustomTimesSelect from './AdminCustomTimesSelect';

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

// Props Type
type PropsType = {
  modalOpen: boolean; // Modal Open 여부
  closeModal: () => void; // Modal Close 핸들러
  newEvent: NewEventType; // newEvent 객체
  setNewEvent: React.Dispatch<React.SetStateAction<NewEventType>>; // newEvent 객체 Setter
  dayArr: string[]; // 요일 배열
  colors: { label: string; value: string }[]; // 색상 배열
  handleAddEvent: (newEvent: NewEventType) => void; // 단일 추가 핸들러
  handleGroupInsertEvent: (newEvent: NewEventType) => void; // 반복 추가 핸들러
  timeCalulate: (date: string | Date, all?: boolean) => string; // 시간 계산 함수
};

export default function AdminEventAddModal({
  modalOpen,
  closeModal,
  newEvent,
  setNewEvent,
  dayArr,
  colors,
  handleAddEvent, // 단일 추가 핸들러
  handleGroupInsertEvent, // 반복 추가 핸들러
  timeCalulate,
}: PropsType) {
  const [checkTerms, setCheckTerms] = useState(false); // 일정 반복 체크 여부

  // Modal Close 핸들러
  const handleCloseModal = () => {
    setCheckTerms(false);
    setNewEvent({
      ...newEvent,
      recursiveEndDate: '', // 시간 초기화
    });
    closeModal();
  };
  // Event Add Click 핸들러
  const handleAddEventClick = () => {
    // 반복 추가
    if (checkTerms) {
      handleGroupInsertEvent({
        ...newEvent,
        isAllAdd: checkTerms,
      });
    }
    // 단일 추가
    else handleAddEvent(newEvent);
  };

  return (
    <EventAddModal
      isOpen={modalOpen}
      onRequestClose={handleCloseModal} // ModalContent 외부 클릭 이벤트
      // ariaHideApp={false}
      contentLabel="Add Event Modal"
      shouldFocusAfterRender={false} // Modal Open 시, 첫번째 input에 자동 포커스 되는 것 방지
    >
      <ModalContent>
        {/* [title + teacherName] Container */}
        <RowContainer>
          {/* title(제목) Container */}
          <SubContainer>
            <StyledSpan>제목</StyledSpan>
            <StyledInput
              type="text"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              width="80%"
            />
          </SubContainer>
          {/* teacherName(강사명) Container */}
          <SubContainer>
            <StyledSpan>강사</StyledSpan>
            <StyledInput
              type="text"
              value={newEvent.teacherName}
              onChange={(e) =>
                setNewEvent({ ...newEvent, teacherName: e.target.value })
              }
              width="70%"
            />
          </SubContainer>
        </RowContainer>
        {/* courseName(강좌명) Container */}
        <SubContainer borderBottom={true}>
          <StyledSpan>강좌명</StyledSpan>
          <StyledInput
            type="text"
            value={newEvent.courseName}
            onChange={(e) =>
              setNewEvent({ ...newEvent, courseName: e.target.value })
            }
            width="100%"
          />
        </SubContainer>
        {/* date Container (onChange 없음) */}
        <SubContainer>
          {`요일/시간: ${dayArr[new Date(newEvent.date).getDay()]}요일 / ${timeCalulate(newEvent.date)}~${timeCalulate(new Date(new Date(newEvent.date).getTime() + newEvent.courseTimes * 60 * 1000))}`}
        </SubContainer>
        {/* times(타임수) Container */}
        <RowContainer>
          <SubContainer>
            <StyledSpan>타임수</StyledSpan>
            <StyledInput
              type="text"
              min="0"
              value={newEvent.times}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
                setNewEvent({ ...newEvent, times: Number(value) });
              }}
              width="80%"
            />
          </SubContainer>
          <SubContainer>
            <StyledSpan>인원수</StyledSpan>
            <StyledInput
              type="text"
              min="0"
              value={newEvent.participants}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
                setNewEvent({
                  ...newEvent,
                  participants: Number(value),
                });
              }}
              width="70%"
            />
          </SubContainer>
        </RowContainer>
        {/* courseTimes(수업 시간) Container */}
        <SubContainer>
          <StyledSpan>Time</StyledSpan>
          <AdminCustomTimesSelect
            updatedCourseTimes={newEvent.courseTimes}
            setUpdatedCourseTimes={(time) => {
              setNewEvent({
                ...newEvent,
                courseTimes: time,
              });
            }}
          />
        </SubContainer>
        {/* backgroundColor(색상) Container */}
        <SubContainer>
          <StyledSpan>Color</StyledSpan>
          <AdminCustomColorSelect
            colors={colors}
            setUpdatedBackColor={(backColor) => {
              setNewEvent({
                ...newEvent,
                backgroundColor: backColor,
              });
            }}
          />
        </SubContainer>
        {/* notes(메모) Container */}
        <SubContainer>
          <StyledSpan>Notes</StyledSpan>
          <StyledTextarea
            value={newEvent.notes}
            onChange={(e) =>
              setNewEvent({ ...newEvent, notes: e.target.value })
            }
          />
        </SubContainer>
        {/* Recursive(반복 이벤트) Container */}
        <SubContainer>
          <StyledSpan>반복</StyledSpan>
          <RowContainer>
            <HiddenCheckbox
              id="checkTerms"
              checked={checkTerms}
              onChange={(e) => {
                setCheckTerms(e.currentTarget.checked);
              }}
            />
            <StyledCheckbox
              check={checkTerms}
              onClick={() => {
                setCheckTerms(!checkTerms);
              }}
            >
              <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </Icon>
            </StyledCheckbox>
            <RecursiveSpan check={checkTerms}>
              {`${timeCalulate(newEvent.date, true)} ~ `}
            </RecursiveSpan>
            <StyledInput
              disabled={!checkTerms}
              type="date"
              defaultValue={newEvent.date.slice(0, 10)}
              onChange={(e) => {
                setNewEvent({
                  ...newEvent,
                  recursiveEndDate: e.target.value + 'T23:59:59', // 시간 설정
                });
              }}
            />
          </RowContainer>
        </SubContainer>
        {/* Button(저장/취소) Container */}
        <RowContainer>
          <EventButton
            isPending={true}
            onClick={handleAddEventClick}
            style={{
              backgroundColor: '#378e56',
            }} // Modal Default 배경색 강제 변경
          >
            저장하기
          </EventButton>
          <EventButton
            onClick={handleCloseModal}
            style={{
              backgroundColor: '#606c76',
            }} // Modal Default 배경색 강제 변경
          >
            취소하기
          </EventButton>
        </RowContainer>
      </ModalContent>
    </EventAddModal>
  );
}

type SubContainerType = {
  borderBottom?: boolean;
};

type EventButtonType = {
  isPending?: boolean;
};

type CheckType = {
  check?: boolean;
};

const EventAddModal = styled(Modal)`
  width: 462px;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 1000;

  outline: none;

  --fc-event-bg-color: none;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    width: 100%;
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

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SubContainer = styled.div<SubContainerType>`
  width: 100%;
  color: #4e4e4e;

  border-bottom: ${(props) => (props.borderBottom ? '2px solid #A8BACC' : '')};
  padding-bottom: ${(props) => (props.borderBottom ? '1.5rem' : '')};
  margin-bottom: ${(props) => (props.borderBottom ? '0.7rem' : '')};

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 0.5rem;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;
`;

const StyledSpan = styled.span`
  width: 60px;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;
`;

const StyledInput = styled.input`
  width: ${(props) => props.width};
  height: 27px;

  background-color: #f7f7f7;
  border: 1px solid #a8bacc;
  border-radius: 4px;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 69px;
  resize: vertical; /* 높이만 변경 가능 */

  padding: 4px;

  background-color: #f7f7f7;
  border: 1px solid #a8bacc;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;
`;

const EventButton = styled.button<EventButtonType>`
  width: 100px;

  border: none;
  border-radius: 15px;

  padding: 1.3rem 23px;

  color: white;
  text-align: center;
  text-decoration: none;

  font-size: 1.2rem;
  font-weight: 400;
  font-family: Pretendard;

  cursor: pointer;
  &:hover {
    opacity: ${(props) => (props.isPending ? '1' : '0.8')};
  }

  transition: 0.5s;

  @media (max-width: 768px) {
    width: 100%;
    min-height: fit-content;
    min-height: 53px;
    font-size: 20px;
  }
`;

const Icon = styled.svg`
  width: 20px;
  height: 20px;
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;

const StyledCheckbox = styled.div<CheckType>`
  display: inline-block;
  width: 26px;
  height: 26px;
  background: ${(props) => (props.check ? '#45B26B' : '#D9D9D9')};
  border-radius: 5px;
  transition: all 150ms;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  /* clippath: inset(50%); */
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const RecursiveSpan = styled.span<CheckType>`
  font-size: 1rem;
  font-weight: 600;
  font-family: Pretendard;
  color: ${(props) => (props.check ? 'black' : '#D9D9D9')};

  user-select: none;
`;
