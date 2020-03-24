import React, { useRef } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';

import Header from '~/components/Form/Header';
import Input from '~/components/Form/Input';
import AvatarInput from './AvatarInput';

import { Container, Content, Field } from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function EditDeliveryman({ location }) {
  const { deliv: deliveryman } = location.state;
  const initialData = {
    name: deliveryman.name,
    email: deliveryman.email,
    avatar: deliveryman.avatar,
  };

  const formRef = useRef(null);

  async function handleUpdate({ name, email, avatar }) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Insira um email válido')
          .required('O email é obrigatório'),
      });

      await schema.validate({ name, email }, { abortEarly: false });

      const bodyParams = avatar
        ? { name, email, avatar_id: avatar || 1 }
        : { name, email };

      await api.put(`deliverymans/${deliveryman.id}`, bodyParams);
      toast.success('O entregador foi editado com sucesso');
      history.push('/deliveryman');
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
        <Header title="entregadores" path="deliveryman" />

        <Content>
          <AvatarInput name="avatar" />
          <Field>
            <strong>Nome</strong>
            <Input name="name" placeholder="Nome do entregador" />
          </Field>
          <Field>
            <strong>Email</strong>
            <Input name="email" placeholder="Email do entregador" />
          </Field>
        </Content>
      </Form>
    </Container>
  );
}

EditDeliveryman.propTypes = {
  location: PropTypes.element.isRequired,
};
