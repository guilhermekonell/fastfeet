import { RNCamera } from 'react-native-camera';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  top: -100px;
  margin: 20px;
  justify-content: center;
`;

export const CameraWrapper = styled.View`
  height: 90%;
  border-radius: 4px;
  margin-bottom: 10px;
  background: #fff;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
`;

export const CameraButton = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.4);

  position: absolute;
  padding: 20px;
  border-radius: 100px;
  align-self: center;
  bottom: 25px;
`;

export const ClearButton = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  border-radius: 100px;
  align-self: center;
  right: 10px;
  top: 10px;
`;
