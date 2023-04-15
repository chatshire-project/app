import React, { useEffect } from 'react';
import { styleRoot } from './defaultStyle';

interface Deafult {
  children: React.ReactNode;
}

const Default = React.forwardRef((props: Deafult, ref: any) => {
  const { children } = props;

  return (
    <>
      <div className={styleRoot}>{children}</div>
    </>
  );
});

export default Default;
