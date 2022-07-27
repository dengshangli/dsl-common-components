---
nav:
  title: 组件
  path: /components
---

## ImgPreview 图片预览

### 简介

基于 antdsign+react 实现的图片预览组件，支持图片缩放、旋转、切换，虽然预览样式与 antdsign 一致，但用法不一致，antdsign 图片预览有以下缺陷：

- 不支持点击图片名称展示预览图片

- 当图片过多时分页展示，不支持跨页预览

- 不支持展示预览图片名称

### 效果展示

![image.png](https://s2.loli.net/2022/07/20/4WxVqJGbthURvrz.png)

### Demo:

```tsx
import React from 'react';
import { ImgPreview } from 'dsl-components';

const imgs = [
  {
    name: 'picture1.png',
    url: 'https://i.loli.net/2021/04/02/7TzOGPFlxAy3nre.pnghttps://i.loli.net/2021/04/02/7TzOGPFlxAy3nre.png',
  },
  {
    name: 'picture2.png',
    url: 'https://i.loli.net/2021/04/02/7TzOGPFlxAy3nre.pnghttps://i.loli.net/2021/04/02/7TzOGPFlxAy3nre.png',
  },
];

const App = () => {
  return (
    <div>
      {imgs.map((img) => (
        <DslImgPreview imgs={imgs} currentImg={img}>
          <span>{img.name}</span>
        </DslImgPreview>
      ))}
    </div>
  );
};

export default App;
```

### API

| 属性       | 说明         | 类型                          | 默认值 | 是否必传 |
| ---------- | ------------ | ----------------------------- | ------ | -------- |
| imgs       | 所有图片集合 | {name: string, url: string}[] | 无     | 是       |
| currentImg | 当前预览图片 | {name: string, url: string}   | 无     | 否       |
