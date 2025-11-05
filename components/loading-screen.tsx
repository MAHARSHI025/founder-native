import LottieView from 'lottie-react-native'
import React from 'react'
import { View } from 'react-native'

function LoadingScreen() {
    return (
        <>
            <View style={{ display: 'flex', flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <LottieView source={require('@/assets/lottie/Loader.json')}

                    autoPlay
                    loop // loop is okay for tabs
                    style={{ height: 100, width: 100 }}
                />
            </View>
        </>
    )
}

export default LoadingScreen
