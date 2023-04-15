import React from 'react';
import { styleRoot } from './ButtonStyle';
import { Icon } from '@common';
import { IconType } from '@components/Icon/Icon';

interface ButtonType {
  children: React.ReactNode;
  _onClick?: React.MouseEventHandler<any>;
  size?: 'large' | 'small';
  style?: 'primary' | 'secondary';
  loading?: boolean;
  icon?: IconType['name'];
  color?: string;
  noAmimation?: boolean;
  isFullWidth?: boolean;
}

const Button = React.forwardRef((props: ButtonType, ref: any) => {
  const {
    children,
    _onClick,
    size,
    loading,
    icon,
    style,
    color,
    noAmimation,
    isFullWidth,
  } = props;

  const colorStyle = color ? { color: color } : {};

  return (
    <button
      ref={ref}
      className={
        styleRoot +
        ` ${size} ${loading ? 'loading' : ''} ${icon ? 'icon' : ''} ${
          noAmimation ? 'no-animation' : ''
        } ${isFullWidth ? 'full-width' : ''} ${style ?? 'primary'}`
      }
      style={colorStyle}
      onClick={_onClick}
    >
      {icon && <Icon name={icon} fill={color}></Icon>}
      {children}
    </button>
  );
});

export default Button;
