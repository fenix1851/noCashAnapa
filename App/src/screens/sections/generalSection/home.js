import { DrawerActions } from "@react-navigation/native";
import * as React from "react";

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
