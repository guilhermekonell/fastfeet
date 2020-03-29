import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 20px 15px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Description = styled.Text`
  color: #666666;
  font-size: 16px;
  width: 75%;
`;

export const Date = styled.Text`
  color: #999999;
  font-size: 12px;
  width: 25%;
  text-align: right;
`;
