## 树选择框

### 简介

基于 antdsign+react 实现的树选择框组件，支持鼠标悬停展示已选项、支持仅选择叶子节点

### Demo:

```tsx
import React from 'react';
import { DslTreeSelect } from 'dsl-components';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

const App = () => {
  return <DslTreeSelect treeData={treeData} style={{ width: 300 }} />;
};

export default App;
```

### API

| 属性 | 说明 | 类型 | 默认值 | 是否必传 |
| --- | --- | :-- | --- | --- |
| treeData | 树形结构数据 | array<{value, title, children, [disabled, disableCheckbox, selectable, checkable]}> | 无 | 是 |
| style | 选择框样式 | CSSProperties | 无 | 否 |
| isOnlySelectLeaf | 是否仅支持选择叶子节点 | boolean | 无 | 否 |
| onChange | 选中树节点时调用此函数 | function(value, label, extra) | 无 | 否 |
