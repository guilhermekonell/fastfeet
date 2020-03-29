import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  top: -100px;
  margin: 20px;
`;

export const Info = styled.View`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 5px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const HeaderText = styled.Text`
  color: #7159c1;
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
`;

export const Detail = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999999;
  margin-bottom: 3px;
`;

export const Text = styled.Text`
  color: #666666;
  margin-bottom: 10px;
`;

export const Dates = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Date = styled.View``;

export const Options = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background: #f8f9fd;
  border-radius: 4px;
  border: 1px solid #eee;
`;

export const Option = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  width: 33.33%;
  padding: 15px 0;
`;

export const OptionText = styled.Text`
  font-size: 12px;
  color: #999999;
`;
