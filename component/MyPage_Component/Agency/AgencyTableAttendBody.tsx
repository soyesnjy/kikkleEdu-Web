import React from 'react';
import styled from 'styled-components';

// 날짜 -> 요일 변환 메서드
const getDayName = (dateString) => {
  // 요일 배열을 만듭니다. 0: 일요일, 1: 월요일, ... , 6: 토요일
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  // 입력된 문자열을 Date 객체로 변환합니다.
  const date = new Date(dateString);

  // 날짜가 유효한지 확인합니다.
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  // getDay() 메서드를 사용하여 요일 인덱스를 가져옵니다.
  const dayIndex = date.getDay();

  // 요일 이름을 반환합니다.
  return days[dayIndex];
};

const formatPhoneNumber = (phone: string) => {
  // `+82`로 시작하지 않으면 그대로 반환
  if (!phone?.startsWith('+82')) return phone;

  // 국가번호(+82) 제거하고 나머지 번호만 추출
  const numbers = phone.slice(3);

  // 뒤에서부터 8자리 추출 (010-xxxx-xxxx 형식)
  const lastEightDigits = numbers.slice(-8);

  // 4자리씩 나누어 형식에 맞게 조합
  return `010-${lastEightDigits.slice(0, 4)}-${lastEightDigits.slice(4)}`;
};

const AgencyTableAttendBody = ({ data }) => {
  return (
    <TableRow>
      <TableCell>{data.kk_class_title}</TableCell>
      <TableCell>{data.kk_teacher_name}</TableCell>
      <TableCell>{data.kk_attend_date}</TableCell>
      <TableCell>{getDayName(data.kk_attend_date)}</TableCell>
      <TableCell>{data.kk_reservation_time}</TableCell>
      <TableCell>{formatPhoneNumber(data.kk_teacher_phoneNum)}</TableCell>
      <TableCell>
        <Status status={data.kk_attend_status}>
          {data.kk_attend_status ? '출석' : '미출석'}
        </Status>
      </TableCell>
    </TableRow>
  );
};

type StatusType = {
  status?: boolean;
};

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    min-width: 100px;
    padding: 0.3rem;
    font-size: 0.8rem;
    text-align: center;
  }
`;

const Status = styled.span<StatusType>`
  color: ${({ status }) => (status ? 'blue' : 'red')};
  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;
`;

export default AgencyTableAttendBody;
