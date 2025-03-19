/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-async-promise-executor */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import {
  handleDirectoryCreate,
  handleVideoV2Create,
} from '@/fetchAPI/directoryAPI';

import Swal from 'sweetalert2';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';

const acceptMap = {
  music: '.mp3, .wav, .aac, .ogg, .flac, .m4a',
  video: '.zip, .mp4',
  class: '.zip',
};

const AdminDirectoryUploadForm = ({ directories, form }) => {
  const [treeData, setTreeData] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileCode, setFileCode] = useState('');

  const [files, setFiles] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const buildTreeData = (dirs) => {
      const map = {};
      const roots = [];

      dirs.forEach((dir) => {
        map[dir.kk_directory_idx] = {
          ...dir,
          label: dir.kk_directory_name,
          value: dir.kk_directory_idx,
          children: [],
        };
      });

      dirs.forEach((dir) => {
        if (dir.kk_directory_parent_idx === null) {
          roots.push(map[dir.kk_directory_idx]);
        } else {
          map[dir.kk_directory_parent_idx].children.push(
            map[dir.kk_directory_idx]
          );
        }
      });

      return roots;
    };

    setTreeData(buildTreeData(directories));
  }, [directories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDirectory) {
      alert('폴더를 선택하세요.');
      return;
    }
    if (!files || files.length === 0) {
      alert('파일을 선택하세요.');
      return;
    }
    setIsPending(true);
    let reloadCnt = 0;
    const filesCnt = files.length;
    // 각 파일을 처리하기 위한 Promise 배열 생성
    const uploadPromises = Array.from(files).map((file) => {
      ++reloadCnt;
      return new Promise(async (resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result
            .replace('data:', '')
            .replace(/^.+,/, '');
          const formData = {
            type: 'file',
            form,
            fileData: {
              fileName: file.name,
              mimeType: file.type,
              baseData: `data:${file.type};base64,${base64String}`,
            },
            directoryId: selectedDirectory.value,
          };
          try {
            const response = await handleDirectoryCreate(formData);
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Upload Success!',
                text: 'Page Reload',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                if (filesCnt === reloadCnt) router.reload();
                resolve(); // 업로드 성공 시 resolve 호출
              });
            } else {
              console.error('Upload failed');
              reject(new Error('Upload failed'));
            }
          } catch (error) {
            console.error('Upload error', error);
            reject(error);
          }
        };

        // 파일을 base64로 인코딩
        reader.readAsDataURL(file);
      });
    });

    // 모든 파일 업로드 완료 시 처리
    try {
      await Promise.all(uploadPromises); // 모든 파일 업로드 완료 시까지 대기
      setIsPending(false);
      router.reload(); // 페이지 새로고침
    } catch (error) {
      console.error('File upload failed:', error);
      setIsPending(false);
    }
  };

  const handleVideoV2Submit = async (e) => {
    e.preventDefault();
    if (!selectedDirectory) {
      alert('폴더를 선택하세요.');
      return;
    }
    if (!fileName) {
      alert('파일명을 입력하세요.');
      return;
    }
    if (!fileCode) {
      alert('파일코드를 입력하세요.');
      return;
    }
    setIsPending(true);

    try {
      const formData = {
        fileName,
        fileCode,
        directoryId: selectedDirectory.value,
        form,
      };

      const response = await handleVideoV2Create(formData);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Upload Success!',
          text: 'Page Reload',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.reload();
        });
      } else {
        console.error('Upload failed');
        alert('Upload Failed');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (currentNode) => {
    setSelectedDirectory(currentNode);
  };

  return (
    <FormContainer>
      <h3>{`파일 생성`}</h3>
      <form onSubmit={form === 'video' ? handleVideoV2Submit : handleSubmit}>
        <FormGroup>
          <Label htmlFor="directory">{`폴더`}</Label>
          <DropdownTreeSelect
            texts={{
              placeholder:
                selectedDirectory?.kk_directory_name || '폴더를 선택해주세요',
              noMatches: 'No matches found',
            }}
            data={treeData}
            className="dropdown"
            mode="multiSelect"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          {form !== 'video' ? <Label htmlFor="file">파일</Label> : null}
          {form === 'video' ? (
            <>
              <>
                <Label>파일명</Label>
                <StyledInput
                  type="text"
                  id="fileName"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)} // FileList를 상태로 저장
                />
              </>
              <>
                <Label>코드</Label>
                <StyledInput
                  type="text"
                  id="fileCode"
                  value={fileCode}
                  onChange={(e) => setFileCode(e.target.value)} // FileList를 상태로 저장
                />
                <InfoSpan>*영상 파일의 URL 주소를 입력하세요</InfoSpan>
              </>
            </>
          ) : (
            <StyledInput
              type="file"
              id="file"
              multiple
              accept={acceptMap[form]}
              onChange={(e) => setFiles(e.target.files)} // FileList를 상태로 저장
            />
          )}
        </FormGroup>
        <Button type="submit" disabled={isPending}>
          {isPending ? '생성중...' : '생성'}
        </Button>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 250px;
  margin: 20px;
  padding: 1rem;
  border: 1px solid green;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-family: Pretendard;
    font-weight: 600;
  }

  form {
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  padding-left: 0.2rem;
  margin-bottom: 5px;

  display: block;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 600;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 4px;
  margin-bottom: 10px;

  display: block;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 400;
`;

const InfoSpan = styled.span`
  padding-left: 0.2rem;
  margin-bottom: 5px;

  display: block;
  color: blue;
  font-size: 0.7rem;
  font-family: Pretendard;
  font-weight: 600;
`;

const Button = styled.button`
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  border: none;

  background-color: #4caf50;
  color: white;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;

  cursor: pointer;
`;

export default AdminDirectoryUploadForm;
