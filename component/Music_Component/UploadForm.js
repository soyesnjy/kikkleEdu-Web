/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-async-promise-executor */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { handleDirectoryCreate } from '@/fetchAPI/directory';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';

const acceptMap = {
  music: '.mp3, .wav, .aac, .ogg, .flac, .m4a',
  video: '.zip, .mp4',
  class: '.zip',
};

const UploadForm = ({ directories, form }) => {
  const [treeData, setTreeData] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // const [file, setFile] = useState(null);
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

    // const buildTreeData = (dirs) => {
    //   const map = {};
    //   const roots = [];

    //   dirs.forEach((dir) => {
    //     map[dir.id] = { ...dir, label: dir.name, value: dir.id, children: [] };
    //   });

    //   dirs.forEach((dir) => {
    //     if (dir.parent_id === null) {
    //       roots.push(map[dir.id]);
    //     } else {
    //       map[dir.parent_id].children.push(map[dir.id]);
    //     }
    //   });

    //   return roots;
    // };

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

          console.log(base64String);

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

  const handleVideoSubmit = async (e) => {
    e.preventDefault();

    alert('개발 중인 기능입니다.');
    return;

    if (!selectedDirectory) {
      alert('폴더를 선택하세요.');
      return;
    }

    if (!files || files.length === 0) {
      alert('파일을 선택하세요.');
      return;
    }
    setIsPending(true);
    try {
      // FormData 생성 및 파일 추가
      const formData = new FormData();
      formData.append('file', files[0]); // 'file'이라는 이름으로 파일 추가
      formData.append('form', form);
      formData.append('directoryId', selectedDirectory.value);
      formData.append('fileName', files[0].name);
      // console.log(files[0]);

      // fetch를 사용하여 서버로 FormData 전송
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/directory/create/video`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
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

  const handleChange = (currentNode, selectedNodes) => {
    setSelectedDirectory(currentNode);
  };

  return (
    <FormContainer>
      <h3>File Create Form</h3>
      <form onSubmit={form === 'video' ? handleVideoSubmit : handleSubmit}>
        <FormGroup>
          <Label htmlFor="directory">Directory</Label>
          <DropdownTreeSelect
            texts={{
              placeholder:
                selectedDirectory?.kk_directory_name || 'Choose a directory',
              noMatches: 'No matches found',
            }}
            data={treeData}
            onChange={handleChange}
            className="dropdown"
            mode="multiSelect"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="file">File</Label>
          {/* <Input
            type="file"
            id="file"
            accept={acceptMap[form]}
            onChange={(e) => setFiles(e.target.files[0])}
          /> */}
          <Input
            type="file"
            id="file"
            multiple
            accept={acceptMap[form]}
            onChange={(e) => setFiles(e.target.files)} // FileList를 상태로 저장
          />
        </FormGroup>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  margin: 20px;
  padding: 1rem;
  border: 1px solid green;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

export default UploadForm;
