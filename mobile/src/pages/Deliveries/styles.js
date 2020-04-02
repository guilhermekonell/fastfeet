import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 30px 30px 0 30px;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Info = styled.View`
  margin-left: 15px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 26px;
  color: #333;
`;

export const Page = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
`;

export const PageName = styled.Text`
  font-weight: bold;
  font-size: 24px;
  color: #333;
`;

export const Show = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Option = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
  color: ${(props) => (props.selected ? '#7159c1' : '#333')};
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-bottom: 30px;
`;

export const Loading = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const NoOrders = styled.Text`
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
`;
