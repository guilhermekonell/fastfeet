import React, { useRef } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';

import Header from '~/components/Form/Header';
import Input from '~/components/Form/Input';
import AvatarInput from '../AvatarInput';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Field } from './styles';

export default function NewDeliveryman() {
  const formRef = useRef(null);

  async function handleSubmit({ name, email, avatar }) {
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
        ? { name, email, avatar_id: avatar }
        : { name, email };

      await api.post(`/deliverymans`, bodyParams);
      toast.success('O entregador foi criado com sucesso');
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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Header title="Cadastro de entregadores" path="deliveryman" />

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
