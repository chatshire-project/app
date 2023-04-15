import { css } from '@emotion/css';

export default function getStyleRoot() {
  return css`
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Inter', sans-serif;

    max-width: 640px;
    margin: 0 auto;
    padding: 0 20px;
  `;
}
