import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    background: none;
    cursor: poiter;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  strong {
    margin: 0 5px;
    color: #333;
    font-size: 14px;
  }
`;
