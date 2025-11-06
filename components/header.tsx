import React from 'react';
import { Text, View } from 'react-native';

function Header({ component, text }: { component?: React.ReactNode; text: string }) {
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    }}>
      <Text
        style={{
          fontSize: 30,
          color: 'black',
          fontFamily: 'MozillaHeadline-Bold',
        }}
      >
        {text}
      </Text>
      {component}
    </View>
  );
}

export default Header;
