import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput({ name, ...rest }) {
  const { defaultValue, registerField, fieldName } = useField(name);

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField, fieldName]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview ||
            'https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif'
          }
          alt="Foto de perfil"
        />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
          name={name}
          {...rest}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
};
