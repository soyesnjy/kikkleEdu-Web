import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import AdminCustomColorSelect from './AdminCustomColorSelect';
import AdminCustomTimesSelect from './AdminCustomTimesSelect';

export default function AdminEventAddModal({
  modalOpen,
  closeModal,
  newEvent,
  setNewEvent,
  dayArr,
  colors,
  handleAddEvent,
  timeCalulate,
}) {
  const [checkTerms, setCheckTerms] = useState(false); // 일정 반복 체크 여부
  return (
    <EventAddModal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      contentLabel="Add Event Modal"
    >
      <ModalContent>
        <RowContainer>
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
        <SubContainer>
          {`요일/시간: ${dayArr[new Date(newEvent.date).getDay()]}요일 / ${timeCalulate(newEvent.date)}~${timeCalulate(new Date(new Date(newEvent.date).getTime() + newEvent.courseTimes * 60 * 1000))}`}
        </SubContainer>
        <RowContainer>
          <SubContainer>
            <StyledSpan>타임수</StyledSpan>
            <StyledInput
              type="number"
              value={newEvent.times}
              onChange={(e) =>
                setNewEvent({ ...newEvent, times: Number(e.target.value) })
              }
              width="80%"
            />
          </SubContainer>
          <SubContainer>
            <StyledSpan>인원수</StyledSpan>
            <StyledInput
              type="number"
              value={newEvent.participants}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  participants: Number(e.target.value),
                })
              }
              width="70%"
            />
          </SubContainer>
        </RowContainer>
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
        <SubContainer>
          <StyledSpan>Notes</StyledSpan>
          <StyledTextarea
            value={newEvent.notes}
            onChange={(e) =>
              setNewEvent({ ...newEvent, notes: e.target.value })
            }
          />
        </SubContainer>
        {/* 이벤트 다중 추가 */}
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
            <RecursiveSpan checkTerms={checkTerms}>
              {timeCalulate(newEvent.date, true)}
            </RecursiveSpan>
            ~
            <StyledInput
              disabled={!checkTerms}
              type="date"
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  recursiveEndDate: e.target.value + 'T23:59:59', // 시간 설정
                })
              }
            />
          </RowContainer>
        </SubContainer>
        <RowContainer>
          <EventButton
            isPending={true}
            onClick={() => {
              handleAddEvent(newEvent);
            }}
            style={{
              backgroundColor: '#378e56',
            }}
          >
            저장하기
          </EventButton>
          <EventButton
            onClick={closeModal}
            style={{
              backgroundColor: '#606c76',
            }}
          >
            취소하기
          </EventButton>
        </RowContainer>
      </ModalContent>
    </EventAddModal>
  );
}

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

const SubContainer = styled.div`
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

const EventButton = styled.button`
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

const StyledCheckbox = styled.div`
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

const RecursiveSpan = styled.span`
  font-size: 1rem;
  font-weight: 600;
  font-family: Pretendard;
  color: ${(props) => (props.checkTerms ? 'black' : '#D9D9D9')};
`;
