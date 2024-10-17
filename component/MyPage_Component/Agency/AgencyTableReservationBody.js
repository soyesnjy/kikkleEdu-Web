import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { handleMypageUpdate } from '@/fetchAPI/mypageAPI';
import Swal from 'sweetalert2';
import CheckIcon from '@mui/icons-material/Check'; // Check 아이콘 사용

const AgencyTableReservationBody = ({ data }) => {
  const [isPending, setIsPending] = useState(false); // 회원가입 버튼 활성화 state

  useEffect(() => {}, [data]);

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
      <TableCell>개발중...</TableCell>
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

export default AgencyTableReservationBody;
