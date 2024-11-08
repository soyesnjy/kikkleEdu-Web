import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const VideoPlayer = ({ videoUrl, mobileFlag }) => {
  const videoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.webkitEnterFullScreen) {
        videoRef.current.webkitEnterFullScreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const onFullscreenChange = () => {
    const fullscreenElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
    setIsFullscreen(!!fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('msfullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        onFullscreenChange
      );
      document.removeEventListener('msfullscreenchange', onFullscreenChange);
    };
  }, []);

  return (
    <VideoContainer>
      <iframe
        ref={videoRef}
        src={videoUrl}
        allowFullScreen
        allow="fullscreen"
        width={mobileFlag ? '360' : '450'}
        height="270"
      />
      <FullscreenButton onClick={handleFullscreen} isFullscreen={isFullscreen}>
        {isFullscreen ? '전체화면 해제' : '전체화면'}
      </FullscreenButton>
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  background-color: #000;
`;

const FullscreenButton = styled.button`
  position: ${({ isFullscreen }) => (isFullscreen ? 'fixed' : 'absolute')};
  bottom: ${({ isFullscreen }) => (isFullscreen ? '20px' : '10px')};
  right: ${({ isFullscreen }) => (isFullscreen ? '20px' : '10px')};
  z-index: 9999;
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

  @media (max-width: 768px) {
    bottom: ${({ isFullscreen }) => (isFullscreen ? '10%' : '-10%')};
    right: ${({ isFullscreen }) => (isFullscreen ? '10%' : '38%')};
  }
`;

export default VideoPlayer;
