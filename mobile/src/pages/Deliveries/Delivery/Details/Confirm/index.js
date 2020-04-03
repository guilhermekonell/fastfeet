import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '~/components/Button';
import Background from '~/components/Background';

import api from '~/services/api';

import {
  Container,
  Content,
  CameraWrapper,
  Camera,
  CameraButton,
  ClearButton,
} from './styles';

export default function ConfirmDelivery() {
  // eslint-disable-next-line prefer-const
  let cameraRef = useRef(null);
  const [image, setImage] = useState('');
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();

  async function takePicture() {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage(data.uri);
    }
  }

  async function clearPicture() {
    setImage('');
    cameraRef = null;
  }

  async function handleSubmit() {
    if (image) {
      const file = new FormData();
      file.append('file', {
        type: 'image/jpg',
        uri: image,
        name: 'assignature.jpg',
      });

      await api.put(`delivery/${id}/end`, file);

      navigation.navigate('Entregas');
    }
  }

  return (
    <Container>
      <Background />

      <Content>
        {image ? (
          <>
            <CameraWrapper>
              <Image source={{ uri: image }} style={{ height: '100%' }} />
              <ClearButton onPress={clearPicture}>
                <Icon name="close" color="#fff" size={30} />
              </ClearButton>
            </CameraWrapper>
            <Button background="#7159c1" onPress={handleSubmit}>
              Enviar
            </Button>
          </>
        ) : (
          <CameraWrapper>
            <Camera ref={cameraRef} type="back" captureAudio={false} />
            <CameraButton onPress={takePicture}>
              <Icon name="photo-camera" color="#fff" size={30} />
            </CameraButton>
          </CameraWrapper>
        )}
      </Content>
    </Container>
  );
}
