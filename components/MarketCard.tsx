import React from 'react';
import { View, Text, Dimensions, Image, Button } from 'react-native';
import HapticButton from './haptic-button';


function MarketCard({ data }: any) {



  return (
    <View style={{
      backgroundColor: '#f2f2f2ff',
      borderRadius: 20,
      padding: 20,
      margin: 10,
      flexDirection: 'column',
      shadowOpacity:1,
      gap: 30,
      shadowOffset:{height:5,width:5},
      shadowRadius:0,
      borderStyle:'solid',
      borderWidth:1,
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

          <Text style={{ color:'black', fontSize: 20, fontWeight: 500 }}>
            {data?.organization_name}
          </Text>
          <Text style={{ color:'black', fontSize: 10 }}>
            {data?.city}
          </Text>
        </View>
      </View>

      <Image height={200} style={{ width: '100%' }} borderRadius={10} src={data?.coverimage} />

      <View>
        <Text style={{ color:'black', fontSize: 12 }}>
          {data?.description}
        </Text>
        <Text style={{ color:'black', fontSize: 12 }}>
          {data?.bio}
        </Text>
        <Text style={{ color:'black', fontSize: 12 }}>
          {data?.about}
        </Text>
      </View>
      <HapticButton color={'white'} text={'Follow +'} />
    </View>
  );
}

export default MarketCard;
