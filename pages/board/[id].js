import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Next.js의 useRouter 사용
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { agencyClass } from '../../store/state';
import { handleBoardGet } from '@/fetchAPI/boardAPI';
import { handleBoardDelete } from '@/fetchAPI/boardAPI';
import Swal from 'sweetalert2';

const dummyData = {
  title: 'dummy Title',
  author: 'dummy Author',
  date: 'dummy Date',
  content: 'dummy Content',
};

const BoardDetail = () => {
  const router = useRouter();
  const { id } = router.query; // URL의 동적 파라미터를 가져옴
  const [post, setPost] = useState(dummyData);
  const [agencyType, setAgencyType] = useRecoilState(agencyClass);

  useEffect(() => {
    if (id) {
      handleBoardGet({ boardIdx: id })
        .then((res) => res.data)
        .then((data) => {
          setPost(data.data[0]);
        });
    }
  }, [id]);

  const handleGoBack = () => {
    router.push('/board'); // 목록 페이지로 이동
  };

  const boardDeleteHandler = async () => {
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

  return (
    <MasterContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Title>Kids Class edu</Title>
          <Subtitle>문의 하기</Subtitle>
          <Description>
            소예키즈에서 제공하는 다양한 공지와 질문을 편하게 적어주세요
          </Description>
          <HeaderIntroDiv>
            소예키즈 소개 - <GreenColorSpan>게시판</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
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
        {/* 댓글 섹션 */}
        {agencyType === 'admin' && (
          <CommentSection>
            <CommentTitle>관리자용 답글 입력창</CommentTitle>
            <CommentInput placeholder="개발중인 기능입니다" disabled />
            <Button>등록</Button>
          </CommentSection>
        )}
        <ButtonContainer>
          <Button onClick={handleGoBack}>목록</Button>
          {/* 삭제 섹션 */}
          {agencyType === 'admin' && (
            <Button onClick={boardDeleteHandler}>삭제</Button>
          )}
        </ButtonContainer>
      </DetailContainer>
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

const HeaderSection = styled.section`
  width: 80vw;
  min-height: 21vw;
  position: relative;

  background-image: url('/src/Introduce_IMG/Introduce_Header_Background_IMG.png');
  background-size: contain;
  background-position: center;
  /* background-repeat: no-repeat; */
  background-color: #f4eee5;

  padding: 0 4rem 0 4rem;
  border-radius: 24px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 90vw;
    min-height: 300px;
    padding: 0 2rem;
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
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

const Subtitle = styled.h2`
  color: #333;

  font-size: 2.2rem;
  font-family: Pretendard;
  font-weight: 700;
`;

const Description = styled.p`
  color: white;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 400;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderIntroDiv = styled.div`
  width: fit-content;
  padding: 1rem 1.5rem;

  position: absolute;
  bottom: 0;
  right: 3rem;

  background-color: white;
  border-radius: 25px 25px 0 0;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 600;
`;

const GreenColorSpan = styled.span`
  color: #45b26b;
  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 600;
`;

const DetailContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0;

  @media (max-width: 768px) {
    width: 95%;
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

export default BoardDetail;
