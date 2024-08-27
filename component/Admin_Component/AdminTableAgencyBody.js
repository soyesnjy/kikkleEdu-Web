import React, { useState } from 'react';
import styled from 'styled-components';

const AdminTableAgencyBody = ({ data }) => {
  const [updateFlag, setUpdateFlag] = useState(false);
  return (
    <>
      {!updateFlag ? (
        <TableRow>
          <TableCell>{data.kk_agency_idx}</TableCell>
          <TableCell>{data.kk_agency_name}</TableCell>
          <TableCell>{data.kk_agency_address}</TableCell>
          <TableCell>{data.kk_agency_phoneNum}</TableCell>
          <TableCell>{data.kk_agency_type}</TableCell>
          <TableCell>
            <a href={data.kk_agency_file_path}>Download</a>
          </TableCell>
          <TableCell>
            <Status status={data.kk_agency_approve_status}>
              {data.kk_agency_approve_status === 0 ? '미승인' : '승인'}
            </Status>
          </TableCell>
          <TableCell>
            <ButtonContainer>
              <Button
                onClick={() => {
                  setUpdateFlag(true);
                }}
              >
                수정
              </Button>
              <Button>삭제</Button>
            </ButtonContainer>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell>{data.kk_agency_idx}</TableCell>
          <TableCell>{data.kk_agency_name}</TableCell>
          <TableCell>{data.kk_agency_address}</TableCell>
          <TableCell>{data.kk_agency_phoneNum}</TableCell>
          <TableCell>{data.kk_agency_type}</TableCell>
          <TableCell>
            <a href={data.kk_agency_file_path}>Download</a>
          </TableCell>
          <TableCell>
            <Status status={data.kk_agency_approve_status}>
              {data.kk_agency_approve_status === 0 ? '미승인' : '승인'}
            </Status>
          </TableCell>
          <TableCell>
            <ButtonContainer>
              <Button>확인</Button>
              <Button
                onClick={() => {
                  setUpdateFlag(false);
                }}
              >
                취소
              </Button>
            </ButtonContainer>
          </TableCell>
        </TableRow>
      )}
    </>
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.2rem 0.4rem;
`;

export default AdminTableAgencyBody;
