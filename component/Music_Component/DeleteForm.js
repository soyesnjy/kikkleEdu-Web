import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { handleDirectoryDelete } from '@/fetchAPI/directoryAPI';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';

const DeleteForm = ({ directories, form }) => {
  const [treeData, setTreeData] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState('');
  const [isPending, setIsPending] = useState(false);

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
          type: dir.kk_directory_type,
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

  const deleteHandleSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);

    const response = await handleDirectoryDelete({
      directoryIdx: selectedDirectory.kk_directory_idx,
      type: selectedDirectory.kk_directory_type,
      form,
    });

    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Delete Success!',
        text: 'Page Reload',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setIsPending(false);
        router.reload();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Directory Upload failed',
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const handleChange = (currentNode) => {
    setSelectedDirectory(currentNode);
  };

  return (
    <FormContainer>
      <h3>폴더 삭제</h3>
      <form onSubmit={deleteHandleSubmit}>
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
          <WarningSpan>*폴더 내부의 파일 전체가 삭제됩니다</WarningSpan>
        </FormGroup>
        <Button type="submit" disabled={isPending}>
          {isPending ? '삭제중...' : '삭제'}
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

const WarningSpan = styled.span`
  padding-left: 0.2rem;
  margin-bottom: 5px;

  display: block;
  color: red;
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

export default DeleteForm;
