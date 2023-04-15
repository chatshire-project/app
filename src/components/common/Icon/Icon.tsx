import { forwardRef, useEffect, useState } from 'react';
import { getStyleRoot } from './IconStyle';
import icon from '@assets/icons/index';

export interface IconType {
  name: keyof typeof icon;
  _onClick?: React.MouseEventHandler<any>;
  fill?: string;
  size?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const Icon = forwardRef((props: IconType) => {
  const { name, _onClick, fill, size, width, height } = props;
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    let svgString = icon[name];
    if (!svgString) return;
    if (fill) svgString = changeSVGColor(svgString, fill);
    if (size) svgString = changeSVGSize(svgString, { size });
    if (width && height)
      svgString = changeSVGSize(svgString, { width, height });
    setSvgContent(svgString);
  }, []);

  const isOnClick = _onClick ? true : false;
  const styleRoot = getStyleRoot(isOnClick);

  return (
    <div
      className={styleRoot}
      onClick={_onClick}
      dangerouslySetInnerHTML={{ __html: svgContent || '' }}
    ></div>
  );
});

const changeSVGSize = (
  svgString: string,
  props: { size?: number; width?: number; height?: number }
) => {
  const width = props.width || props.size;
  const height = props.height || props.size;
  if (!width || !height) return svgString;

  const newString = svgString
    .replace(/width=".*?"/g, `width="${width}"`)
    .replace(/height=".*?"/g, `height="${height}"`);
  return newString;
};

const changeSVGColor = (svgString: string, color: string) =>
  svgString.replace(/fill=".*?"/g, `fill="${color}"`);

export default Icon;
