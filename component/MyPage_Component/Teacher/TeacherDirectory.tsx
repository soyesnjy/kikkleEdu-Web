import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import { mobile } from '@/store/state';

import { useQuery } from 'react-query';
import { handleDirectoryRead } from '@/fetchAPI/directoryAPI';

const titleMap = {
  music: '수업 음원 자료',
  video: '수업 영상 자료',
  class: '수업 강의 계획서',
};

// Props Type
type PropsType = {
  activeTab: string; // 관리자 탭 식별자 state
};

const TeacherDirectory = ({ activeTab }: PropsType) => {
  const [path, setPath] = useState([null]); // 폴더 Depth 경로
  const [selectedItems, setSelectedItems] = useState(0); // 선택된 아이템 Idx
  const [fileData, setFileData] = useState({ url: '' }); // File 데이터
  const [audioKey, setAudioKey] = useState(0); // 리렌더링 트리거

  const mobileFlag = useRecoilValue(mobile);

  // activeTab 값이 변경될 경우 state 초기화
  useEffect(() => {
    setFileData({ url: '' });
    setPath([null]);
    setSelectedItems(0);
  }, [activeTab]);

  // React Query - 서버에서 데이터를 가져오는 API 함수
  const reactQueryFetchDirectory = async ({ queryKey }) => {
    const [, activeTab] = queryKey;
    // activeTab에 해당되는 모든 폴더, 파일 데이터 요청
    const res = await handleDirectoryRead({ form: activeTab });
    const data = res.data;

    const formattedData = data.directories.map((dir) => ({
      ...dir,
      // 파일인 경우 url 속성 추가
      url:
        dir.kk_directory_type === 'file'
          ? data.tracks.find(
              (track) => track.kk_directory_idx === dir.kk_directory_idx
            )?.kk_file_path
          : null,
    }));

    return formattedData;
  };
  // React Query 데이터 가져오기
  const { data, isLoading, error } = useQuery(
    ['shareData', activeTab], // Query Key
    reactQueryFetchDirectory, // Query Function
    {
      // 유효한 값일 경우만 실행
      enabled: ['music', 'video', 'class'].includes(activeTab),
      staleTime: 5000, // 5초 동안 상태 유지
      cacheTime: 10000, // 10초 동안 캐시 유지
      keepPreviousData: true, // 데이터를 가져오는 동안 기존 데이터 유지
    }
  );

  // 파일 및 폴더 Click Handler
  const handleItemClick = (item): void => {
    // 폴더 Click
    if (item.kk_directory_type === 'directory') {
      setPath([...path, item.kk_directory_idx]);
      setFileData({ url: '' }); // 파일 데이터 초기화
    }
    // 파일 Click
    else {
      setFileData(item);
      setSelectedItems(item.kk_directory_idx);
      setAudioKey((prevKey) => prevKey + 1);
    }
  };
  // 뒤로가기 Click Handler
  const handleBackClick = (): void => {
    setPath(path.slice(0, -1));
    setSelectedItems(0);
    setFileData({ url: '' });
  };

  // 현재 폴더의 자식요소
  const currentItems = useMemo(
    () =>
      data?.filter(
        (item) => item.kk_directory_parent_idx === path[path.length - 1]
      ) || [],
    [data, path]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <Container>
      <Title>{titleMap[activeTab]}</Title>
      <DirctoryUl>
        {/* Root 폴더가 아닌 경우에만 뒤로가기 버튼 추가 */}
        {path.length !== 1 && (
          <BackButton onClick={handleBackClick}>{`Back`}</BackButton>
        )}
        {/* 현재 폴더 자식요소 */}
        {currentItems.map((item, index) => (
          <DirctoryLi
            key={index}
            selected={item.kk_directory_idx === selectedItems}
            onClick={() => handleItemClick(item)}
          >
            <DirctoryName>{item.kk_directory_name}</DirctoryName>
          </DirctoryLi>
        ))}
      </DirctoryUl>
      {/* 파일을 클릭한 경우 */}
      {fileData.url && (
        <TrackContainer>
          {activeTab === 'video' ? (
            <iframe
              key={audioKey}
              src={fileData.url}
              allowFullScreen
              allow="fullscreen"
              style={
                mobileFlag
                  ? {
                      width: '100%',
                      height: '250px',
                      border: 'none',
                    }
                  : {
                      width: '100vw',
                      maxWidth: '1080px',
                      height: '360px',
                      border: 'none',
                    }
              }
            />
          ) : (
            <iframe
              key={audioKey}
              src={fileData.url}
              width={mobileFlag ? '100%' : '450'}
              height={mobileFlag ? '130' : '70'}
            />
          )}
        </TrackContainer>
      )}
    </Container>
  );
};

type ListItemType = {
  type?: string;
  selected?: boolean;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DirctoryUl = styled.ul`
  width: 500px;
  list-style: none;
  padding: 1rem;
  border: 1px solid green;
  border-radius: 24px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const DirctoryLi = styled.li<ListItemType>`
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

const TrackContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

const Title = styled.h1`
  width: 500px;
  background-color: #378e56;
  color: white;

  padding: 1rem;

  border-radius: 20px;

  font-size: 2rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// const AudioPlayer = styled.audio`
//   width: 100%;
//   margin-top: 20px;
// `;

export default TeacherDirectory;
