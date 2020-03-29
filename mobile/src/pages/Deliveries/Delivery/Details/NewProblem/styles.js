import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  top: -100px;
  margin: 20px;
`;

export const Input = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 15,
  textAlignVertical: 'top',
})`
  border: 1px solid #eee;
  background: #fff;
  padding: 20px;
  font-size: 16px;
  border-radius: 4px;
  margin-bottom: 10px;
`;
