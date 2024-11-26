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

  // useEffect(() => {
  //   console.log(selectedDirectory);
  // }, [selectedDirectory]);

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
      <h3>Directory Delete Form</h3>
      <form onSubmit={deleteHandleSubmit}>
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
          <Label htmlFor="directory">Delete subfolder</Label>
        </FormGroup>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  min-height: 250px;
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

// const Input = styled.input`
//   display: block;
//   width: 100%;
//   padding: 8px;
//   margin-bottom: 10px;
// `;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

export default DeleteForm;
