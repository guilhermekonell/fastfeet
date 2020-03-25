import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1024px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  span {
    font-size: 22px;
    margin-bottom: 10px;
    font-weight: bold;
  }
`;

export const ProblemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  p {
    text-align: left;
  }
`;
