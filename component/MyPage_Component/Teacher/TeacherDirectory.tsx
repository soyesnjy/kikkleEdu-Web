import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useQuery } from 'react-query';
import { handleDirectoryRead } from '@/fetchAPI/directoryAPI';
import LoadingModal from '@/component/Common_Component/LoadingModal';

const titleMap = {
  music: '수업 음원 자료',
  video: '수업 영상 자료',
  class: '수업 강의 계획서',
};

// Track Data Type
type ItemType = {
  kk_directory_idx: number;
  kk_directory_parent_idx?: number;
  kk_directory_name: string;
  kk_directory_type: string;
  url?: string;
};

// Props Type
type PropsType = {
  activeTab: string; // 관리자 탭 식별자 state
};

const TeacherDirectory = ({ activeTab }: PropsType) => {
  const [dirDepthStack, setDirDepthStack] = useState([null]); // Directory Depth Stack
  const [selectedItems, setSelectedItems] = useState(0); // 선택된 아이템 Idx
  const [itemUrl, setItemUrl] = useState<string>(''); // Item Url
  const [audioKey, setAudioKey] = useState(0); // 리렌더링 트리거

  // activeTab 값이 변경될 경우 state 초기화
  useEffect(() => {
    setItemUrl('');
    setDirDepthStack([null]);
    setSelectedItems(0);
  }, [activeTab]);

  // React Query - 서버에서 데이터를 가져오는 API 함수
  const reactQueryFetchDirectory = async ({ queryKey }) => {
    const [, activeTab, parentIdx] = queryKey;
    const res = await handleDirectoryRead({ form: activeTab, parentIdx });
    const { status, message, data } = res;

    // Error Handling
    if (status !== 200) {
      alert(message);
    }

    return data.directories;
  };

  // React Query 데이터 가져오기
  const {
    data: currentItems,
    isLoading,
    error,
  } = useQuery(
    ['shareData', activeTab, dirDepthStack[dirDepthStack.length - 1] || null],
    reactQueryFetchDirectory,
    {
      enabled: ['music', 'video', 'class'].includes(activeTab),
      staleTime: 5000, // 5초 동안 상태 유지
      cacheTime: 10000, // 10초 동안 캐시 유지
    }
  );

  // 파일 및 폴더 Click Handler
  const handleItemClick = (item: ItemType): void => {
    // 폴더 Click
    if (item.kk_directory_type === 'directory') {
      setDirDepthStack([...dirDepthStack, item.kk_directory_idx]);
      setItemUrl(''); // 파일 데이터 초기화
    }
    // 파일 Click
    else {
      setItemUrl(item.url);
      setSelectedItems(item.kk_directory_idx);
      setAudioKey((prevKey) => prevKey + 1);
    }
  };
  // 뒤로가기 Click Handler
  const handleBackClick = (): void => {
    setDirDepthStack(dirDepthStack.slice(0, -1));
    setSelectedItems(0);
    setItemUrl('');
  };

  if (isLoading) return <LoadingModal isOpen={isLoading} />;
  if (error) return <div>Error...</div>;

  return (
    <Container>
      <Title>{titleMap[activeTab]}</Title>
      <DirctoryUl>
        {/* Non Root Directory => BackButton */}
        {dirDepthStack.length !== 1 && (
          <BackButton onClick={handleBackClick}>{`Back`}</BackButton>
        )}
        {/* Directory Items */}
        {currentItems.map((item, index) => (
          <DirctoryItem
            key={index}
            selected={item.kk_directory_idx === selectedItems}
            onClick={() => handleItemClick(item)}
          >
            <DirctoryName>{item.kk_directory_name}</DirctoryName>
          </DirctoryItem>
        ))}
      </DirctoryUl>
      {/* File Click */}
      {itemUrl && (
        <>
          {activeTab === 'video' ? (
            <VideoIframe
              key={audioKey}
              src={itemUrl}
              allowFullScreen
              allow="fullscreen"
            />
          ) : (
            <CommonIframe key={audioKey} src={itemUrl} />
          )}
        </>
      )}
    </Container>
  );
};

type DirctoryItemType = {
  type?: string;
  selected?: boolean;
};

const Container = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DirctoryUl = styled.ul`
  width: 500px;
  padding: 1rem;

  border: 1px solid green;
  border-radius: 24px;

  list-style: none;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const DirctoryItem = styled.li<DirctoryItemType>`
  margin: 5px 0;
  padding: 0.5rem;

  background-color: ${(props) => (props.selected ? '#398E56' : '#45b26b')};
  border-radius: 1rem;

  cursor: pointer;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: center;

  transition: 0.5s;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DirctoryName = styled.span`
  text-decoration: none;
  color: white;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;

  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 1rem;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: center;

  cursor: pointer;
`;

const Title = styled.h1`
  width: 500px;
  padding: 1rem;

  background-color: #378e56;
  color: white;
  border-radius: 20px;

  font-size: 2rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const VideoIframe = styled.iframe`
  width: 960px;
  height: 540px;
  border: none;

  @media (max-width: 1080px) {
    width: 100%;
    height: 100vh;
    border: none;
  }

  @media (max-width: 768px) {
    width: 95vw;
    height: 62vw;
    border: none;
  }
`;

const CommonIframe = styled.iframe`
  width: 450px;
  height: 70px;
  border: none;

  @media (max-width: 768px) {
    width: 100%;
    height: 130px;
    border: none;
  }
`;

export default TeacherDirectory;
