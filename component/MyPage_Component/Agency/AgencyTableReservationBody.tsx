import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import PayModal from '@/component/MyPage_Component/PayModal';

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

const AgencyTableReservationBody = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell>{data.kk_class_title}</TableCell>
        <TableCell>
          {data.kk_teacher_name ? data.kk_teacher_name : '매칭중...'}
        </TableCell>
        <TableCell>
          {data.kk_reservation_start_date} ~ {data.kk_reservation_end_date}
        </TableCell>
        <TableCell>
          {data.kk_teacher_phoneNum
            ? formatPhoneNumber(data.kk_teacher_phoneNum)
            : '매칭중...'}
        </TableCell>
        <TableCell>
          <Status status={data.kk_reservation_approve_status}>
            {data.kk_reservation_approve_status ? '승인' : '미승인'}
          </Status>
        </TableCell>
        <TableCell>
          {data.kk_reservation_approve_status ? (
            <PayButton onClick={() => setIsOpen(true)}>세금 계산서</PayButton>
          ) : (
            <Status status={data.kk_reservation_approve_status}>
              대기중...
            </Status>
          )}
        </TableCell>
      </TableRow>
      <PayModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
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

const PayButton = styled.button`
  background-color: #378e56;
  padding: 0.7rem;
  border-radius: 12px;

  border: none;

  font-family: Pretendard;
  font-weight: 400;
  font-size: 1rem;
  color: white;

  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
`;

export default AgencyTableReservationBody;
