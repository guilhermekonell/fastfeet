import React from 'react';
import { Text } from 'react-native';
import Input from '~/components/Input';

// import { Container } from './styles';

export default function SignIn() {
  return (
    <>
      <Text>SignIn</Text>

      <Input icon="call" palceholder="Digite seu nome" />
    </>
  );
}
