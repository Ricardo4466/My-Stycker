import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
    paddingTop: 24
  },
  scroll: {
    paddingBottom: 150
  },
  picture: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 24,
    padding: 5
  },
  camera: {
    width: Dimensions.get("screen").width - 58,
    borderRadius: 10,
    height: 300
  },
  player: {
    width: '100%',
    backgroundColor: '#FFF',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
    textTransform: 'uppercase'
  },
  sticker: {
    backgroundColor: '#363636',
  },
  retry: {

    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    alignSelf: "center",
    marginVertical: 22,
    marginBottom: 10
  }
});