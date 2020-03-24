import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1024px;
  margin: 50px auto;
`;

export const RecipientInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #ccc;

  strong {
    font-size: 14px;
    margin: 8px 0;
  }

  span {
    font-size: 15px;
    margin-bottom: 8px;
  }
`;

export const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #ccc;

  strong {
    font-size: 14px;
    margin: 8px 0;
  }

  span {
    font-size: 15px;
    margin-bottom: 8px;

    strong {
      margin-right: 5px;
    }
  }
`;

export const Signature = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  strong {
    font-size: 14px;
    margin: 8px 0;
  }

  img {
    align-self: center;
    width: 220px;
    height: 80px;
  }
`;

export const Pagination = styled.div`
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

    &:disabled {
      opacity: 0.7;
    }
  }

  strong {
    margin: 0 5px;
    color: #333;
    font-size: 14px;
  }
`;
