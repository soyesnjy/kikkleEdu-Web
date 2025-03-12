/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';

import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import { log, agencyClass } from '@/store/state';

import { useQuery } from 'react-query';
import { handleBoardGet } from '@/fetchAPI/boardAPI';

import { useRouter } from 'next/router';

import BoardHeaderSection from '@/component/Board_Component/BoardHeaderSection';
import BoardItem from '@/component/Board_Component/BoardItem';
import Pagination from '@/component/Common_Component/Pagination';

// Teacher Data Type
type BoardDataType = {
  number?: string;
};

export default function BoardList() {
  const [login] = useRecoilState(log);
  const [agencyType] = useRecoilState(agencyClass);

  const [posts, setPosts] = useState<BoardDataType[]>([]);
  const [page, setPage] = useState(1);
  const [lastPageNum, setLastPageNum] = useState(1);

  const router = useRouter();

  const handleItemClick = (id: string) => {
    router.push(`/board/${id}`); // 게시글 ID로 이동
  };

  // 로그인 권한이 없는 상태에서의 접근 시 login 페이지로 redirect
  useEffect(() => {
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (!loginSession) {
      alert('로그인이 필요한 서비스입니다!');
      router.replace('/login');
      return;
    }
  }, [login]);

  // React Query - 서버에서 데이터를 가져오는 API 함수
  const reactQueryFetchBoard = async ({ queryKey }) => {
    const [, page] = queryKey;
    const response = await handleBoardGet({
      pageNum: page,
    });
    return response.data;
  };

  // React Query 데이터 가져오기
  const { data, isLoading, error } = useQuery(
    ['board', page], // Query Key
    reactQueryFetchBoard, // Query Function
    {
      staleTime: 5000, // 5초 동안 신선한 상태 유지
      cacheTime: 10000, // 10초 동안 캐시 유지
      keepPreviousData: true, // 데이터를 가져오는 동안 기존 데이터 유지
    }
  );

  // 가져온 서버 데이터를 상태에 반영
  useEffect(() => {
    if (data) {
      setPosts(data.data);
      setLastPageNum(data.lastPageNum);
    }
  }, [data]);

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <BoardHeaderSection />
      {/* Loading && Error Handling */}
      {isLoading ? <div>Loading...</div> : null}
      {error ? <div>Error...</div> : null}
      {/* 게시판 */}
      <BoardContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>{`번호`}</TableHeader>
              <TableHeader>{`제목`}</TableHeader>
              <TableHeader>{`작성자`}</TableHeader>
              <TableHeader>{`작성일`}</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {posts.map((post) => (
              <BoardItem
                key={post.number}
                post={post}
                onClick={() => handleItemClick(post.number)}
              />
            ))}
          </tbody>
        </Table>
      </BoardContainer>
      {/* admin 전용 */}
      {agencyType === 'admin' ? (
        <ButtonContainer>
          {/* 추가 */}
          {agencyType === 'admin' && (
            <Button
              onClick={() => {
                localStorage.setItem('activeTab', 'notice');
                router.push('/administor');
              }}
            >
              {`등록`}
            </Button>
          )}
        </ButtonContainer>
      ) : null}
      <Pagination page={page} setPage={setPage} lastPageNum={lastPageNum} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: white;

  display: flex;
  flex-direction: column;

  align-items: center;
`;

const BoardContainer = styled.div`
  width: 80vw;
  margin: 0 auto;
  padding: 2rem 0;

  @media (max-width: 768px) {
    width: 90vw;

    padding: 1rem 0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #eaeff7;

  color: #333;
  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;

  /* 열 비율 설정 */
  &:nth-child(1) {
    width: 15%; /* 첫 번째 열의 너비를 10%로 설정 */
  }
  &:nth-child(2) {
    width: 45%; /* 두 번째 열의 너비를 50%로 설정 */
  }
  &:nth-child(3) {
    width: 20%; /* 세 번째 열의 너비를 10%로 설정 */
  }
  &:nth-child(4) {
    width: 15%; /* 네 번째 열의 너비를 15%로 설정 */
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const ButtonContainer = styled.div`
  width: 80vw;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;

  gap: 0.5rem;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;
