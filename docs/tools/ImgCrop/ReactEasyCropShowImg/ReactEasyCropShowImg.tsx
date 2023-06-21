import { Button, message } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop/types';
import './ReactEasyCropShowImg.less';
const yourImage = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
const PREFIX = 'tds';

export interface ReactEasyCropShowImgProps extends React.HTMLAttributes<HTMLDivElement> {}

const ReactEasyCropShowImg = (props: ReactEasyCropShowImgProps) => {
  const { className = '', ...otherProps } = props;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [resultUrl, setResultUrl] = useState('');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    const imgSource = document.querySelector(`.${PREFIX}-media`) as HTMLImageElement;
    imgSource.setAttribute('crossOrigin', 'Anonymous'); // 处理跨域
    imgSource.onload = () => {
      // 加载图像完成之后
      console.log('图片已添加允许跨域的属性');
    };
  }, []);

  const onOk = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const { width: cropWidth, height: cropHeight, x: cropX, y: cropY } = croppedAreaPixels;
    const imgSource = document.querySelector(`.${PREFIX}-media`) as HTMLImageElement;
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    // ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, cropWidth, cropHeight);
    ctx.drawImage(imgSource, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    try {
      canvas.toBlob((blob) => {
        if (blob) {
          console.log('blob', blob);
          const blobUrl = window.URL.createObjectURL(blob);
          console.log('blobUrl', blobUrl);
          setResultUrl(blobUrl);
        }
      });
    } catch (error) {
      message.error('无法导出受污染的画布');
      console.log('无法导出受污染的画布', error);
    }
  };
  return (
    <div className={`root ${className}`} {...otherProps}>
      <h2>Crop 操作区</h2>
      <div className='cropBox'>
        <Cropper
          image={yourImage}
          showGrid={false}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          classes={{
            containerClassName: `${PREFIX}-container`,
            mediaClassName: `${PREFIX}-media`,
          }}
        />
      </div>
      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <Button onClick={onOk}>生成剪切结果</Button>
      </div>
      <h2>剪切结果</h2>
      <img className='resultImg' src={resultUrl}></img>
    </div>
  );
};

export default ReactEasyCropShowImg;
