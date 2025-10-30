import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface Props {
  onFinish: () => void;
}

const CustomSplashScreen: React.FC<Props> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // move to app after custom splash time
    }, 5000); // 2 seconds (change if needed)

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor:'white' }}>
        <View style={styles.container}>
          <LottieView
            source={require("@/assets/lottie/Loader_cat.json")}
            autoPlay
            loop // loop is okay for tabs
            style={styles.animation}
          />
        </View>
        <Text style={{ fontSize: 60, fontFamily: 'MozillaHeadline-bold' }}>FOUNDER</Text>
        <Text style={{ fontSize: 20, fontFamily: 'MozillaHeadline-Regular' }}>for B-to-B connection</Text>
      </View>
    </>
  );
}

export default CustomSplashScreen

const styles = StyleSheet.create({
   container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  animation: {
    width: 300,   // ✅ Required
    height: 300,  // ✅ Required
  },
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
