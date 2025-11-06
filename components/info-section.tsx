import React from 'react'
import { Text, View } from 'react-native'

function InfoSection({ title, content }: any) {
    return (
        <>
            <View style={{ borderWidth:1, padding:10, borderRadius:15, paddingHorizontal:20}}>
                <Text style={{ fontWeight:'600'}}>{title}</Text>
                <Text style={{ fontWeight:'400'}}>{content}</Text>
            </View>
        </>
    )
}

export default InfoSection
