import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check'; // Check 아이콘 사용

const AgencyTableAttendBody = ({ data }) => {
  const [isPending, setIsPending] = useState(false); // 회원가입 버튼 활성화 state

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
