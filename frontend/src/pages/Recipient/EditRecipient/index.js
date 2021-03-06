import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import Header from '~/components/Form/Header';
import Input from '~/components/Form/Input';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Field } from './styles';

export default function EditRecipient({ location }) {
  const { recip } = location.state;
  const initialData = {
    name: recip.name,
    street: recip.street,
    street_number: recip.street_number,
    complement: recip.complement,
    city: recip.city,
    state: recip.state,
    zip_code: recip.zip_code,
    neighborhood: recip.neighborhood,
  };

  const formRef = useRef(null);

  async function handleUpdate({
    name,
    street,
    street_number,
    complement,
    city,
    state,
    zip_code,
    neighborhood,
  }) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        street: Yup.string().required('A rua é obrigatório'),
        street_number: Yup.string().required('O número é obrigatório'),
        complement: Yup.string().required('O complemento é obrigatório'),
        city: Yup.string().required('A cidade é obrigatório'),
        state: Yup.string().required('O estado é obrigatório'),
        zip_code: Yup.string().required('O CEP é obrigatório'),
        neighborhood: Yup.string().required('O bairro é obrigatório'),
      });

      await schema.validate(
        {
          name,
          street,
          street_number,
          complement,
          city,
          state,
          zip_code,
          neighborhood,
        },
        { abortEarly: false }
      );

      await api.put(`recipients/${recip.id}`, {
        name,
        street,
        street_number,
        complement,
        city,
        state,
        zip_code,
        neighborhood,
      });
      toast.success('O destinatário foi editado com sucesso');
      history.push('/recipient');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = {};

        err.inner.forEach(error => {
          errors[error.path] = error.message;
        });

        formRef.current.setErrors(errors);
      }
    }
  }

  return (
    <Container>
      <Form initialData={initialData} ref={formRef} onSubmit={handleUpdate}>
        <Header title="Edição de destinatários" path="recipient" />

        <Content>
          <Field>
            <strong>Nome</strong>
            <Input name="name" placeholder="Nome do destinatárío" />
          </Field>
          <div>
            <Field>
              <strong>Rua</strong>
              <Input name="street" placeholder="Rua" />
            </Field>
            <Field>
              <strong>Número</strong>
              <Input name="street_number" placeholder="Número" />
            </Field>
            <Field>
              <strong>Complemento</strong>
              <Input name="complement" placeholder="Complemento" />
            </Field>
          </div>
          <div>
            <Field>
              <strong>Cidade</strong>
              <Input name="city" placeholder="Cidade" />
            </Field>
            <Field>
              <strong>Estado</strong>
              <Input name="state" placeholder="Estado" />
            </Field>
          </div>
          <div>
            <Field>
              <strong>Bairro</strong>
              <Input name="neighborhood" placeholder="Bairro" />
            </Field>
            <Field>
              <strong>CEP</strong>
              <Input mask="99.999-999" name="zip_code" placeholder="CEP" />
            </Field>
          </div>
        </Content>
      </Form>
    </Container>
  );
}

EditRecipient.propTypes = {
  location: PropTypes.element.isRequired,
};
