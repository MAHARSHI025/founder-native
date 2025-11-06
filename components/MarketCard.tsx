import React from 'react';
import { View, Text, Image } from 'react-native';
import HapticButton from './haptic-button';

function MarketCard({ data }: any) {

  return (

      <View style={{
        backgroundColor: '#f2f2f2ff',
        borderRadius: 20,
        padding: 20,
        margin: 10,
        marginHorizontal: 20,
        flexDirection: 'column',
        shadowOpacity: 1,
        gap: 30,
        shadowOffset: { height: 5, width: 5 },
        shadowRadius: 0,
        borderStyle: 'solid',
        borderWidth: 1,
        elevation: 5
      }}>

        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
          <Image
            source={{ uri: data?.profileimage }}
            style={{ height: 50, width: 50, borderRadius: 50 }}
          />
          <View>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '700' }}>
              {data?.organization_name}
            </Text>
            <Text style={{ color: 'black', fontSize: 10 }}>
              {data?.city}
            </Text>
          </View>
        </View>

        <Image
          source={{ uri: data?.coverimage }}
          style={{ width: 'auto', height: 200, borderRadius: 10 }}

        />

        <View>
          <Text style={{ color: 'black', fontSize: 12 }}>
            {data?.description}
          </Text>
          <Text style={{ color: 'black', fontSize: 12 }}>
            {data?.bio}
          </Text>
          <Text style={{ color: 'black', fontSize: 12 }}>
            {data?.about}
          </Text>
        </View>

        <HapticButton color={'white'} text={'Follow +'} />

      </View>

  );
}

export default MarketCard;
