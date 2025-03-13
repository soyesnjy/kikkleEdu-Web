import { useState, useEffect } from 'react';
import styled from 'styled-components';
import UploadForm from './UploadForm'; // 새로운 업로드 폼 컴포넌트
import UploadFormDir from './UploadFormDir';
import DeleteForm from './DeleteForm';

import { useRecoilState } from 'recoil';
import { agencyClass, mobile } from '@/store/state';

const titleMap = {
  music: '수업 음원 자료',
  video: '수업 영상 자료',
  class: '수업 강의 계획서',
};

const Directory = ({ data, form }) => {
  const [path, setPath] = useState([null]); // root path with null
  const [items, setItems] = useState([]);
  const [selecteditems, setSelecteditems] = useState(0);
  const [isRoot, setIsRoot] = useState(true);
  const [trackData, setTrackData] = useState({});
  const [audioKey, setAudioKey] = useState(0); // unique key for AudioPlayer
  const [agencyType] = useRecoilState(agencyClass);
  const [mobileFlag] = useRecoilState(mobile);
  // const [videoUrl, setVideoUrl] = useState();

  useEffect(() => {
    const currentParentId = path[path.length - 1];
    const currentItems = data.filter(
      (item) => item.kk_directory_parent_idx === currentParentId
    );
    setItems(currentItems);
    setIsRoot(path.length === 1);
  }, [path, data]);

  const handleItemClick = (item) => {
    // console.log(item);
    if (item.kk_directory_type === 'directory') {
      setPath([...path, item.kk_directory_idx]);
      setTrackData({});
    } else {
      setTrackData(item);
      setSelecteditems(item.kk_directory_idx);
      setAudioKey((prevKey) => prevKey + 1); // change key to re-render AudioPlayer
    }
  };

  const handleBackClick = () => {
    setPath(path.slice(0, -1));
    setSelecteditems(0);
    setTrackData({});
  };

  return (
    <Container>
      <Title>{titleMap[form]}</Title>
      {/* 관리자 전용 자료 생성 폼 */}
      {agencyType === 'admin' && (
        <UploadContainer>
          <UploadForm
            directories={data.filter(
              (item) => item.kk_directory_type === 'directory'
            )}
            form={form}
          />
          <UploadFormDir
            directories={data.filter(
              (item) => item.kk_directory_type === 'directory'
            )}
            form={form}
          />
          <DeleteForm directories={data} form={form} />
        </UploadContainer>
      )}
      <List>
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
          {form === 'video' ? (
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
              // width={mobileFlag ? '370' : '450'}
              // height="270"
            />
          ) : (
            <iframe
              key={audioKey}
              src={trackData.url}
              width={mobileFlag ? '100%' : '450'}
              height={mobileFlag ? '170' : '70'}
            />
          )}
        </TrackContainer>
      )}
    </Container>
  );
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

const ListItem = styled.li`
  margin: 5px 0;
  padding: 0.5rem;

  background-color: ${(props) => (props.selected ? '#398E56' : '#45b26b')};

  border-radius: 24px;

  cursor: pointer;

  font-size: 1.2rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: center;

  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: white;
`;

const BackButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
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
