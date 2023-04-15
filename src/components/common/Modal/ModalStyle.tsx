import { css } from '@emotion/css';
export const styleRoot = css`
  z-index: 100;
  .modal {
    z-index: 102;
    position: fixed;
    background: var(--gray-800);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 40px;
    width: 440px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  

  .backdrop {
    z-index: 101;
    background-color: rgba(0,0,0,0.45);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  h3 {
    font-size: 24px;
    font-weight: 700;
    line-height: 130%;
  }

  p {
    margin-bottom: 16px;
    line-height: 140%;
    color: var(--gray-200);
  }

  .button-container {
    display: flex;
    gap: 12px;
    flex-direction: column;
  }
}`;
