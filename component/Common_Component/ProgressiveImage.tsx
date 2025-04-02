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
        width: `${mobile ? '310px' : '390px'}`,
        height: `${mobile ? '410px' : '618px'}`,
        borderRadius: '24px',
        overflow: 'hidden',
      }}
    >
      {/* 썸네일 (백업용, 빠르게 뜨는 이미지) */}
      <Image
        src={thumbnailSrc}
        alt={`${alt} (thumbnail)`}
        fill
        style={{
          objectFit: 'cover',
          filter: isOriginalLoaded ? 'blur(10px)' : 'none',
          transition: 'opacity 0.3s ease-in-out',
        }}
        priority
      />
      {/* 원본 이미지 */}
      <Image
        src={originalSrc}
        alt={alt}
        fill
        style={{
          objectFit: 'cover',
          opacity: isOriginalLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
        onLoadingComplete={() => setIsOriginalLoaded(true)}
      />
    </div>
  );
};

export default ProgressiveImage;
