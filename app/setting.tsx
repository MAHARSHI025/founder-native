import Header from '@/components/header'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Setting() {
    return (
        <>
            <SafeAreaView>
                <View style={{ paddingTop: 10 }}>
                    <Header text='Setting' />
                    <View style={{ paddingTop: 20 }}>
                        <View style={{ padding: 20,  borderBottomWidth: 1, borderTopWidth: 1,  display:'flex',alignItems:'center', flexDirection:'row', gap:5}}><MaterialIcons name='edit' size={20}/><Text style={{fontSize:20}}>Edit Profile</Text></View>
                        <View style={{ padding: 20,  borderBottomWidth: 1, display:'flex',alignItems:'center', flexDirection:'row', gap:5}}><MaterialIcons name='person' size={20}/><Text style={{fontSize:20}}>My contact</Text></View>
                        <View style={{ padding: 20,  borderBottomWidth: 1, display:'flex',alignItems:'center', flexDirection:'row', gap:5}}><MaterialIcons name='devices' size={20}/><Text style={{fontSize:20}}>Theme</Text></View>
                        <View style={{ padding: 20,  borderBottomWidth: 1, display:'flex',alignItems:'center', flexDirection:'row', gap:5}}><MaterialIcons name='logout' size={20}/><Text style={{fontSize:20}}>Logout</Text></View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

export default Setting
