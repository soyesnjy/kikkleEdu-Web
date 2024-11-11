import React from 'react';
import styled from 'styled-components';

const BoardItem = ({ post, onClick }) => {
  return (
    <TableRow isnotice={post.isNotice ? 'true' : null}>
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
          {post.isPrivate &&
          post.authorIdx === Number(localStorage.getItem('userIdx'))
            ? post.title
            : null}
        </Title>
      </TableCell>
      <TableCell>
        {post.isPrivate ? <PrivateLabel>비공개</PrivateLabel> : post.author}
        {post.isPrivate &&
        post.authorIdx === Number(localStorage.getItem('userIdx'))
          ? post.author
          : null}
      </TableCell>
      <TableCell>{post.date.split('T')[0]}</TableCell>
    </TableRow>
  );
};

export default BoardItem;

const TableRow = styled.tr`
  background-color: ${(props) => (props.isnotice ? '#fdfaf8' : 'white')};
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.75rem;
  }
`;

const NoticeLabel = styled.span`
  display: inline-block;
  background-color: #eaeff7;
  color: #007bff;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  margin-right: 0.5rem;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: center;

  @media (max-width: 768px) {
    margin-right: 0;
    padding: 0.2rem;
    font-size: 0.75rem;
  }
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
