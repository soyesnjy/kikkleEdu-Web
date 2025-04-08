'use client';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation'; // Next.js의 useRouter 및 useParams 사용

import { useRecoilState } from 'recoil';
import { agencyClass } from '@/store/state';
import { useQuery } from 'react-query';
import LoadingModal from '@/component/Common_Component/LoadingModal';

import {
  handleBoardGet,
  handleBoardUpdate,
  handleBoardDelete,
} from '@/fetchAPI/boardAPI';

import Swal from 'sweetalert2';
import BoardHeaderSection from '@/component/Board_Component/BoardHeaderSection';

// Teacher Data Type
type BoardDataType = {
  title: string;
  author: string;
  date: string;
  content: string;
  isPrivate?: boolean;
  authorIdx?: number;
};

const dummyData = {
  title: 'dummy Title',
  author: 'dummy Author',
  date: 'dummy Date',
  content: 'dummy Content',
  isPrivate: false,
  authorIdx: -1,
};

// React Query - 서버에서 데이터를 가져오는 API 함수
const reactQueryFetchBoard = async ({ queryKey }) => {
  const [, id] = queryKey;
  const response = await handleBoardGet({
    boardIdx: id,
  });
  return response.data;
};

const BoardDetail = () => {
  const router = useRouter();
  const params = useParams(); // URL의 동적 파라미터를 가져옴
  const pathname = usePathname(); // 현재 경로 가져오기
  const id = params?.id as string | undefined; // 'id'를 안전하게 추출

  const [agencyType] = useRecoilState(agencyClass);
  const [post, setPost] = useState<BoardDataType>(dummyData);
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleGoBack = (): void => {
    router.push('/board'); // 목록 페이지로 이동
  };

  const boardUpdateHandler = async (): Promise<void> => {
    try {
      const res = await handleBoardUpdate({
        boardIdx: id,
        title,
        content,
      });

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Board Update Success!',
          text: 'Page Reloading...',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // 게시글 페이지로 이동
          router.replace(pathname || ''); // 같은 경로로 replace
          router.refresh(); // fetch와 서버 컴포넌트 강제 새로고침
        });
      } else if (res.status === 403) {
        Swal.fire({
          icon: 'error',
          title: '중복된 이메일입니다',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Board Update Fail',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const boardDeleteHandler = async (): Promise<void> => {
    try {
      if (confirm('삭제 하시겠습니까?') === true) {
        const res = await handleBoardDelete({
          boardIdx: id,
        });

        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Board Delete Success!',
            text: 'Page Reloading...',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // 게시글 페이지로 이동
            router.push('/board');
          });
        } else if (res.status === 403) {
          Swal.fire({
            icon: 'error',
            title: '중복된 이메일입니다',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Board Delete Fail',
          });
        }
      } else return;
    } catch (error) {
      console.error(error);
    }
  };

  // React Query 데이터 가져오기
  const { data, isLoading, error } = useQuery(
    ['boardDetail', id], // Query Key
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
      setPost(data.data[0]);
      setTitle(data.data[0].title);
      setContent(data.data[0].content);
    }
  }, [data]);

  return (
    <MasterContainer>
      {/* 헤더 섹션 */}
      <BoardHeaderSection />
      {/* Loading && Error Handling */}
      {isLoading ? <LoadingModal isOpen={isLoading} /> : null}
      {error ? <div>Error...</div> : null}
      {/* 디테일 섹션 */}
      {updateFlag ? (
        <DetailContainer>
          <DetailHeader>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <MetaData>
              <Author>
                {!post.isPrivate || agencyType === 'admin' ? (
                  post.author
                ) : (
                  <PrivateLabel>비공개</PrivateLabel>
                )}
                {post.isPrivate &&
                post.authorIdx === Number(localStorage.getItem('userIdx'))
                  ? post.author
                  : null}
              </Author>
              <Date>{post.date.split('T')[0]}</Date>
            </MetaData>
          </DetailHeader>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {/* 댓글 섹션 */}
          {agencyType === 'admin' && (
            <CommentSection>
              <CommentTitle>관리자용 답글 입력창</CommentTitle>
              <CommentInput placeholder="개발중인 기능입니다" disabled />
              <Button>등록</Button>
            </CommentSection>
          )}
          <ButtonContainer>
            <Button onClick={boardUpdateHandler}>확인</Button>
            {/* 삭제 섹션 */}
            {agencyType === 'admin' && (
              <Button onClick={() => setUpdateFlag(false)}>취소</Button>
            )}
          </ButtonContainer>
        </DetailContainer>
      ) : (
        <DetailContainer>
          <DetailHeader>
            <Title>
              {!post.isPrivate || agencyType === 'admin' ? (
                post.title
              ) : (
                <PrivateLabel>비공개</PrivateLabel>
              )}
              {post.isPrivate &&
              post.authorIdx === Number(localStorage.getItem('userIdx'))
                ? post.title
                : null}
            </Title>
            <MetaData>
              <Author>
                {!post.isPrivate || agencyType === 'admin' ? (
                  post.author
                ) : (
                  <PrivateLabel>비공개</PrivateLabel>
                )}
                {post.isPrivate &&
                post.authorIdx === Number(localStorage.getItem('userIdx'))
                  ? post.author
                  : null}
              </Author>
              <Date>{post.date.split('T')[0]}</Date>
            </MetaData>
          </DetailHeader>
          <Content>
            {!post.isPrivate || agencyType === 'admin' ? (
              post.content
            ) : (
              <PrivateLabel>비공개</PrivateLabel>
            )}
            {post.isPrivate &&
            post.authorIdx === Number(localStorage.getItem('userIdx'))
              ? post.content
              : null}
          </Content>
          {/* 댓글 */}
          {agencyType === 'admin' && (
            <CommentSection>
              <CommentTitle>관리자용 답글 입력창</CommentTitle>
              <CommentInput placeholder="개발중인 기능입니다" disabled />
              <Button>등록</Button>
            </CommentSection>
          )}
          <ButtonContainer>
            <Button onClick={handleGoBack}>목록</Button>
            {/* 수정 */}
            {agencyType === 'admin' && (
              <Button onClick={() => setUpdateFlag(true)}>수정</Button>
            )}
            {/* 삭제 */}
            {agencyType === 'admin' && (
              <Button onClick={boardDeleteHandler}>삭제</Button>
            )}
          </ButtonContainer>
        </DetailContainer>
      )}
    </MasterContainer>
  );
};

