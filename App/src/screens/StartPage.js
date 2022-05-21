import * as React from "react";

import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import {Button} from 'react-native-paper'

export default function StartPage({ navigation }) {
    const buyerButtonHandler =()=>{
        navigation.navigate('BuyerHomeScreen')
    }
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Button mode="outlined" style={styles.button} onPress={buyerButtonHandler}>
          Я покупатель
        </Button>
        <Button mode="outlined" style={styles.button}>
          Я продавец
        </Button>
      </View>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', 
        backgroundColor: '#eee'
    },
    button: {
        marginBottom: 10,
    }
})