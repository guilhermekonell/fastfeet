import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  strong {
    font-size: 22px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        height: 36px;
        width: 120px;
        background: #7159c1;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        margin-left: 4px;

        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;

        &:first-child {
          background: #aaa;

          &:hover {
            background: ${darken(0.03, '#aaa')};
          }
        }

        &:hover {
          background: ${darken(0.03, '#7159c1')};
        }

        div {
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            margin-right: 6px;
          }

          svg {
            margin: 3px;
          }
        }
      }
    }
  }
`;
