import React from 'react';
import PropTypes from 'prop-types';

import { Content, StyledPopup, Scroll } from './styles';

export default function Modal({ trigger, children, ...rest }) {
  return (
    <StyledPopup trigger={trigger} modal {...rest}>
      <Scroll>
        <Content>{children}</Content>
      </Scroll>
    </StyledPopup>
  );
}

Modal.propTypes = {
  trigger: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
};
