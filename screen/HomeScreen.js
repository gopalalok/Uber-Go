import { StyleSheet, Text, View,Image, SafeAreaView } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../counter/counterSlice';
import NavFavourites from '../components/NavFavourites';


const HomeScreen = () => 
{
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white pr-2`}>
            <View style={tw`p-5 `}>
                <Image

                    style={{
                        width:100,
                        height:80,
                        resizeMode:'contain'
                    }}
                    source ={{
                        uri:"https://i.postimg.cc/RZvPJZSW/uber.jpg"
                    }}
                />
            </View>
            
            <GooglePlacesAutocomplete
                placeholder='Where From?'
                styles={{
                    container:{
                        flex:0
                    },
                    textInput:{
                        fontSize:18,
                    }
                }}
                query={{
                    key: 'AIzaSyB50gr7d3vz2WpttutfAitNLBkIiX6P_gQ',
                    language: 'en',
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
                minLength={2}
                fetchDetails={true}
                onPress={(data,details = null)=>{
                    dispatch(
                        setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                        })
                    );

                    dispatch(setDestination(null));
                }}
                enablePoweredByContainer={false}
                returnKeyType={"search"}
                />

            <NavOptions />

            <NavFavourites />

        </SafeAreaView>
    );
}
    

  export default HomeScreen;