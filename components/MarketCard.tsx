import React from 'react';
import { View, Text, Dimensions, Image, Button } from 'react-native';
import HapticButton from './haptic-button';


function MarketCard({ data }: any) {



  return (
    <View style={{
      backgroundColor: '#3a3a3aff',
      borderRadius: 20,
      padding: 20,
      margin: 10,
      flexDirection: 'column',
      gap: 30,
    }}>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Image borderRadius={50} height={50} width={50} src={data?.profileimage} />
        <View>

          <Text style={{ color: 'white', fontSize: 20, fontWeight: 500 }}>
            {data?.organization_name}
          </Text>
          <Text style={{ color: 'white', fontSize: 10 }}>
            {data?.city}
          </Text>
        </View>
      </View>

      <Image height={200} style={{ width: '100%' }} borderRadius={10} src={data?.coverimage} />

      <View>
        <Text style={{ color: 'white', fontSize: 10 }}>
          {data?.description}
        </Text>
        <Text style={{ color: 'white', fontSize: 10 }}>
          {data?.bio}
        </Text>
        <Text style={{ color: 'white', fontSize: 10 }}>
          {data?.about}
        </Text>
      </View>
      <HapticButton color={'white'} text={'Follow +'} />
    </View>
  );
}

export default MarketCard;
