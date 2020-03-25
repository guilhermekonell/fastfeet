import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import InputMask from 'react-input-mask';

import { Container } from './styles';

export default function Input({ name, mask = '', ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, inputRef, fieldName]);

  return (
    <>
      {mask ? (
        <Container>
          <InputMask
            mask={mask}
            ref={inputRef}
            defaultValue={defaultValue}
            {...rest}
          />
          {error && <span>{error}</span>}
        </Container>
      ) : (
        <Container>
          <input ref={inputRef} defaultValue={defaultValue} {...rest} />
          {error && <span>{error}</span>}
        </Container>
      )}
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  mask: PropTypes.string,
};
