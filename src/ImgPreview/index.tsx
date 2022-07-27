import {
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import Modal from './Modal';

interface Props {
  imgs: { name: string; url: string }[];
  currentImg?: { name: string; url: string };
  children?: JSX.Element;
}

const ImgPreview: FC<Props> = ({ imgs, currentImg, children }) => {
  const [index, setIndex] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rotate, setRotate] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [containerClass, setContainerClass] = useState<string>(styles.preview);

  useEffect(() => {
    currentImg &&
      setIndex(
        imgs.findIndex(({ url }) => {
          return url === currentImg.url;
        }),
      );
  }, [currentImg]);

  const showModal = () => {
    document.documentElement.style.overflowY = 'hidden';
    setIsModalVisible(true);
    setContainerClass(
      `${styles.preview} ant-fade-enter ant-fade-enter-active ant-fade ant-zoom-enter ant-zoom-enter-active ant-zoom`,
    );
    setTimeout(() => {
      setContainerClass(styles.preview);
    }, 500);
  };

  const handleCancel = () => {
    document.documentElement.style.overflowY = 'scroll';
    setContainerClass(
      `${styles.preview} ant-fade-leave ant-fade-leave-active ant-fade ant-zoom-leave ant-zoom-leave-active ant-zoom`,
    );
    setTimeout(() => {
      setContainerClass(styles.preview);
      setIsModalVisible(false);
    }, 500);
  };

  const switchLeft = (e: any) => {
    e.stopPropagation();
    if (index === 0) {
      return;
    }
    setIndex((pre) => pre - 1);
  };

  const switchRight = (e: any) => {
    e.stopPropagation();
    if (index === imgs.length - 1) {
      return;
    }
    setIndex((pre) => pre + 1);
  };

  return (
    <>
      <div onClick={showModal}>{children}</div>
      {isModalVisible && (
        <Modal>
          <div
            className={containerClass}
            onWheel={(e) => {
              const wheelDelta = (e?.nativeEvent as any)?.wheelDelta;
              if (wheelDelta === 120) {
                setScale((pre) => pre + 1);
              } else if (wheelDelta === -120) {
                setScale((pre) => (pre > 1 ? pre - 1 : 1));
              }
            }}
            onClick={handleCancel}
          >
            <ul className={styles.operations} onClick={(e) => e.stopPropagation()}>
              <li onClick={handleCancel} className={styles.operation}>
                <CloseOutlined />
              </li>
              <li onClick={() => setScale((pre) => pre + 1)} className={styles.operation}>
                <ZoomInOutlined />
              </li>
              <li
                onClick={() => setScale((pre) => (pre > 1 ? pre - 1 : 1))}
                className={styles.operation}
                style={scale === 1 ? { color: '#ffffff40', cursor: 'not-allowed' } : {}}
              >
                <ZoomOutOutlined />
              </li>
              <li onClick={() => setRotate((pre) => pre + 90)} className={styles.operation}>
                <RotateRightOutlined />
              </li>
              <li onClick={() => setRotate((pre) => pre - 90)} className={styles.operation}>
                <RotateLeftOutlined />
              </li>
              <li className={styles.progress}>
                <span style={{ marginRight: 10 }}>{imgs[index].name}</span>
                {`${index + 1}/${imgs.length}`}
              </li>
            </ul>
            <img
              className={styles.previewImg}
              src={imgs[index].url}
              style={{
                transform: `scale3d(${scale}, ${scale}, 1)  rotate(${rotate}deg)`,
              }}
              alt=""
            />
            <div
              className={styles.leftIcon}
              onClick={switchLeft}
              style={index === 0 ? { color: '#ffffff40', cursor: 'not-allowed' } : {}}
            >
              <LeftOutlined />
            </div>
            <div
              className={styles.rightIcon}
              onClick={switchRight}
              style={index === imgs.length - 1 ? { color: '#ffffff40', cursor: 'not-allowed' } : {}}
            >
              <RightOutlined />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ImgPreview;
