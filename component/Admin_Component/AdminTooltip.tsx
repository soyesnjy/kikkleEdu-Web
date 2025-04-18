import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import AdminCustomColorSelect from './AdminCustomColorSelect';
import AdminCustomTimesSelect from './AdminCustomTimesSelect';

// 툴팁 이벤트 객체 Type
type TooltipEventType = {
  id: number; // 이벤트(스케줄) 고유번호
  groupIdx: number; // 그룹 인덱스
  start: string; // 시작 시간
  end: string; // 종료 시간
  title: string; // 제목
  teacherName: string; // 강사명
  courseName: string; // 강좌명
  participants: number; // 참여인원
  times: number; // 타임수
  courseTimes: number; // 강좌시간
  notes: string; // 메모
  backgroundColor: string; // 배경색
};

// 수정 이벤트 객체 Type
type UpdateEventType = {
  id: number;
  groupIdx: number;
  title: string;
  end: string;
  extendedProps: {
    teacherName: string;
    courseName: string;
    participants: number;
    times: number;
    courseTimes: number;
    notes: string;
  };
  backgroundColor: string;
  isAllEdit: boolean;
};

// Props Type
type PropsType = {
  id: string | number;
  title: string;
  start: string;
  end: string;
  event: TooltipEventType;
  handleEventClickUpdate: (event: UpdateEventType) => void; // 수정 이벤트 핸들러
  backgroundColor: string;
  timeCalulate: (date: string, all?: boolean) => string; // 시간 계산 함수
  handleResetTooltip: () => void; // 툴팁 리셋 핸들러
  handleGroupDelete: (groupIdx: number) => void; // 그룹 삭제 핸들러
  dayArr: string[];
  colors: { label: string; value: string }[];
};

const AdminTooltip = ({
  id,
  title,
  start,
  end,
  event,
  handleEventClickUpdate,
  backgroundColor,
  timeCalulate,
  handleResetTooltip,
  handleGroupDelete,
  dayArr,
  colors,
}: PropsType) => {
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>('');
  const [updatedTeacherName, setUpdatedTeacherName] = useState('');
  const [updatedCourseName, setUpdatedCourseName] = useState('');
  const [updatedParticipants, setUpdatedParticipants] = useState(0);
  const [updatedTimes, setUpdatedTimes] = useState(0);
  const [updatedCourseTimes, setUpdatedCourseTimes] = useState(0);
  const [updatedBackColor, setUpdatedBackColor] = useState<string>('');
  const [updatedNotes, setUpdatedNotes] = useState('');
  const [isAllEdit, setIsAllEdit] = useState(false);

  // Update Toggle 핸들러
  const handleupdateIsOpenToggle = () => {
    setUpdateIsOpen(!updateIsOpen);
  };
  // Update State Reset 핸들러
  const handleUpdateReset = () => {
    setUpdatedTitle(title);
    setUpdatedTeacherName(event.teacherName);
    setUpdatedCourseName(event.courseName);
    setUpdatedParticipants(event.participants);
    setUpdatedTimes(event.times);
    setUpdatedCourseTimes(event.courseTimes);
    setUpdatedNotes(event.notes);
    setUpdatedBackColor(backgroundColor);
  };
  // Update Click 핸들러
  const handleUpdateClick = () => {
    if (confirm('수정 하시겠습니까?') === true) {
      handleEventClickUpdate({
        id: Number(id),
        groupIdx: event.groupIdx,
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
        isAllEdit,
      });
      handleupdateIsOpenToggle();
    }
  };
  // Group Delete Click 핸들러
  const handleGroupDeleteClick = () => {
    if (confirm('전체 삭제 하시겠습니까?') === true) {
      handleGroupDelete(event.groupIdx);
      handleResetTooltip();
    }
  };

  useEffect(() => {
    handleUpdateReset();
    setUpdateIsOpen(false);
  }, [id]);

  return (
    <TooltipContainer
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
              <EditButton onClick={handleUpdateClick}>
                <Image
                  alt={'Check'}
                  src={'/src/Admin_IMG/Admin_Check_IMG.png'}
                  width={14}
                  height={14}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </EditButton>
              <EditButton onClick={handleResetTooltip}>
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
                  min="0"
                  value={updatedTimes}
                  onChange={(e) => {
                    setUpdatedTimes(Number(e.target.value));
                  }}
                />
              </Value>
            </DetailRow>
            <DetailRow>
              <Label>인 원 수</Label>
              <Value>
                <StyledInput
                  type="number"
                  min="0"
                  value={updatedParticipants}
                  onChange={(e) => {
                    setUpdatedParticipants(Number(e.target.value));
                  }}
                />
              </Value>
            </DetailRow>
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
                  // type="text"
                  value={updatedNotes}
                  onChange={(e) => {
                    setUpdatedNotes(e.target.value);
                  }}
                />
              </Value>
            </DetailRow>
            {event.groupIdx ? (
              <DetailRow>
                <RowContainer>
                  <HiddenCheckbox
                    id="checkTerms"
                    checked={isAllEdit}
                    onChange={(e) => {
                      setIsAllEdit(e.currentTarget.checked);
                    }}
                  />
                  <StyledCheckbox
                    check={isAllEdit}
                    onClick={() => {
                      setIsAllEdit(!isAllEdit);
                    }}
                  >
                    <Icon viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </Icon>
                  </StyledCheckbox>
                  <RecursiveLabel check={isAllEdit}>
                    {`전체수정`}
                  </RecursiveLabel>
                  <GroupDeleteButton
                    onClick={handleGroupDeleteClick}
                  >{`전체 삭제`}</GroupDeleteButton>
                </RowContainer>
              </DetailRow>
            ) : null}
          </DetailContainer>
        </>
      ) : (
        <>
          <Header>
            <Title>{`[ ${title} ]`}</Title>
            <EditButtonContainer>
              <EditButton onClick={handleupdateIsOpenToggle}>
                <Image
                  alt={'check'}
                  src={'/src/Admin_IMG/Admin_Update_IMG.png'}
                  width={18}
                  height={18}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </EditButton>
              <EditButton onClick={handleResetTooltip}>
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

type ColorBoxType = {
  backColor?: string;
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

const ColorBox = styled.div<ColorBoxType>`
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

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Icon = styled.svg`
  width: 20px;
  height: 20px;
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;

type CheckType = {
  check?: boolean;
};

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

const RecursiveLabel = styled.label<CheckType>`
  font-size: 1rem;
  font-weight: 600;
  font-family: Pretendard;
  color: ${(props) => (props.check ? 'black' : '#D9D9D9')};

  user-select: none;
`;

const GroupDeleteButton = styled.button`
  border: none;
  border-radius: 8px;

  padding: 5px 8px;

  background-color: #d9d9d9;
  color: black;
  text-align: center;
  text-decoration: none;

  font-size: 0.8rem;
  font-weight: 600;
  font-family: Pretendard;

  cursor: pointer;

  &:hover {
    background-color: #45b26b;
    color: white;
  }

  transition: 0.2s;
`;

export default AdminTooltip;
