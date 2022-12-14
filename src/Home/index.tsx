import { useState, useEffect, useRef } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { captureRef } from 'react-native-view-shot'
import { Camera, CameraType } from 'expo-camera';
import * as Sharing from 'expo-sharing'

import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { PositionChoice } from '../components/PositionChoice';

import { styles } from './styles';
import { POSITIONS, PositionProps } from '../utils/positions';

export function Home() {
  const [photo, setPhotoURI] = useState<null | string>(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [positionSelected, setPositionSelected] = useState<PositionProps>(POSITIONS[0])

  const cameraRef = useRef<Camera>(null)
  const screenShotRef = useRef(null)

  async function handleTakePicture() {
    const photo = await cameraRef.current.takePictureAsync()
    setPhotoURI(photo.uri)
  }

  async function shareScreenShot() {
    const screenShot = await captureRef(screenShotRef)
    await Sharing.shareAsync("file://" + screenShot)
  }


  useEffect(() => {
    Camera.requestCameraPermissionsAsync()
      .then(response => setHasCameraPermission(response.granted))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View ref={screenShotRef} style={styles.sticker}>
          <Header position={positionSelected} />

          <View style={styles.picture}>
            {
              hasCameraPermission && !photo ?
                <Camera
                  ref={cameraRef}
                  style={styles.camera}
                  type={CameraType.front} />
                : <Image
                  source={{ uri: photo ? photo : 'https://howto-connect.com/wp-content/uploads/Fix-Windows-10-Camera-not-working.png' }}
                  style={styles.camera}
                  onLoad={shareScreenShot}
                />
            }
            <View style={styles.player}>
              <TextInput
                placeholder="Digite seu nome aqui"
                style={styles.name}
              />
            </View>
          </View>
        </View>

        <PositionChoice
          onChangePosition={setPositionSelected}
          positionSelected={positionSelected}
        />

        <TouchableOpacity onPress={() => setPhotoURI(null)}>
          <Text style={styles.retry}>
            Nova Foto
          </Text>
        </TouchableOpacity>


        <Button title="Compartilhar" onPress={handleTakePicture} />
      </ScrollView>
    </SafeAreaView>
  );
}