/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import AdminCustomColorSelect from './AdminCustomColorSelect';
import AdminCustomTimesSelect from './AdminCustomTimesSelect';

const AdminTooltip = ({
  vector,
  id,
  title,
  start,
  end,
  event,
  onEdit,
  backgroundColor,
  timeCalulate,
  handleResetTooptip,
  dayArr,
  colors,
}) => {
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedTeacherName, setUpdatedTeacherName] = useState('');
  const [updatedCourseName, setUpdatedCourseName] = useState('');
  const [updatedParticipants, setUpdatedParticipants] = useState(0);
  const [updatedTimes, setUpdatedTimes] = useState(0);
  const [updatedCourseTimes, setUpdatedCourseTimes] = useState(0);
  const [updatedBackColor, setUpdatedBackColor] = useState('');
  const [updatedNotes, setUpdatedNotes] = useState('');

  // 수정 토글 핸들러
  const updateIsOpenToggleHandler = () => {
    setUpdateIsOpen(!updateIsOpen);
  };

  // Update State Reset 핸들러
  const updateResetHandler = () => {
    setUpdatedTitle(title);
    setUpdatedTeacherName(event.teacherName);
    setUpdatedCourseName(event.courseName);
    setUpdatedParticipants(event.participants);
    setUpdatedTimes(event.times);
    setUpdatedCourseTimes(event.courseTimes);
    setUpdatedNotes(event.notes);
    setUpdatedBackColor(backgroundColor);
  };

  const updateHandler = () => {
    if (confirm('수정 하시겠습니까?') === true) {
      onEdit({
        id: Number(id),
        title: updatedTitle,
        end: new Date(
          new Date(start).getTime() + updatedCourseTimes * 60 * 1000
        ).toISOString(),
        extendedProps: {
          teacherName: updatedTeacherName,
          courseName: updatedCourseName,
          participants: updatedParticipants,
          times: updatedTimes,
          courseTimes: updatedCourseTimes,
          notes: updatedNotes,
        },
        backgroundColor: updatedBackColor,
      });
      updateIsOpenToggleHandler();
    }
  };

  useEffect(() => {
    updateResetHandler();
    setUpdateIsOpen(false);
  }, [id]);

  return (
    <TooltipContainer
      vector={vector}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {updateIsOpen ? (
        <>
          <Header>
            <Value>
              <StyledInput
                type="text"
                value={updatedTitle}
                onChange={(e) => {
                  setUpdatedTitle(e.target.value);
                }}
              />
            </Value>

            <EditButtonContainer>
              <EditButton onClick={updateHandler}>
                <Image
                  alt={'Check'}
                  src={'/src/Admin_IMG/Admin_Check_IMG.png'}
                  width={14}
                  height={14}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </EditButton>
              <EditButton
                onClick={() => {
                  updateResetHandler();
                  updateIsOpenToggleHandler();
                }}
              >
                <Image
                  alt={'Cancle'}
                  src={'/src/Admin_IMG/Admin_Cancle_IMG.png'}
                  width={12}
                  height={12}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </EditButton>
            </EditButtonContainer>
          </Header>
          <DetailContainer>
            <DetailRow>
              <Label>강 사 명</Label>
              <Value>
                <StyledInput
                  type="text"
                  value={updatedTeacherName}
                  onChange={(e) => {
                    setUpdatedTeacherName(e.target.value);
                  }}
                />
              </Value>
            </DetailRow>
            <DetailRow>
              <Label>강 좌 명</Label>
              <Value>
                <StyledInput
                  type="text"
                  value={updatedCourseName}
                  onChange={(e) => {
                    setUpdatedCourseName(e.target.value);
                  }}
                />
              </Value>
            </DetailRow>
            <DetailRow>
              <Label>요일/시간</Label>
              <Value>
                {dayArr[new Date(start).getDay()]}요일 / {timeCalulate(start)} ~{' '}
                {timeCalulate(end)}
              </Value>
            </DetailRow>
            <DetailRow>
              <Label>타 임 수</Label>
              <Value>
                <StyledInput
                  type="number"
                  value={updatedTimes}
                  onChange={(e) => {
                    setUpdatedTimes(e.target.value);
                  }}
                />
              </Value>
            </DetailRow>
            <DetailRow>
              <Label>인 원 수</Label>
              <Value>
                <StyledInput
                  type="number"
                  value={updatedParticipants}
                  onChange={(e) => {
                    setUpdatedParticipants(e.target.value);
                  }}
                />
              </Value>
            </DetailRow>
            {/* #TODO */}
            <DetailRow>
              <Label>Time</Label>
              <Value>
                <AdminCustomTimesSelect
                  updatedCourseTimes={updatedCourseTimes}
                  setUpdatedCourseTimes={setUpdatedCourseTimes}
                />
              </Value>
            </DetailRow>
            <DetailRow>
              <Label>Color</Label>
              <Value>
                <AdminCustomColorSelect
                  colors={colors}
                  setUpdatedBackColor={setUpdatedBackColor}
                />
              </Value>
            </DetailRow>
            <DetailRow>
              <Label>기타 보고</Label>
              <Value>
                <StyledTextarea
                  type="text"
                  value={updatedNotes}
                  onChange={(e) => {
                    setUpdatedNotes(e.target.value);
                  }}
                />
              </Value>
            </DetailRow>
          </DetailContainer>
        </>
      ) : (
        <>
          <Header>
            <Title>{`[ ${title} ]`}</Title>
            <EditButtonContainer>
              <EditButton onClick={updateIsOpenToggleHandler}>
                <Image
                  alt={'check'}
                  src={'/src/Admin_IMG/Admin_Update_IMG.png'}
                  width={18}
                  height={18}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </EditButton>
              <EditButton onClick={handleResetTooptip}>
                <Image
                  alt={'check'}
                  src={'/src/Admin_IMG/Admin_Cancle_IMG.png'}
                  width={12}
                  height={12}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </EditButton>
            </EditButtonContainer>
          </Header>
          <DetailContainer>
            <DetailRow>
              <Label>강 사 명</Label>
              <Value>{event.teacherName}</Value>
            </DetailRow>
            <DetailRow>
              <Label>강 좌 명</Label>
              <Value>{event.courseName}</Value>
            </DetailRow>
            <DetailRow>
              <Label>요일/시간</Label>
              <Value>
                {dayArr[new Date(start).getDay()]}요일 / {timeCalulate(start)} ~{' '}
                {timeCalulate(end)}
              </Value>
            </DetailRow>
            <DetailRow>
              <Label>타 임 수</Label>
              <Value>{event.times}T</Value>
            </DetailRow>
            <DetailRow>
              <Label>인 원 수</Label>
              <Value>{event.participants}명</Value>
            </DetailRow>
            <DetailRow>
              <Label>Time</Label>
              <Value>{event.courseTimes}분</Value>
            </DetailRow>
            <DetailRow>
              <Label>Color</Label>
              <Value>
                <ColorBox backColor={backgroundColor} />
              </Value>
              {/* <Value>{backgroundColor}</Value> */}
            </DetailRow>
            <DetailRow>
              <Label>Notes</Label>
              <Value>{event.notes}</Value>
            </DetailRow>
          </DetailContainer>
        </>
      )}
    </TooltipContainer>
  );
};

