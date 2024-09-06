import React from 'react';
import styled from 'styled-components';

const BoardItem = ({ post, onClick }) => {
  return (
    <TableRow isNotice={post.isNotice}>
      <TableCell>
        {post.isNotice ? <NoticeLabel>공지</NoticeLabel> : post.number}
      </TableCell>
      <TableCell>
        <Title onClick={onClick}>
          {post.isPrivate ? (
            <PrivateLabel>비공개 게시글입니다</PrivateLabel>
          ) : (
            post.title
          )}
        </Title>
      </TableCell>
      <TableCell>
        {post.isPrivate ? <PrivateLabel>비공개</PrivateLabel> : post.author}
      </TableCell>
      <TableCell>{post.date.split('T')[0]}</TableCell>
    </TableRow>
  );
};

export default BoardItem;

const TableRow = styled.tr`
  background-color: ${(props) => (props.isNotice ? '#fdfaf8' : 'white')};
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

const NoticeLabel = styled.span`
  display: inline-block;
  background-color: #eaeff7;
  color: #007bff;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  margin-right: 0.5rem;
  font-weight: bold;
`;

const PrivateLabel = styled.span`
  display: inline-block;
  background-color: #eaeff7;
  color: #007bff;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  margin-right: 0.5rem;
`;

const Title = styled.span`
  cursor: pointer;
  color: #333;
  &:hover {
    text-decoration: underline;
  }
`;
