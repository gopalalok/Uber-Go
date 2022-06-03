import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectDestination, selectTravelTimeInformation } from '../counter/counterSlice';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';



const data = [
  {
    id: "Mercedes-Benz-444",
    title: "Mercedes Benz",
    varient_price: 8.75,
    image: "https://i.postimg.cc/BbpmJprh/Mercedes-Benz.jpg"
  },
  {
    id: "mercedes-amg-g-555",
    title: "Mercedes Amg G",
    varient_price: 8.5,
    image: "https://i.postimg.cc/mgCFMkD4/mercedes-amg-g-63.jpg"
  },
  {
    id: "Uber-X-111",
    title: "UberX",
    varient_price: 1,
    image: "https://i.postimg.cc/KjtWtjVV/Uber-img.jpg"
  },
  {
    id: "Premier-222",
    title: "Premier",
    varient_price: 1.2,
    image: "https://i.postimg.cc/wMpgncLf/Premier.webp"
  },
  {
    id: "Sedan-Rentals-333",
    title: "Sedan Rentals",
    varient_price: 1.75,
    image: "https://i.postimg.cc/ZqhM6btN/Sedan-Rentals.webp"
  }
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const Tax_Rate = 2;

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={()=>navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item)=>item.id}
        renderItem={({item:{id, title, varient_price, image},item})=>(
          <TouchableOpacity
            onPress={()=>setSelected(item)}
            style={tw`flex-row justify-between items-center px-10
                    ${id === selected?.id && "bg-gray-200"}
            `}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source = {{uri:image}}
            />
            <View>
              <Text style={tw`text-base font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-base`}>
              {((travelTimeInformation?.duration?.value * Tax_Rate * varient_price)/10).toFixed(2)}
            </Text>
          </TouchableOpacity>
        )
        }
      />

      <View style={tw` mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})