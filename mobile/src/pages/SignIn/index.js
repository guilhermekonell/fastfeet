import React from 'react';
import { Text } from 'react-native';
import Input from '~/components/Input';
import Button from '~/components/Button';

// import { Container } from './styles';

export default function SignIn() {
  return (
    <>
      <Text>SignIn</Text>

      <Input icon="call" palceholder="Digite seu nome" />

      <Button>Entrar</Button>
    </>
  );
}
