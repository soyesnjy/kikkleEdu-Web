import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const AudioPlayerButton = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(src));

  // 재생 종료 시 isPlaying 원상태 복구
  audioRef.current.addEventListener("ended", () => {
    setIsPlaying(!isPlaying);
  });

  // 음성 재생 상태 변화에 따른 처리
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    // 컴포넌트가 언마운트될 때 오디오 정리
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, [isPlaying]);

  return (
    <Button
      onClick={() => {
        setIsPlaying(!isPlaying);
      }}
    >
      {isPlaying ? (
        <span class="material-symbols-outlined">stop_circle</span>
      ) : (
        <span class="material-symbols-outlined">play_circle</span>
      )}
    </Button>
  );
};

const Button = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default AudioPlayerButton;
