import { Table } from 'antd';
import React, { memo, useEffect, useRef, useState } from 'react';
import styles from './index.less';

const AutoScroll = (props: any) => {
  //   /**表格数据 */
  //   dataSource: MonitoringData[];
  //   /** 表格每次滚动间隔时间，单位ms */
  //   rollTime: number;
  //   /** 数据超过指定条数开始滚动 */
  //   rollNum: number;
  //   /** 表格每次滚动高度, 单位px */
  //   rollTop: number;
  //   /** 是否滚动 */
  //   flag: boolean;
  const { dataSource, rollTime = 50, rollNum = 5, rollTop = 1.5, flag = true } = props;
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const tableRef = useRef<any>();
  const intervalRef = useRef<any>([]);

  // 鼠标初始化，即开始滚动
  useEffect(() => {
    if (isMouseOver || !flag) {
      return;
    }
    clearAll();
    initialScroll(dataSource);
  }, [dataSource]);

  const clearAll = () => {
    intervalRef?.current?.forEach?.((item: any) => {
      clearInterval(item);
    });
    intervalRef.current = [];
  };

  // 开启定时器
  const initialScroll = (data: any) => {
    const v = tableRef.current.getElementsByClassName('ant-table-body')[0];
    if (data?.length > rollNum && flag) {
      const interval: any = setInterval(() => {
        v.scrollTop += rollTop;
        if (Math.ceil(v.scrollTop) >= parseFloat((v.scrollHeight - v.clientHeight).toString())) {
          v.scrollTop = 0;
        }
      }, rollTime);
      intervalRef.current.push(interval); // 定时器保存变量 利于停止
    }
  };

  return (
    <div
      onMouseEnter={() => {
        setIsMouseOver(true);
        clearAll();
      }}
      onMouseLeave={() => {
        setIsMouseOver(false);
        initialScroll(dataSource);
      }}
      ref={tableRef}
      className={isMouseOver ? styles.autoScrollMouseOver : styles.autoScroll}
    >
      <Table
        loading={false}
        rowKey="id"
        pagination={false}
        toolBarRender={false}
        search={false}
        // size="small"
        scroll={{
          y: 250,
          x: '100%',
          scrollToFirstRowOnChange: true,
        }}
        {...props}
      />
    </div>
  );
};

export default memo(AutoScroll, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.dataSource) === JSON.stringify(nextProps.dataSource);
});
