import { useState, useEffect } from 'react';
import styled from 'styled-components';
import UploadForm from './UploadForm'; // 새로운 업로드 폼 컴포넌트
import UploadFormDir from './UploadFormDir';
import DeleteForm from './DeleteForm';
import { useQuery } from 'react-query';

import { useRecoilState } from 'recoil';
import { agencyClass, mobile } from '@/store/state';
import { handleDirectoryRead } from '@/fetchAPI/directoryAPI';

const titleMap = {
  music: '수업 음원 자료',
  video: '수업 영상 자료',
  class: '수업 강의 계획서',
};

// React Query - 서버에서 데이터를 가져오는 API 함수
const reactQueryFetchEvent = async ({ queryKey }) => {
  const [, activeTab] = queryKey;
  const res = await handleDirectoryRead({ form: activeTab });
  const data = res.data;

  const formattedData = data.directories.map((dir) => ({
    ...dir,
    url:
      dir.kk_directory_type === 'file'
        ? data.tracks.find(
            (track) => track.kk_directory_idx === dir.kk_directory_idx
          )?.kk_file_path
        : null,
  }));

  return formattedData;
};

// Props Type
type PropsType = {
  activeTab: string; // 관리자 탭 식별자 state
};

const Directory = ({ activeTab }: PropsType) => {
  const [trackData, setTrackData] = useState({ url: '' });
  const [path, setPath] = useState([null]); // root path with null
  const [items, setItems] = useState([]);
  const [selecteditems, setSelecteditems] = useState(0);
  const [isRoot, setIsRoot] = useState(true);
  const [audioKey, setAudioKey] = useState(0); // unique key for AudioPlayer

  const [agencyType] = useRecoilState(agencyClass);
  const [mobileFlag] = useRecoilState(mobile);

  // React Query 데이터 가져오기
  const { data, isLoading, error } = useQuery(
    ['shareData', activeTab], // Query Key
    reactQueryFetchEvent, // Query Function
    {
      enabled: activeTab !== '', // 유효한 값일 때만 실행
      staleTime: 5000, // 5초 동안 신선한 상태 유지
      cacheTime: 60 * 60 * 1000, // 1시간 동안 캐시 유지
      keepPreviousData: true, // 데이터를 가져오는 동안 기존 데이터 유지
    }
  );

  useEffect(() => {
    // 현재 폴더의 아이템 요소 갱신
    if (data) {
      const currentParentId = path[path.length - 1];
      const currentItems = data.filter(
        (item) => item.kk_directory_parent_idx === currentParentId
      );
      setItems(currentItems);
      setIsRoot(path.length === 1); // path가 1인 경우 Root
    }
  }, [path, data]);

  // 파일 및 폴더 Click Handler
  const handleItemClick = (item) => {
    // 폴더
    if (item.kk_directory_type === 'directory') {
      setPath([...path, item.kk_directory_idx]);
      setTrackData({ url: '' });
    }
    // 파일
    else {
      setTrackData(item);
      setSelecteditems(item.kk_directory_idx);
      setAudioKey((prevKey) => prevKey + 1); // change key to re-render AudioPlayer
    }
  };

  // 뒤로가기 Click Handler
  const handleBackClick = () => {
    setPath(path.slice(0, -1));
    setSelecteditems(0);
    setTrackData({ url: '' });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <Container>
      <Title>{titleMap[activeTab]}</Title>
      {/* 관리자 전용 자료 생성 폼 */}
      {agencyType === 'admin' && (
        <UploadContainer>
          <UploadForm
            directories={data.filter(
              (item) => item.kk_directory_type === 'directory'
            )}
            form={activeTab}
          />
          <UploadFormDir
            directories={data.filter(
              (item) => item.kk_directory_type === 'directory'
            )}
            form={activeTab}
          />
          <DeleteForm directories={data} form={activeTab} />
        </UploadContainer>
      )}
      <List>
        {/* Root 폴더가 아닌 경우에만 뒤로가기 버튼 추가 */}
        {!isRoot && <BackButton onClick={handleBackClick}>Back</BackButton>}
        {items.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => handleItemClick(item)}
            type={item.kk_directory_type}
            selected={item.kk_directory_idx === selecteditems}
          >
            <StyledLink>{item.kk_directory_name}</StyledLink>
          </ListItem>
        ))}
      </List>
      {trackData.url && (
        <TrackContainer>
          {activeTab === 'video' ? (
            <iframe
              key={audioKey}
              src={trackData.url}
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
              src={trackData.url}
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

const UploadContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const List = styled.ul`
  width: 500px;
  list-style: none;
  padding: 1rem;
  border: 1px solid green;
  border-radius: 24px;

  @media (max-width: 768px) {
    min-width: 390px;
    width: 100%;
    padding: 1rem;
  }
`;

const ListItem = styled.li<ListItemType>`
  margin: 5px 0;
  padding: 0.5rem;

  background-color: ${(props) => (props.selected ? '#398E56' : '#45b26b')};

  border-radius: 24px;

  cursor: pointer;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: center;

  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledLink = styled.a`
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

export default Directory;
