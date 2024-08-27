import React from 'react';
import styled from 'styled-components';

const AdminTableReservationBody = ({ data }) => {
  return (
    <tbody>
      {data.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.title}</TableCell>
          <TableCell>{item.instructor}</TableCell>
          <TableCell>{item.date}</TableCell>
          <TableCell>{item.contact}</TableCell>
          <TableCell>
            <PaymentStatus status={item.paymentStatus}>
              {item.paymentStatus}
            </PaymentStatus>
          </TableCell>
        </TableRow>
      ))}
    </tbody>
  );
};

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;
`;

const PaymentStatus = styled.span`
  color: ${({ status }) => (status === '결제 완료' ? '#61b15a' : 'red')};
  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;
`;

export default AdminTableReservationBody;
