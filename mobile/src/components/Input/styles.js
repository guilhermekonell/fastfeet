import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  height: 46px;
  padding: 0 15px;

  border-radius: 4px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  font-size: 15px;
  height: 45px;
  margin-left: 10px;
`;
