import React from 'react';
import styled from 'styled-components';
// import { handleMypageUpdate } from '@/fetchAPI/mypageAPI';
// import Swal from 'sweetalert2';
// import CheckIcon from '@mui/icons-material/Check'; // Check 아이콘 사용

const AgencyTableReservationBody = ({ data, setIsOpen }) => {
  return (
    <TableRow>
      <TableCell>{data.kk_class_title}</TableCell>
      <TableCell>
        {data.kk_teacher_name ? data.kk_teacher_name : '매칭중...'}
      </TableCell>
      <TableCell>
        {data.kk_reservation_start_date} ~ {data.kk_reservation_end_date}
      </TableCell>
      <TableCell>
        {data.kk_teacher_phoneNum ? data.kk_teacher_phoneNum : '매칭중...'}
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
          <Status status={data.kk_reservation_approve_status}>대기중...</Status>
        )}
      </TableCell>
    </TableRow>
  );
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

const Status = styled.span`
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
