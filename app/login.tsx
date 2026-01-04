import LoginScreen from '@/components/login-screen'
import SignupScreen from '@/components/signup-screen'
import { ThemedView } from '@/components/themed-view'
import { AuthContext } from '@/context/userContext'
import { useFocusEffect, router } from 'expo-router'
import React, { useCallback, useContext, useState } from 'react'
import { Button, Text } from 'react-native'

function Login() {

    const [action, setAction] = useState('login')
    const { userToken, user, loading, logout }: any = useContext(AuthContext);

    useFocusEffect(
        useCallback(() => {
            if (userToken) {
                router.replace("/");
            }
        }, [loading, userToken])
    );

    if (action === 'signup') {
        return (
            <>
                <SignupScreen setAction={setAction} />
            </>
        )
    }

    return (
        <>
            <LoginScreen setAction={setAction} />
        </>
    )
}

export default Login
