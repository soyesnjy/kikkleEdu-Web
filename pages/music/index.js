import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Directory from '../../component/Music_Component/Directory';
import { handleDirectoryRead } from '@/fetchAPI/directory';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function MusicHome() {
  const [data, setData] = useState([]);

  // 음원 디렉토리 구조 초기화 메서드
  const initMusicDirectory = async () => {
    const data = await handleDirectoryRead();
    const formattedData = data.directories.map((dir) => ({
      ...dir,
      url:
        dir.kk_directory_type === 'file'
          ? data.tracks.find(
              (track) => track.kk_directory_idx === dir.kk_directory_idx
            )?.kk_file_path
          : null,
    }));
    setData([...formattedData]);
  };

  useEffect(() => {
    initMusicDirectory();
  }, []);

  return (
    <MainContainer>
      <Title>Music Test Page</Title>
      <Directory data={data} />
    </MainContainer>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['nav'])),
    },
  };
}

const MainContainer = styled.div`
  padding-top: 5rem;
  width: 100vw;
  min-height: 100vh;
  background-color: white;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    background-image: url('/src/Background_IMG/Mobile/mobile_background_2.png');
    justify-content: center;
  }
`;

const Title = styled.h1`
  background-color: #4caf50;
  color: white;
  padding: 10px;
`;
