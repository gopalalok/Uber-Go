import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import {GOOGLE_MAPS_APIKEY} from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectDestination, setDestination, setOrigin } from '../counter/counterSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';



const NavigateCard = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const destination = useSelector(selectDestination);

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Happy Journey</Text>
            
            <View style={tw `border-t border-gray-200 flex-shrink`}>
                <View>
                
                    <GooglePlacesAutocomplete
                        placeholder='where to?'
                        styles={toInputBoxStyles}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
                        minLength={2}
                        fetchDetails={true}
                        onPress={(data,details = null)=>{
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description,
                                })
                            );
        
                            navigation.navigate("RideOptionsCard");
                        }}
                        enablePoweredByContainer={false}
                        returnKeyType={"search"}
                        query={{
                            key: 'AIzaSyB50gr7d3vz2WpttutfAitNLBkIiX6P_gQ',
                            language: 'en',
                        }}
                    />
                </View>
                <NavFavourites />
            </View>
            
            <View
                style={tw`${!destination && 'hidden'} flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
            >
                <TouchableOpacity
                    onPress={()=>navigation.navigate('RideOptionsCard')}
                    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                >
                    <Icon name='car' type='font-awesome' color='white' zise={16}/>
                    <Text style={tw `text-white text-center`} >Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
                >
                    <Icon name='fast-food-outline' type='ionicon' color='black' zise={16}/>
                    <Text style={tw `text-center`} >Eats</Text> 
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        paddingTop: 20,
        flex : 0,
    },
    textInput:{
        backgroundColor:"#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer:{
        paddingHorizontal:20,
        paddingBottom:0,
    }
})