import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native';

function ContactCard({ data }: any) {

    const router = useRouter()

    return (
        <View style={{
            backgroundColor: '#f2f2f2ff',
            borderRadius: 20,
            padding: 20,
            margin: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            shadowOpacity: 1,
            gap: 10,
            shadowOffset: { height: 2, width: 2 },
            shadowRadius: 0,
            borderStyle: 'solid',
            borderWidth: 1,
            elevation: 5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>

            <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                <Image
                    source={{ uri: data?.profileimage }}
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                />
                <View>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '700' }}>
                        {data?.organization_name}
                    </Text>
                    <Text style={{ color: 'black', fontSize: 10 }}>
                        {data?.city}
                    </Text>
                </View>
            </View>

            <Pressable style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 8,
                display: 'flex',
                shadowOpacity: 1,
                shadowOffset: { height: 1, width: 1 },
                borderStyle: 'solid',
                borderWidth: 1,
                shadowRadius: 0,
                justifyContent: 'center',
                alignItems: 'center'
            }}
                onPress={() => router.push({ pathname: '/chat', params: { user:JSON.stringify(data) } })}
            >
                <MaterialIcons name='chat' size={20} />
            </Pressable>


        </View>
    )
}

export default ContactCard
