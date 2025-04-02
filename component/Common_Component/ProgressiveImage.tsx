/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

const ProgressiveImage = ({
  profileImg,
  alt,
  mobile,
}: {
  profileImg: string;
  alt: string;
  mobile?: boolean;
}) => {
  const [isOriginalLoaded, setIsOriginalLoaded] = useState(false);

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
      {/* 썸네일 이미지 */}
      <img
        src={`/loding.gif`}
        alt={`${alt} (thumbnail)`}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: isOriginalLoaded ? 'blur(1px)' : 'none',
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
      {/* 원본 이미지 */}
      <img
        src={profileImg}
        alt={alt}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isOriginalLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
        onLoad={() => setIsOriginalLoaded(true)}
      />
    </div>
  );

  // return (
  //   <div
  //     style={{
  //       position: 'relative',
  //       width: `${mobile ? '310px' : '390px'}`,
  //       height: `${mobile ? '410px' : '618px'}`,
  //       borderRadius: '24px',
  //       overflow: 'hidden',
  //     }}
  //   >
  //     {/* 썸네일 (백업용, 빠르게 뜨는 이미지) */}
  //     <Image
  //       src={thumbnailSrc}
  //       alt={`${alt} (thumbnail)`}
  //       fill
  //       style={{
  //         objectFit: 'cover',
  //         filter: isOriginalLoaded ? 'blur(1px)' : 'none',
  //         transition: 'opacity 0.3s ease-in-out',
  //       }}
  //       priority
  //     />
  //     {/* 원본 이미지 */}
  //     <Image
  //       src={originalSrc}
  //       alt={alt}
  //       fill
  //       style={{
  //         objectFit: 'cover',
  //         opacity: isOriginalLoaded ? 1 : 0,
  //         transition: 'opacity 0.5s ease-in-out',
  //       }}
  //       onLoadingComplete={() => setIsOriginalLoaded(true)}
  //     />
  //   </div>
  // );
};

export default ProgressiveImage;
