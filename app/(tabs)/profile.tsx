import React, { useEffect } from "react";
import { Button, View, Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

// Handle how notifications behave when received
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Profile() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  // Ask for permission to show notifications
  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Enable notifications to receive alerts!"
        );
        return;
      }

      console.log("Notification permissions granted ✅");
    } else {
      Alert.alert(
        "Physical device required",
        "Notifications only work on a real device"
      );
    }
  }

  // Send a notification immediately
  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🚀 Hello from Expo!",
        body: "This is a local notification 🎉",
        sound: true,
      },
      trigger: null, // Show immediately
    });
  };

  // Or schedule a notification after 5 seconds (example)
//   const sendDelayedNotification = async () => {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "⏰ Reminder!",
//         body: "This notification appears after 5 seconds.",
//       },
//       trigger: { seconds: 5 },
//     });
//   };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Button title="Send Notification Now" onPress={sendNotification} />
      {/* <Button
        title="Send Notification After 5s"
        onPress={sendDelayedNotification}
      /> */}
    </View>
  );
}
