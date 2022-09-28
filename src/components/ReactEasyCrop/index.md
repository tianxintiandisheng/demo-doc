---
nav:
  path: /component
  title: component
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /component/upload
  title: upload
  order:
---

## react-easy-crop

### Demo

```jsx
/**
 * title: react-easy-crop
 * desc: Basic usage
 */
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

const yourImage = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

const Demo = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  return (
    <div style={{ position: 'relative', width: 300, height: 300 }}>
      <Cropper
        image={yourImage}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  );
};

export default Demo;
```

## 参考资料

[官方文档](https://github.com/ricardo-ch/react-easy-crop#props)
