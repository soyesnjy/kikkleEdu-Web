import Image from 'next/image';

export default function Background({ imgPath, imgAlt }) {
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
    />
  );
}
