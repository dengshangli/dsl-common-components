## 滚动表格

### 简介

支持表格数据滚动，当鼠标移入时暂停滚动

### Demo:

```tsx
import React from 'react';
import { ScrollTable } from 'dsl-components';

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const App = () => {
  return <ScrollTable dataSource={data} columns={columns} rowKey="key" />;
};

export default App;
```

### API

仅写部分，其他同 andsign table

| 属性 | 说明 | 类型 | 默认值 | 是否必传 |
| --- | --- | :-- | --- | --- |
| dataSource | 数据数组 | object[] | 无 | 是 |
| rowKey | 表格行 key 的取值，可以是字符串或一个函数 | string \| function(record): string | 无 | 是 |
| columns | 表格列的配置描述 | ColumnsType[] | 无 | 是 |
