import React from "react";
import styled, { keyframes } from "styled-components";

const bounceAnimation = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`;

const LoadingDots = styled.div`
  padding: 1rem;
  margin: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 5px;
  background-color: #007bff;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounceAnimation} 1.4s infinite ease-in-out both;
  animation-delay: ${(props) => props.delay};
`;

const LoadingAnimation = () => (
  <LoadingDots>
    <Dot delay="0s" />
    <Dot delay=".2s" />
    <Dot delay=".4s" />
  </LoadingDots>
);

export default LoadingAnimation;
