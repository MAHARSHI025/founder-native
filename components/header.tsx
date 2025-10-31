import React from 'react'
import { Text } from 'react-native'

function Header({component}:any) {
  return (
    <>
    <Text style={{ padding:10, fontSize:30, color:'black', fontWeight:700, fontFamily: 'MozillaHeadline-bold'}}>Founder</Text>
      {component}
    </>
  )
}

export default Header
