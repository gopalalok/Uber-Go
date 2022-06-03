import { StyleSheet, Text, View,Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../counter/counterSlice';


const data=[
    {
        id:'111',
        title:'Get a Ride',
        image:'https://i.postimg.cc/9FqqRtq8/Uber-img2.jpg',
        screen:'MapScreen'
    },
    {
        id:'222',
        title:'Order Food',
        image:'https://i.postimg.cc/jqpYggVH/online-food-order-logo-icon.jpg',
        screen:'EatScreen'
    }
]

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList
            data = {data}
            horizontal
            keyExtractor = {(item)=>item.id}
            renderItem = {({item}) =>(
                <TouchableOpacity
                    onPress={()=>navigation.navigate(item.screen)} 
                    style={tw`pl-6 pb-4 pt-4 bg-green-200 m-2 w-44 `}
                    disabled ={!origin || item.screen == 'EatScreen'}
                    >
                    
                    <View style={tw`${!origin && "opacity-20"}`}>
                        <Image

                            style={{
                                width:130,
                                height:80,
                                resizeMode:'cover',
                                
                            }}
                            source ={{
                                uri: item.image
                            }}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold text-center`}>{item.title}</Text>
                        <Icon
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        name='arrowright'
                        color="white"
                        type='antdesign'
                        />
                    </View>
                </TouchableOpacity>
            )}

         />   
      )
}


export default NavOptions;