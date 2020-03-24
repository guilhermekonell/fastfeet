import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  border: 0;
  background: none;
  position: relative;
  width: 100%;
  left: calc(40%);
`;

export const MoreList = styled.div`
  position: absolute;
  width: 100%;
  left: calc(40%);
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ddd;
  }
`;

export const More = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ddd;
  border-radius: 4px;
  padding: 5px 0;

  button {
    border: 0;
    border-bottom: 1px solid #ccc;
    width: 90%;
    height: 100%;
    padding: 5px 0;

    &:last-child {
      border-bottom: none;
    }

    svg {
      margin-right: 5px;
    }
  }
`;
