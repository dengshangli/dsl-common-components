import { FC } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children?: JSX.Element;
}

const Modal: FC<Props> = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export default Modal;
