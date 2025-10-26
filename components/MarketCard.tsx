import React from 'react';
import { View, Text, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

function MarketCard({ data }: any) {
  return (
    <View
      style={{
        width: width *0.95,
        height: height * 0.84,
        backgroundColor: '#3a3a3aff',
        borderRadius: 10,
        padding: 8,
        alignItems: 'flex-start',
        marginHorizontal: 10, // spacing between cards
      }}
    >
      <View style={{ position: 'relative' }}>
        <Image 
          source={{ uri: data?.coverimage }}
          style={{ height: height * 0.3, width: width * 0.95  - 15, borderRadius: 10 }}
        />
        <Image 
          source={{ uri: data?.profileimage }}
          style={{ 
            height: 100, 
            width: 100, 
            borderRadius: 50, 
            position: 'absolute', 
            top: 200, 
            left: 10 
          }} 
        />
      </View>
      <Text style={{ color: 'white', fontSize: 40, marginTop: 50 }}>
        {data?.organization_name}
      </Text>
    </View>
  );
}

export default MarketCard;
