import { forwardRef, useEffect, useState } from 'react';
import { getStyleRoot } from './ImageStyle';
import * as image from '@assets/images/index';

export interface ImageType {
  name: keyof typeof image;
  _onClick?: React.MouseEventHandler<any>;
  fill?: string;
  size?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const Icon = forwardRef((props: ImageType) => {
  const { name, _onClick, size, width, height } = props;

  const isOnClick = _onClick ? true : false;
  const styleRoot = getStyleRoot(isOnClick);
  const url = image[name].src;

  return (
    <div onClick={_onClick} className={styleRoot}>
      <img
        src={url}
        alt={name}
        width={width ?? size + 'px'}
        height={height ?? size + 'px'}
      ></img>
    </div>
  );
});

export default Icon;
