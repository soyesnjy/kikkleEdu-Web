/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Image from 'next/image';

const ProgressiveImage = ({
  fileId,
  alt,
  mobile,
}: {
  fileId: string;
  alt: string;
  mobile?: boolean;
}) => {
  const [isOriginalLoaded, setIsOriginalLoaded] = useState(false);

  const thumbnailSrc = `https://drive.google.com/thumbnail?id=${fileId}`;
  const originalSrc = `https://drive.google.com/uc?export=view&id=${fileId}`;

  return (
    <div
      style={{
        position: 'relative',
        width: mobile ? '310px' : '390px',
        height: mobile ? '410px' : '618px',
        borderRadius: '24px',
        overflow: 'hidden',
      }}
    >
      {/* 썸네일 이미지: <img /> 사용 */}
      <img
        src={thumbnailSrc}
        alt={`${alt} (thumbnail)`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: isOriginalLoaded ? 'blur(10px)' : 'none',
          transition: 'opacity 0.3s ease-in-out',
          borderRadius: '24px',
        }}
      />

      {/* 원본 이미지: Next/Image */}
      <Image
        src={originalSrc}
        alt={alt}
        fill
        style={{
          objectFit: 'cover',
          opacity: isOriginalLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          borderRadius: '24px',
        }}
        onLoadingComplete={() => setIsOriginalLoaded(true)}
      />
    </div>
  );
};

export default ProgressiveImage;
