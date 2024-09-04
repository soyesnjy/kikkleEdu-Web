import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check'; // Check 아이콘 사용

// 날짜 -> 요일 변환 메서드
const getDayName = (dateString) => {
  // 요일 배열을 만듭니다. 0: 일요일, 1: 월요일, ... , 6: 토요일
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  // 입력된 문자열을 Date 객체로 변환합니다.
  const date = new Date(dateString);

  // 날짜가 유효한지 확인합니다.
  if (isNaN(date)) {
    return 'Invalid Date';
  }

  // getDay() 메서드를 사용하여 요일 인덱스를 가져옵니다.
  const dayIndex = date.getDay();

  // 요일 이름을 반환합니다.
  return days[dayIndex];
};

const AgencyTableAttendBody = ({ data }) => {
  const [attendIdx, setAttendIdx] = useState(0);
  const [attendStatus, setAttendStatus] = useState(0);

  useEffect(() => {
    setAttendIdx(data.kk_attend_idx);
    setAttendStatus(data.kk_attend_status);
  }, [data]);

  return (
    <TableRow>
      <TableCell>{data.kk_class_title}</TableCell>
      <TableCell>{data.kk_teacher_name}</TableCell>
      <TableCell>{data.kk_attend_date}</TableCell>
      <TableCell>{getDayName(data.kk_attend_date)}</TableCell>
      <TableCell>{data.kk_reservation_time}</TableCell>
      <TableCell>{data.kk_teacher_phoneNum}</TableCell>
      <TableCell>
        <Status status={data.kk_attend_status}>
          {data.kk_attend_status ? '출석' : '미출석'}
        </Status>
      </TableCell>
    </TableRow>
  );
};

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  max-width: 200px;

  padding: 1rem;
  border-bottom: 1px solid #ddd;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;
`;

const Status = styled.span`
  color: ${({ status }) => (status ? 'blue' : 'red')};
  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;
`;

export default AgencyTableAttendBody;
