import Image from 'next/image';
import React from 'react';

// Home Page Props Type 지정
type BackgroundProps = {
  imgPath: string;
  imgAlt: string;
};

const Background = ({ imgPath, imgAlt }: BackgroundProps) => {
  return (
    <Image
      alt={imgAlt}
      src={imgPath}
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }}
      priority={true}
    />
  );
};

export default Background;
