/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes } from 'styled-components';
import { FlexContainer } from '../styled-component/common';

import { useEffect, useState, useCallback } from 'react';

// 아바타 관련 전역 변수
import { useRecoilState } from 'recoil';
import { log } from '../store/state';

import Review from '@/component/Review_Component/Review';
import LoadingAnimation from '@/component/Chat_Component/LoadingAnimation';
import ReviewForm from '@/component/Review_Component/ReviewForm';
import Swal from 'sweetalert2';

import {
  handleReviewGet,
  handleReviewCreate,
  handleReviewDelete,
  handleReviewUpdate,
} from '@/fetchAPI/reviewAPI';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Renewel Test 페이지
export default function Test() {
  const [isPending, setIsPending] = useState(true);
  const [login, setLogin] = useRecoilState(log);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 무한 스크롤 트리거 state

  const router = useRouter();

  const handleScroll = useCallback(() => {
    // 문서 높이, 뷰포트 높이, 스크롤 위치를 계산
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.offsetHeight;

    // 스크롤이 바닥에 도달했는지 확인 (여유분을 두어 조금 더 일찍 호출)
    if (scrollTop + windowHeight >= fullHeight && !isPending && hasMore) {
      // 추가로 가져올 리뷰 데이터 요청 API 메서드 호출
      setIsPending(true);
      setPage(page + 1);
    }
  }, [isPending, hasMore, page]);

  // Create 핸들러
  const onSubmit = async (formData) => {
    const res = await handleReviewCreate(formData);
    return res.status === 200;
  };

  // Delete 핸들러
  const onDelete = async (key) => {
    const res = await handleReviewDelete(
      `${process.env.NEXT_PUBLIC_URL}/review/${key}`
    );
    return res.status === 200;
  };

  // Update 핸들러
  const onUpdate = async (updateData) => {
    const res = await handleReviewUpdate(updateData);
    return res.status === 200;
  };

  // Read useEffect
  useEffect(() => {
    console.log('page: ' + page);
    // Read
    handleReviewGet(`${process.env.NEXT_PUBLIC_URL}/review?page=${page}`)
      .then((res) => res.data)
      .then((data) => {
        // READ API 반환 Data가 없을 경우
        if (data.reviewData.length === 0) {
          // 무한 스크롤 조절 state => false
          setHasMore(false);
          setIsPending(false);
        } else {
          setTimeout(() => {
            setReviews([...reviews, ...data.reviewData]);
            setIsPending(false);
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Loading Fail',
          text: 'ㅠㅠ',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setIsPending(false);
        });
      });
  }, [page]);

  // 로그인 권한이 없는 상태에서의 접근 시 login 페이지로 redirect
  useEffect(() => {
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (!loginSession) {
      router.replace('/login');
    }
  }, [login]);

  // 무한스크롤 useCallback 함수 관련 이벤트 추가
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <MainContainer>
      <FlexContainer
        justify="flex-start"
        align="center"
        dir="col"
        width="100vw"
      >
        <ReviewContainer>
          <h1>Soyes AI Project</h1>
          <h2>Review Page</h2>
          {/* 리뷰 입력 폼 */}
          <ReviewForm onSubmit={onSubmit} />
          {/* 리뷰 데이터 */}
          {reviews.map((review, index) => (
            <Review
              key={index}
              review={review}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
          {/* 무한 스크롤 갱신 로딩바 */}
          {isPending && <LoadingAnimation />}
        </ReviewContainer>
      </FlexContainer>
    </MainContainer>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['review', 'nav'])),
    },
  };
}

const MainContainer = styled.div`
  background-image: url('/src/img.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  width: 100%;
  min-height: 100vh;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReviewContainer = styled.div`
  width: 80vw;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 2rem;

  min-height: 80vh;
  align-items: center;
  padding-top: 5%;
  color: white;

  @media (max-width: 768px) {
    margin-top: 3rem;
  }
`;
