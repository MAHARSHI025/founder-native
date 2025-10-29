import React from 'react'
import { Text } from 'react-native'

function Header({component}:any) {
  return (
    <>
    <Text style={{ padding:15, fontSize:40, color:'white', fontWeight:700}}>Founder</Text>
      {component}
    </>
  )
}

export default Header
