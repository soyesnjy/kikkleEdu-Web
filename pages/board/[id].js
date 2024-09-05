import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Next.js의 useRouter 사용
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { agencyClass } from '../../store/state';
import { handleBoardGet } from '@/fetchAPI/boardAPI';

const dummyData = {
  title: 'dummy Title',
  author: 'dummy Author',
  date: 'dummy Date',
  content: 'dummy Content',
};

const BoardDetail = () => {
  const router = useRouter();
  const { id } = router.query; // URL의 동적 파라미터를 가져옴
  const [post, setPost] = useState(null);
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

  if (!post) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }

  return (
    <MasterContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Title>Kids Class edu</Title>
          <Subtitle>문의 하기</Subtitle>
          <Description>
            Lorem ipsum dolor sit amet veli elitni legro int dolor.
          </Description>
          <HeaderIntroDiv>
            소예키즈 소개 - <GreenColorSpan>게시판</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
      <DetailContainer>
        <DetailHeader>
          <Title>{post.title}</Title>
          <MetaData>
            <Author>{post.author}</Author>
            <Date>{post.date.split('T')[0]}</Date>
          </MetaData>
        </DetailHeader>
        <Content>{post.content}</Content>
        <ButtonContainer>
          <Button onClick={handleGoBack}>목록</Button>
        </ButtonContainer>
        {/* 댓글 섹션 */}
        {agencyType === 'admin' && (
          <CommentSection>
            <CommentTitle>관리자용 답글 입력창</CommentTitle>
            <CommentInput placeholder="관리자용 답글 입력창" disabled />
            <Button>등록</Button>
          </CommentSection>
        )}
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
  min-height: 327px;
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
  font-family: Nunito;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  color: #333;

  font-size: 2.2rem;
  font-family: Pretendard;
  font-weight: 700;
`;

const Description = styled.p`
  color: #666;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 400;
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
  font-weight: bold;
`;

const Date = styled.span`
  color: #666;
`;

const Content = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
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
  border-top: 1px solid #ddd;
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
