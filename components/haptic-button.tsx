import React from "react";
import { Pressable, Text } from "react-native";
import * as Haptics from "expo-haptics";

export default function HapticButton({ color = "#000", text = "Click", onPress }: any) {
  const handlePress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); 
    if (onPress) onPress(); 
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        backgroundColor: color,
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontWeight: "600", fontSize: 16 }}>
        {text}
      </Text>
    </Pressable>
  );
}
