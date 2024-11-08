import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);

  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      // Safari support
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      // IE11 support
      videoRef.current.msRequestFullscreen();
    }
  };

  return (
    <VideoContainer>
      <StyledVideo ref={videoRef} controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support HTML5 video.
      </StyledVideo>
      {/* <FullscreenButton onClick={handleFullscreen}>전체화면</FullscreenButton> */}
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  width: 100%;
  position: relative;
  /* max-width: 800px; */
  margin: auto;
  background-color: #000;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
`;

const FullscreenButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

export default VideoPlayer;
