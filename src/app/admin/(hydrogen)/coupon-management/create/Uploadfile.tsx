// ** React Imports
import UploadIcon from '@/components/shape/upload';
import { useState, Fragment, memo } from 'react';

// ** Reactstrap Imports
//import { Card, CardBody } from "reactstrap";

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import { Button } from 'rizzui';
//import { FileText, X, DownloadCloud, UploadCloud } from "react-feather";

interface FileUploaderProps {
  setFieldValue: any;
  name: string;
  initialPath: any;
  readonly: boolean;
  errors: any;
  user: boolean; // You might want to replace this with the correct type
}

const FileUploader: React.FC<FileUploaderProps> = (props) => {
  // ** State
  const {
    setFieldValue,
    name,
    initialPath,
    readonly,
    user,
    errors,
    ...inputProps
  } = props;
  const [files, setFiles] = useState<any[]>([]); // You might want to replace 'any' with a more specific type
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          setFieldValue(name, file);
          errors(name, {
            type: '',
            message: '',
          });
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
  });

  return (
    <div className="ddd col-span-2 flex h-full w-full items-center gap-5">
      <div
        {...getRootProps({
          className:
            'relative  h-20 w-20 rounded-full border-[1.8px] cursor-pointer',
        })}
      >
        <input {...getInputProps({ ...inputProps })} />
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <UploadIcon className="size-6"></UploadIcon>
          <p className="pt-1 text-center text-xs ">Select or drag file </p>
        </div>
      </div>
      {files && files.length > 0 ? (
        <div className="flex h-[150px] w-[150px] items-center justify-center">
          {files.map((file, index) => {
            return (
              <Fragment key={index}>
                <img
                  src={
                    file?.preview
                      ? file.preview
                      : `${process.env.NEXT_PUBLIC_API}/${initialPath}`
                  }
                  alt={`Preview ${index + 1}`}
                  // style={{ height: '250px', width: '250px' }}
                  className="h-full w-full"
                />
              </Fragment>
            );
          })}
        </div>
      ) : initialPath ? (
        <div className="flex h-[150px] w-[150px] items-center justify-center">
          <img
            src={`${process.env.NEXT_PUBLIC_API}/${initialPath}`}
            className="h-full w-full"
            alt="Initial Path"
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default memo(FileUploader);
