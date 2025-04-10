// app/program/loading.tsx
'use client';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

const SkeletonBox = styled.div`
  width: 80%;
  height: 200px;
  margin-top: 2rem;
  border-radius: 8px;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

export default function ProgramLoading() {
  return (
    <Wrapper>
      <SkeletonBox />
      <SkeletonBox />
      <SkeletonBox />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
