import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const dayArr = ['일', '월', '화', '수', '목', '금', '토'];

const timeCalulate = (date, time = 0) => {
  const dateObj = new Date(date);
  if (time) dateObj.setMinutes(dateObj.getMinutes() + 30 * time);

  // const year = dateObj.getFullYear();
  // const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  // const day = ('0' + dateObj.getDate()).slice(-2);
  const hour = ('0' + dateObj.getHours()).slice(-2);
  const min = ('0' + dateObj.getMinutes()).slice(-2);

  return `${hour}:${min}`;
};

const AdminTooltip = ({ vector, id, title, start, event, onEdit }) => {
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedCourseName, setUpdatedCourseName] = useState('');
  const [updatedParticipants, setUpdatedParticipants] = useState(0);
  const [updatedTimes, setUpdatedTimes] = useState(0);
  const [updatedNotes, setUpdatedNotes] = useState('');

  const updateIsOpenToggleHandler = () => {
    setUpdateIsOpen(!updateIsOpen);
  };

  const updateResetHandler = () => {
    setUpdatedTitle(title);
    setUpdatedCourseName(event.courseName);
    setUpdatedParticipants(event.participants);
    setUpdatedTimes(event.times);
    setUpdatedNotes(event.notes);
  };

  useEffect(() => {
    updateResetHandler();
  }, []);

  return (
    <TooltipContainer
      vector={vector}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {updateIsOpen ? (
        <>
          <Header>
            <StyledInput
              type="text"
              value={updatedTitle}
              onChange={(e) => {
                setUpdatedTitle(e.target.value);
              }}
            />

            <EditButtonContainer>
              <EditButton
                onClick={() => {
                  if (confirm('수정 하시겠습니까?') === true) {
                    onEdit({
                      id: Number(id),
                      title: updatedTitle,
                      start,
                      extendedProps: {
                        courseName: updatedCourseName,
                        participants: updatedParticipants,
                        times: updatedTimes,
                        notes: updatedNotes,
                      },
                    });
                    updateIsOpenToggleHandler();
                  }
                }}
              >
                확인
              </EditButton>
              <EditButton
                onClick={() => {
                  updateResetHandler();
                  updateIsOpenToggleHandler();
                }}
              >
                취소
              </EditButton>
            </EditButtonContainer>
          </Header>
          <DetailRow>
            <Label>요일/시간</Label>
            <Value>
              {dayArr[new Date(start).getDay()]}요일 / {timeCalulate(start)} ~{' '}
              {timeCalulate(start, event.times)}
            </Value>
          </DetailRow>
          <DetailRow>
            <Label>강 좌 명</Label>
            <StyledInput
              type="text"
              value={updatedCourseName}
              onChange={(e) => {
                setUpdatedCourseName(e.target.value);
              }}
            />
          </DetailRow>
          <DetailRow>
            <Label>인 원 수</Label>
            <StyledInput
              type="number"
              value={updatedParticipants}
              onChange={(e) => {
                setUpdatedParticipants(e.target.value);
              }}
            />
          </DetailRow>
          <DetailRow>
            <Label>타 임 수</Label>
            <StyledInput
              type="number"
              value={updatedTimes}
              onChange={(e) => {
                setUpdatedTimes(e.target.value);
              }}
            />
          </DetailRow>
          <DetailRow>
            <Label>기타 보고</Label>
            <textarea
              type="text"
              value={updatedNotes}
              onChange={(e) => {
                setUpdatedNotes(e.target.value);
              }}
            />
          </DetailRow>
        </>
      ) : (
        <>
          <Header>
            <Title>{title}</Title>
            <EditButton onClick={updateIsOpenToggleHandler}>수정</EditButton>
          </Header>
          <DetailRow>
            <Label>요일/시간</Label>
            <Value>
              {dayArr[new Date(start).getDay()]}요일 / {timeCalulate(start)} ~{' '}
              {timeCalulate(start, event.times)}
            </Value>
          </DetailRow>
          <DetailRow>
            <Label>강 좌 명</Label>
            <Value>{event.courseName}</Value>
          </DetailRow>
          <DetailRow>
            <Label>인 원 수</Label>
            <Value>{event.participants}명</Value>
          </DetailRow>
          <DetailRow>
            <Label>타 임 수</Label>
            <Value>{event.times}T</Value>
          </DetailRow>
          <DetailRow>
            <Label>기타 보고</Label>
            <Value>{event.notes}</Value>
          </DetailRow>
        </>
      )}
    </TooltipContainer>
  );
};

const TooltipContainer = styled.div`
  width: 250px;
  height: auto;

  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;

  position: absolute;
  top: -5%; /* 이벤트 아래에 툴팁 표시 */
  left: ${(props) => (props.vector === 'left' ? '' : '105%')};
  right: ${(props) => (props.vector === 'left' ? '105%' : '')};

  font-size: 14px;
  color: #333;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-weight: bold;
`;

const EditButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditButton = styled.button`
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: #e0e0e0;
  }
`;

const DateInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
`;

const DetailRow = styled.div`
  margin-bottom: 5px;

  display: flex;
  justify-content: flex-start;
  gap: 1rem;
`;

const Label = styled.div`
  flex: 1;
  font-weight: bold;
  color: #555;
`;

const Value = styled.div`
  flex: 2;
  color: #777;
  word-wrap: break-word; /* 긴 단어를 줄바꿈 */
  word-break: break-word; /* 단어가 너무 길면 줄바꿈 */
  white-space: pre-wrap; /* 공백과 줄바꿈을 유지하며 다음 줄로 넘김 */
`;

const StyledInput = styled.input`
  max-width: 8.5rem;
  text-align: left;
`;
export default AdminTooltip;
