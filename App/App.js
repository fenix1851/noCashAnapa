import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//const Splash = require("./src/screens/sections/startSection/Splash");
import Splash from './src/screens/sections/startSection/Splash';
//slider screens
import SliderScreenOne from "./src/screens/sections/startSection/slider/sliderScreenOne";
import SliderScreenTwo from "./src/screens/sections/startSection/slider/sliderScreenTwo";
import SliderScreenThree from "./src/screens/sections/startSection/slider/sliderScreenThree";
import SliderScreenFour from "./src/screens/sections/startSection/slider/sliderScreenFour";
import SliderScreenFive from "./src/screens/sections/startSection/slider/sliderScreenFive";
import SliderScreenSix from "./src/screens/sections/startSection/slider/sliderScreenSix";
import SliderScreenSeven from "./src/screens/sections/startSection/slider/sliderScreenSeven";

import Phone from "./src/screens/sections/startSection/auth/phone"
import Code from "./src/screens/sections/startSection/auth/code";

import BeachList from "./src/screens/sections/generalSection/lists/BeachList";
import HotelsList from "./src/screens/sections/generalSection/lists/HotelsList";

import Menu from './src/screens/Menu';

import Adding from './src/screens/Adding';

import General from './src/screens/sections/generalSection/GeneralScreen'; 
import Home from './src/screens/sections/generalSection/home';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import AppLoading from "expo-app-loading";
import { useFonts, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold
  });

  if (!fontsLoaded) {
    return <Splash />;
  }


  
  const Stack = createNativeStackNavigator()


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SliderScreenOne" component={SliderScreenOne} />
        <Stack.Screen name="SliderScreenTwo" component={SliderScreenTwo} />
        <Stack.Screen name="SliderScreenThree" component={SliderScreenThree} />
        <Stack.Screen name="SliderScreenFour" component={SliderScreenFour} />
        <Stack.Screen name="SliderScreenFive" component={SliderScreenFive} />
        <Stack.Screen name="SliderScreenSix" component={SliderScreenSix} />
        <Stack.Screen name="SliderScreenSeven" component={SliderScreenSeven} />
        <Stack.Screen name="Phone" component={Phone} />
        <Stack.Screen name="Code" component={Code} />

        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="Adding" component={Adding} />

        <Stack.Screen name="BeachList" component={BeachList} />
        <Stack.Screen name="HotelsList" component={HotelsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
