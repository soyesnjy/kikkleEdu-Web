/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

// import { useSession } from "next-auth/react";

const VideoModal = ({ isOpen, onRequestClose, videoId }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isPending, setIsPending] = useState(false);
  // const { data: session } = useSession();
  //   useEffect(() => {
  //     if (session && videoId) {
  //       fetch(
  //         `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=player&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session.accessToken}`,
  //           },
  //         }
  //       )
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (data.items && data.items.length > 0) {
  //             setVideoUrl(data.items[0].player.embedHtml);
  //           } else {
  //             console.error("Failed to fetch video data:", data);
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching video:", error);
  //         });
  //     }
  //   }, [session, videoId]);

  useEffect(() => {
    if (videoId) {
      setIsPending(true);
      fetch(`${process.env.NEXT_PUBLIC_URL}/openAI/youtube/${videoId}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data) {
            setVideoUrl(data.player.embedHtml);
            setIsPending(false);
          } else {
            console.error('Failed to fetch video data:', data);
          }
        })
        .catch((error) => {
          console.error('Error fetching video:', error);
        });
    } else setVideoUrl('');
  }, [videoId]);

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Video Modal"
      ariaHideApp={false}
    >
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <ModalContent dangerouslySetInnerHTML={{ __html: videoUrl }} />
      )}
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 640px;
  height: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  outline: none;
  z-index: 1;
`;

const ModalContent = styled.div`
  iframe {
    width: 100%;
    height: 360px;
  }
  min-height: 360px;
  z-index: 1;
`;

export default VideoModal;