const TooltipContainer = styled.div`
  width: 300px;
  height: auto;

  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1.2rem;

  font-size: 14px;
  color: #333;

  z-index: 1000;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 1rem;
  margin-bottom: 1rem;

  border-bottom: 2px solid #a8bacc;
`;

const Title = styled.div`
  width: 170px;
  overflow: auto;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;
`;

const EditButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-left: 1rem;

  gap: 0.3rem;
`;

const EditButton = styled.button`
  width: 30px;
  height: 30px;

  background-color: #a8bacc;
  border: none;
  border-radius: 4px;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  gap: 0.5rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Label = styled.div`
  height: 18px;
  width: 28%;
  color: #4e4e4e;

  padding-right: 0.2rem;
  border-right: 2px solid #d9d9d9;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;
`;

const Value = styled.div`
  width: 170px;
  color: #4e4e4e;

  word-wrap: break-word; /* 긴 단어를 줄바꿈 */
  word-break: break-word; /* 단어가 너무 길면 줄바꿈 */
  white-space: pre-wrap; /* 공백과 줄바꿈을 유지하며 다음 줄로 넘김 */

  padding-left: 0.5rem;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;
`;

const ColorBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.backColor || 'none'};
  border-radius: 4px;
`;

const StyledInput = styled.input`
  width: 100%;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  resize: vertical; /* 높이만 변경 가능 */

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;
`;

export default AdminTooltip;
