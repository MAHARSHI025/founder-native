import ContactCard from '@/components/contact-card';
import { AuthContext } from '@/context/userContext';
import axios from 'axios';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useContext, useState } from 'react'
import { ScrollView, Text } from 'react-native'

function contact() {

  const { userToken, user, loading, logout }: any = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState<any>([])

  useFocusEffect(
    useCallback(() => {
      if (!loading && !userToken) {
        router.push("/login");
      } else {
        const getData = async () => {
          const response: any = await axios.post('https://founder-weld.vercel.app/api/contact/get', { email: user?.email })
          // console.log(response.data);
          setData(response.data.user.contacts)
        }
        getData()
      }
    }, [loading, userToken])
  );
  return (
    <>
      <ScrollView >

        {data.map((con: any,i:any) =>
          <ContactCard data={con} key={i}/>
        )}
      </ScrollView>
    </>
  )
}

export default contact
