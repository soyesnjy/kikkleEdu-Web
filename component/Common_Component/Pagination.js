import React from 'react';
import styled from 'styled-components';

const Pagination = ({ page, setPage, lastPageNum }) => {
  const maxPagesToShow = 5; // 한 번에 보여줄 페이지 개수

  // 현재 페이지 세트의 시작과 끝 계산
  const startPage =
    Math.floor((page - 1) / maxPagesToShow) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, lastPageNum);

  const handleClick = (pageNum) => {
    setPage(pageNum);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < lastPageNum) {
      setPage(page + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton key={i} active={i === page} onClick={() => handleClick(i)}>
          {i}
        </PageButton>
      );
    }
    return pages;
  };

  return (
    <PaginationContainer>
      <NavButton onClick={handlePrevious} disabled={page === 1}>
        이전
      </NavButton>
      {renderPageNumbers()}
      <NavButton onClick={handleNext} disabled={page === lastPageNum}>
        다음
      </NavButton>
    </PaginationContainer>
  );
};

export default Pagination;

// Styled Components
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  background-color: ${({ active }) => (active ? '#61b15a' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#61b15a')};
  border: 1px solid #61b15a;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #61b15a;
    color: white;
  }
`;

const NavButton = styled.button`
  background-color: white;
  color: #61b15a;
  border: 1px solid #61b15a;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #61b15a;
    color: white;
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #c0c0c0;
    cursor: not-allowed;
  }
`;
