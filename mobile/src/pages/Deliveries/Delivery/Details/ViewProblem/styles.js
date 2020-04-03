import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  top: -100px;
  margin: 20px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  height: 90%;
`;
