import React from 'react';
import { styleRoot } from './ModalStyle';
import { Button } from '@common';

interface Modal {
  style?: React.CSSProperties;
  _onClick?: React.MouseEventHandler<any>;
  title: string;
  content: string;
  button: string;
  secondButton?: string;
  _onClickSecond?: React.MouseEventHandler<any>;
}

const Modal = React.forwardRef((props: Modal, ref: any) => {
  const {
    _onClick,
    title = '',
    content = '',
    button = '',
    secondButton = '',
    _onClickSecond,
  } = props;

  return (
    <div className={styleRoot}>
      <div className="modal">
        <h3>{title}</h3>
        <p>{content}</p>
        <div className="button-container">
          <Button size="large" _onClick={_onClick}>
            {button}
          </Button>
          {secondButton ? (
            <Button size="large" style="secondary" _onClick={_onClickSecond}>
              {secondButton}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="backdrop"></div>
    </div>
  );
});

export default Modal;
