import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin } from '../counter/counterSlice'


const data=[
  {
      id:'111',
      icon:'home',
      location:'Home',
      destination:'Code Street, London, UK'
  },
  {
      id:'222',
      icon:'briefcase',
      location:'Work',
      destination:'London Eye, London, UK'
  }
]

const NavFavourites = () => {
  
  const data=[
    {
        id:'111',
        icon:'home',
        location:'Home',
        destination:'Chak Chaka, Cooch Behar, West Bengal'
    },
    {
        id:'222',
        icon:'briefcase',
        location:'Work',
        destination:'Developed by Gopal'
    }
  ]
  return (
    <View>
      
    <FlatList
      data={data}
      keyExtractor={(item)=>item.id}
      ItemSeparatorComponent={()=>(
        <View style={[tw `bg-gray-200`,{height:0.5}]} />
      )}
      
      renderItem = {({item:{location, destination, icon}})=>(
        <TouchableOpacity style={tw `flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
        />
        <View>
          <Text style={tw`font-semibold text-lg`}>{location}</Text>
          
          <Text style={tw`text-gray-500`}>
            {destination}
          </Text>
        </View>
        </TouchableOpacity>
      )}
    />
    </View>
  )
}

export default NavFavourites

const styles = StyleSheet.create({})