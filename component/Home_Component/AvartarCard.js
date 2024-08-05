import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { avarta } from '../../store/state';

const avatarArr = [
  { name: 'soyes', imgUrl: '/src/AvatarCard_IMG/charc_soyes.png' },
  { name: 'lala', imgUrl: '/src/AvatarCard_IMG/charc_ella.png' },
  { name: 'pupu', imgUrl: '/src/AvatarCard_IMG/charc_pupu.png' },
  { name: 'ubi', imgUrl: '/src/AvatarCard_IMG/charc_ubi.png' },
  { name: 'north', imgUrl: '/src/AvatarCard_IMG/charc_north.png' },
];

const AvartarCard = () => {
  const [avartaAI, setAvartaAI] = useRecoilState(avarta);

  return (
    <AvartarCardContainer>
      {avatarArr.map((avatar, index) => {
        return (
          <Link href="/avartar_intro" key={index}>
            <Image
              src={avatar.imgUrl}
              alt={avatar.name}
              width={220}
              height={280}
              style={{ maxWidth: '100%', height: 'auto' }}
              onClick={() => {
                setAvartaAI(avatar.name);
                localStorage.setItem('avarta', avatar.name);
              }}
            />
          </Link>
        );
      })}
    </AvartarCardContainer>
  );
};

const AvartarCardContainer = styled.div`
  max-width: 80vw;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
    max-width: 100%;
  }
`;

export default AvartarCard;
