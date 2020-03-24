import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  strong {
    font-size: 22px;
    margin-bottom: 50px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      background: #fff;
      border: 1px solid #ccc;
      height: 36px;

      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #eee;
      border-radius: 4px;

      svg {
        margin: 0 5px;
      }
    }

    input {
      border: 0;
      background: none;

      &::placeholder {
        color: #aaa;
      }
    }

    button {
      height: 36px;
      background: #7159c1;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;

      display: flex;
      align-items: center;
      transition: background 0.2s;

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
`;
