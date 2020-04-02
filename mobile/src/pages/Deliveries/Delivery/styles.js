import styled from 'styled-components/native';

export const Container = styled.View`
  border: 2px solid #eee;
  border-radius: 4px;
  margin: 10px 0;
`;

export const Title = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const Name = styled.Text`
  margin-left: 10px;
  font-weight: bold;
  color: #7159c1;
  font-size: 20px;
`;

export const Progress = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 30px 45px;
`;

export const Line = styled.View`
  width: 100%;
  height: 2px;
  background: #7159c1;
  position: absolute;
  top: 4px;
`;

export const Status = styled.View`
  align-items: center;
`;

export const Point = styled.View`
  width: 10px;
  height: 10px;
  border: 1px solid #7159c1;
  border-radius: 5px;
  background: ${(props) => (props.filled ? '#7159c1' : '#fff')};
`;

export const PointName = styled.Text`
  position: absolute;
  width: 70px;
  margin-top: 15px;
  font-size: 12px;
  left: -18px;
  color: #999;
`;

export const Infos = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #eee;
  padding: 20px 10px;
`;

export const Info = styled.View``;

export const InfoName = styled.Text`
  font-size: 12px;
  color: #999;
`;

export const InfoField = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const ViewDetail = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #7159c1;
`;
