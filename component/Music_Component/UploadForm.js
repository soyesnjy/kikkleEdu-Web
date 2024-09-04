import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { handleDirectoryCreate } from '@/fetchAPI/directory';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';

const UploadForm = ({ directories }) => {
  const [treeData, setTreeData] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [file, setFile] = useState(null);
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
      alert('폴더 선택 ㄱㄱ');
      return;
    }

    if (!file) {
      alert('파일 선택 ㄱㄱ');
      return;
    }
    setIsPending(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result
        .replace('data:', '')
        .replace(/^.+,/, '');

      const formData = {
        type: 'file',
        fileData: {
          fileName: file.name,
          mimeType: file.type,
          baseData: `data:${file.type};base64,${base64String}`,
        },
        directoryId: selectedDirectory.value,
      };

      const response = await handleDirectoryCreate(formData);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Upload Success!',
          text: 'Page Reload',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setIsPending(false);
          router.reload();
        });
      } else {
        console.error('Upload failed');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (currentNode, selectedNodes) => {
    setSelectedDirectory(currentNode);
  };

  return (
    <FormContainer>
      <h3>File Create Form</h3>
      <form onSubmit={handleSubmit}>
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
          <Input
            type="file"
            id="file"
            accept=".mp3, .wav, .aac, .ogg, .flac, .m4a"
            onChange={(e) => setFile(e.target.files[0])}
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