// Styled Components
const MasterContainer = styled.div`
  padding: 1rem;
  background-color: white;

  display: flex;
  flex-direction: column;

  align-items: center;

  min-height: 100vh;
`;

const Title = styled.h1`
  color: #333;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DetailContainer = styled.div`
  width: 80vw;
  margin: 0 auto;
  padding: 2rem 0;

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1rem 0;
  }
`;

const DetailHeader = styled.div`
  background-color: #eaeff7;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
`;

const MetaData = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const Author = styled.span`
  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 600;
`;

const Date = styled.span`
  color: #666;
`;

const PrivateLabel = styled.span`
  display: inline-block;
  background-color: #eaeff7;
  color: #007bff;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  margin-right: 0.5rem;
`;

const Content = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
  line-height: 1.6;

  min-height: 300px;

  white-space: pre-wrap;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
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

const CommentSection = styled.div`
  padding: 1rem;
  margin-top: 2rem;
`;

const CommentTitle = styled.h3`
  margin-bottom: 1rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
`;

const TextArea = styled.textarea`
  border: 1px solid #ddd;
  border-radius: 4px;

  width: 100%;
  min-height: 500px;
  padding: 1.1em; /* prevents text jump on Enter keypress */
  padding-bottom: 0.2em;
  line-height: 1.6;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
`;
export default BoardDetail;
