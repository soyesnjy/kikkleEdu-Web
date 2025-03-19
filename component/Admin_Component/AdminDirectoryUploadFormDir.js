import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { handleDirectoryCreate } from '@/fetchAPI/directoryAPI';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';

const AdminDirectoryUploadFormDir = ({ directories, form }) => {
  const [treeData, setTreeData] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [directoryName, setDirectoryName] = useState('');

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

    if (!directoryName) {
      alert('폴더명을 입력하세요');
      return;
    }

    setIsPending(true);

    const formData = {
      type: 'directory',
      form,
      directoryId: selectedDirectory.kk_directory_idx,
      directoryName,
    };

    const response = await handleDirectoryCreate(formData);

    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Directory Upload Success!',
        text: 'Page Reload',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setIsPending(false);
        router.reload();
      });
    } else {
      console.error('Directory Upload failed');
      alert('Directory Upload failed');
    }
  };

  const handleChange = (currentNode) => {
    setSelectedDirectory(currentNode);
  };

  return (
    <FormContainer>
      <h3>폴더 생성</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="directory">폴더</Label>
          <DropdownTreeSelect
            texts={{
              placeholder:
                selectedDirectory?.kk_directory_name || '폴더를 선택해주세요',
              noMatches: 'No matches found',
            }}
            data={treeData}
            onChange={handleChange}
            className="dropdown"
            mode="multiSelect"
          />
          <InfoSpan>*폴더 미선택 시 Root 경로에 폴더가 생성됩니다</InfoSpan>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="directoryName">폴더 이름</Label>
          <StyledInput
            value={directoryName}
            type="text"
            id="directoryName"
            onChange={(e) => setDirectoryName(e.target.value)}
          />
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

export default AdminDirectoryUploadFormDir;
