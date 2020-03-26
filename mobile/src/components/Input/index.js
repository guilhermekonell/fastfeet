import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TInput } from './styles';

function Input({ styled, icon, ...rest }, ref) {
  return (
    <Container style={styled}>
      {icon && <Icon name={icon} size={20} color="rgba(255,255,255,0.6)" />}
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  styled: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  icon: null,
  styled: {},
};

export default forwardRef(Input);
