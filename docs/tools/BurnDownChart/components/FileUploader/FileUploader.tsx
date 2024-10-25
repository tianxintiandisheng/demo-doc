import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import { DataObj } from '../../type.ts';
import { handleJsonFileUpload } from '../../utils';

export interface FileUploaderProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'defaultValue' | 'onChange'
  > {
  fileType: 'json' | 'xlsx';
  onUploadSuccess: (dataObj: DataObj) => void;
}

// 根据 fileType 设置允许的文件类型
const FILE_TYPE_MAP = {
  json: {
    accept: '.json, application/json',
    description: 'JSON 文件',
  },
  xlsx: {
    accept:
      '.xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    description: 'Excel 文件',
  },
};

const FileUploader = (props: FileUploaderProps) => {
  const { className = '', fileType, onUploadSuccess, ...otherProps } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { accept, description } = FILE_TYPE_MAP[fileType];

  const handleCustomRequest = (options: any) => {
    const file = options.file as File;

    if (fileType === 'json') {
      handleJsonFileUpload(onUploadSuccess, file);
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   try {
      //     const data = JSON.parse(e.target?.result as string);
      //     console.log('Parsed JSON data:', data);
      //     // setJsonData(data);
      //     message.success('JSON 文件解析成功');
      //   } catch (error) {
      //     message.error('JSON 文件解析失败，请确保文件格式正确');
      //   }
      // };
      // reader.readAsText(file);
    }

    // 更新文件列表
    setFileList([...fileList, options.file]);
  };

  const handleRemove = (file: any) => {
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newFileList);
  };
  return (
    <div className={className} {...otherProps}>
      <Upload
        name="file"
        accept={accept}
        // beforeUpload={handleBeforeUpload}
        customRequest={handleCustomRequest}
        onChange={(info) => {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        }}
        fileList={fileList}
        onRemove={handleRemove}
      >
        <Button icon={<UploadOutlined />}>{description}</Button>
      </Upload>
    </div>
  );
};

export default FileUploader;
