/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MediaRow = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (videoId) {
      fetch(`${process.env.NEXT_PUBLIC_URL}/openAI/youtube/${videoId}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data) {
            setVideoUrl(data.player.embedHtml);
          } else {
            console.error('Failed to fetch video data:', data);
          }
        })
        .catch((error) => {
          console.error('Error fetching video:', error);
        });
    } else setVideoUrl('');
  }, [videoId]);

  return <ModalContent dangerouslySetInnerHTML={{ __html: videoUrl }} />;
};

const ModalContent = styled.div`
  width: 100%;
  iframe {
    width: 100%;
    height: 360px;
  }
  min-height: 360px;
  z-index: 1;
`;

export default MediaRow;
