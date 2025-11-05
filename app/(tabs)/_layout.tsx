import { NativeTabs, useTabTriggerProps } from 'expo-router/unstable-native-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

function TabButton({ name, label, icon }: { name: string; label: string; icon: string }) {
  const { isSelected } = useTabTriggerProps(name);
  const color = isSelected ? '#007AFF' : 'gray'; // Active blue for iOS feel

  return (
    <NativeTabs.Trigger name={name}>
      <View style={{ alignItems: 'center' }}>
        <MaterialIcons name={icon as any} size={24} color={color} />
        <Text style={{ color }}>{label}</Text>
      </View>
    </NativeTabs.Trigger>
  );
}

export default function TabLayout() {
  return (
    <NativeTabs>
      <TabButton name="index" label="Home" icon="home" />
      <TabButton name="market" label="Market" icon="shopping-cart" />
      <TabButton name="profile" label="Profile" icon="person" />
    </NativeTabs>
  );
}
