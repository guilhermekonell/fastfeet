import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Popup from 'reactjs-popup';

export const Content = styled.div`
  padding: 20px;

  overflow-wrap: break-word;
`;

export const StyledPopup = styled(Popup)`
  &-content {
    border-radius: 4px;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 500px;
`;
