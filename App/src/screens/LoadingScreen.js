import * as React from "react";

import {StyleSheet,View,TouchableOpacity, ImageBackground,Text,} from "react-native";
var splash = require('./splash.webp');
export default function Splash({navigation}) {

  const image = { uri: "./src/assets/images/splash.webp" };

  const touchableOpacityHandler = () => {
   
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container}
        onPress={()=> navigation.navigate("SliderScreen")}
        activeOpacity={1}
      >
        <ImageBackground
          style={styles.container}
          source={splash}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1
  },
  button: {},
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
