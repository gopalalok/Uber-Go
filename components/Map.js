import { StyleSheet, Text, View } from 'react-native'
import React ,{ useRef, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../counter/counterSlice';
import MapViewDirections from 'react-native-maps-directions';

const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const travelTimeInformation = useSelector(setTravelTimeInformation);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const GOOGLE_MAPS_APIKEY ='AIzaSyB50gr7d3vz2WpttutfAitNLBkIiX6P_gQ'

    useEffect(()=>{
        if(!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(["origin","destination"],{
            edgePadding:{top:50, right:50, bottom:50, left:50},
        });
    },[origin, destination]);

    useEffect(()=>{

        if(!origin || !destination) return;

        const getTravelTime = async()=>{
            
            await fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&units=imperial&key=AIzaSyB50gr7d3vz2WpttutfAitNLBkIiX6P_gQ`,
                )
                .then((res)=>res.json())
                .then((data)=>{
                    
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                });
            
        }
        getTravelTime();
        
            
    },[origin, destination, GOOGLE_MAPS_APIKEY])

    return (
    <MapView
        ref = {mapRef}
        style={tw`flex-1`}
        initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    }}
    >
        {origin && destination &&(
            <MapViewDirections
                origin={origin.description}
                destination = {destination.description}
                apikey = {GOOGLE_MAPS_APIKEY}
                strokeWidth = {3}
                strokeColor="black"
            />
        )}
        {origin?.location &&(
            <Marker
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                title="Origin"
                description={origin.description}
                identifier={'origin'}
            />
        )}

        {destination?.location &&(
            <Marker
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
                title="Destination"
                description={origin.description}
                identifier={'destination'}
            />
        )}
    </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})