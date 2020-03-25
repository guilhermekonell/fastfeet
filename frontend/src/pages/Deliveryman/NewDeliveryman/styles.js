import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 4px;

  > div {
    display: flex;
    justify-content: center;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 5px 0;

  &:first-child {
    margin-right: 5px;
  }

  strong {
    font-size: 15px;
    margin: 5px;
    font-weight: bold;
  }

  span {
    color: #f00;
  }
`;
