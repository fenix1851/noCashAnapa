import { DrawerActions } from "@react-navigation/native";
import * as React from "react";
import axios from "axios";
import { StyleSheet, View } from "react-native";

import { Provider as PaperProvider } from "react-native-paper";
import {
  Button,
  Paragraph,
  TextInput,
  Portal,
  Dialog,
} from "react-native-paper";


export default function Home({navigation}) {
  axios
    .get(`http://45.8.230.89:8080/api/v1/getuser?phone=${global.phone}`)
    .then((responce) => {
      console.log();
      if (!responce.data.success) {
        axios
          .get(
            `http://45.8.230.89:8080/api/v1/registerPhone?phonenumber=${global.phone}&fio=${global.name}`
          )
          .then((responce) => {
            console.log(responce.data.success);
          });
      }
    });
  return (
    <PaperProvider>
      <Button onPress={()=>navigation.navigate('BeachList')}>
        Посмотреть пляжи
      </Button>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
});
