import { useState, useEffect } from 'react';
import styled from 'styled-components';
import UploadForm from './UploadForm'; // 새로운 업로드 폼 컴포넌트
import UploadFormDir from './UploadFormDir';
import DeleteForm from './DeleteForm';
import { useRecoilState } from 'recoil';
import { agencyClass, mobile } from '@/store/state';

const titleMap = {
  music: 'Music',
  video: 'Video',
  class: 'Class',
};

const Directory = ({ data, form }) => {
  const [path, setPath] = useState([null]); // root path with null
  const [items, setItems] = useState([]);
  const [isRoot, setIsRoot] = useState(true);
  const [trackData, setTrackData] = useState({});
  const [audioKey, setAudioKey] = useState(0); // unique key for AudioPlayer
  const [agencyType, setAgencyType] = useRecoilState(agencyClass);
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  useEffect(() => {
    const currentParentId = path[path.length - 1];
    const currentItems = data.filter(
      (item) => item.kk_directory_parent_idx === currentParentId
    );
    setItems(currentItems);
    setIsRoot(path.length === 1);
  }, [path, data]);

  const handleItemClick = (item) => {
    if (item.kk_directory_type === 'directory') {
      setPath([...path, item.kk_directory_idx]);
      setTrackData({});
    } else {
      setTrackData(item);
      setAudioKey((prevKey) => prevKey + 1); // change key to re-render AudioPlayer
    }
  };

  const handleBackClick = () => {
    setPath(path.slice(0, -1));
    setTrackData({});
  };

  return (
    <Container>
      <Title>{titleMap[form]}</Title>
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
          >
            <StyledLink>{item.kk_directory_name}</StyledLink>
          </ListItem>
        ))}
        {trackData.url && (
          <TrackContainer>
            {/* <h2>{trackData.kk_directory_name}</h2> */}
            {/* <AudioPlayer key={audioKey} controls autoPlay>
              <source src={trackData.url} type="audio/mp3" />
            </AudioPlayer> */}
            {form === 'video' ? (
              <iframe
                key={audioKey}
                src={trackData.url}
                // allowfullscreen
                width={mobileFlag ? '370' : '450'}
                height="270"
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
      </List>
    </Container>
  );
};

const Container = styled.div`
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

  background-color: #45b26b;

  border-radius: 24px;

  cursor: pointer;

  font-size: 1.2rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: center;

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
