import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Text style={{ color: 'white', fontSize: 60, fontFamily: 'MozillaHeadline-bold' }}>FOUNDER</Text>
        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'MozillaHeadline-Regular' }}>for B-to-B connection</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
