import { Tooltip, TreeSelect } from 'antd';
import React, { CSSProperties, FC, useEffect, useState } from 'react';

const classList = [
  'ant-select-selector',
  'ant-select-selection-item-content',
  'ant-select-selection-item',
  'ant-select-selection-overflow-item',
  'ant-select-tree-title',
  'ant-select-selection-overflow',
  'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest',
];

function findTree(tree: any, key: string, result = null) {
  if (!tree) {
    return tree;
  }
  const queue = [tree];
  while (queue.length) {
    const item = queue.shift();
    if (item.value === key) {
      result = item;
      return result;
    }
    item?.children?.forEach?.((child: any) => {
      queue.push(child);
    });
  }

  return result;
}

const getSelectTree = (nodes: any, key: string) => {
  let result = {};
  for (let i = 0; i < nodes.length; i++) {
    result = findTree(nodes[i], key);
    if (result) {
      return result;
    }
  }

  return result;
};

function pushTrees(tree: any, result: any, isOnlySelectLeaf: boolean) {
  if (!tree) {
    return;
  }
  const queue = [tree];
  while (queue.length) {
    const item = queue.shift();
    if (isOnlySelectLeaf) {
      item.isLeaf && result.push({ key: item.value, title: item.title });
    } else {
      result.push({ key: item.value, title: item.title });
    }
    item?.children?.forEach?.((child: any) => {
      queue.push(child);
    });
  }
}

const getSelectTreeEntries = (nodes: any, isOnlySelectLeaf: boolean) => {
  const result: any = [];
  for (let i = 0; i < nodes.length; i++) {
    pushTrees(nodes[i], result, isOnlySelectLeaf);
  }

  return result;
};

interface Props {
  treeData: any;
  onChange?: any;
  value?: any;
  style?: CSSProperties;
  dropdownMatchSelectWidth?: boolean;
  maxTagCount?: number;
  isOnlySelectLeaf?: boolean;
}

const DslTreeSelect: FC<Props> = ({
  treeData,
  onChange,
  value,
  style,
  dropdownMatchSelectWidth = true,
  maxTagCount = 1,
  isOnlySelectLeaf = false,
}) => {
  const [selectTitles, setSelectTitles] = useState<string[]>([]);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  useEffect(() => {
    !selectTitles?.length && setTooltipVisible(false);
  }, [selectTitles]);

  const handleChange = (val: string[]) => {
    const selectTrees: any = [];
    val?.length &&
      val.forEach((key) => {
        selectTrees.push(getSelectTree(treeData, key));
      });
    const entrires = selectTrees?.length ? getSelectTreeEntries(selectTrees, isOnlySelectLeaf) : [];
    setSelectTitles(entrires?.map?.(({ title }: { title: string }) => title) || []);
    const selectedKeys = entrires?.length
      ? entrires?.map?.(({ key }: { key: string }) => key)
      : val;
    onChange?.(selectedKeys);
  };

  return (
    <Tooltip
      title={selectTitles.join('、')}
      visible={tooltipVisible}
      placement="top"
      overlayStyle={{ maxWidth: 500 }}
      // zIndex={100}
    >
      <TreeSelect
        treeData={treeData}
        showSearch
        treeNodeFilterProp="title"
        showArrow
        treeCheckable
        placeholder="请选择"
        value={value}
        onChange={handleChange}
        style={style}
        showCheckedStrategy={TreeSelect.SHOW_PARENT}
        maxTagCount={maxTagCount}
        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
        onMouseEnter={(e: any) => {
          if (selectTitles?.length && classList.includes(e.target.className)) {
            setTooltipVisible(true);
          }
        }}
        onMouseLeave={(e: any) => {
          setTooltipVisible(false);
        }}
        onClick={(e: any) => {
          setTooltipVisible(false);
        }}
        // suffixIcon={
        //     <EyeOutlined
        //         onMouseEnter={() => selectTitles?.length && setTooltipVisible(true)}
        //         onMouseLeave={() => setTooltipVisible(false)}
        //     />
        // }
      />
    </Tooltip>
  );
};

export default DslTreeSelect;
