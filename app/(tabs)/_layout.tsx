import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '.';
import Market from './market';
import ProfileTab from './profile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#f9f6ff',
          borderTopWidth: 0,
          elevation: 5,
          height: 80,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontFamily: '', // 👈 your custom font
          fontSize: 12,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = 'home';
          if (route.name === 'index') iconName = 'home';
          else if (route.name === 'market') iconName = 'apartment';
          else if (route.name === 'profile') iconName = 'person';
          return (
            <MaterialIcons
              name={iconName}
              size={focused ? 32 : 30}
              color={focused ? '#000000ff' : 'gray'}
            />
          );
        },
        tabBarActiveTintColor: '#000000ff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="index" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="market" component={Market} options={{ title: 'Market' }} />
      <Tab.Screen name="profile" component={ProfileTab} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
