import React from 'react';
import styled from 'styled-components';

const AdminTooltip = ({ vector, title, event, onEdit }) => {
  return (
    <TooltipContainer vector={vector}>
      <Header>
        <Title>{title}</Title>
        <EditButton onClick={onEdit}>수정</EditButton>
      </Header>
      <DetailRow>
        <Label>요일/시간</Label>
        <Value>{event.dayAndTime}</Value>
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

  z-index: 10;
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

export default AdminTooltip;
