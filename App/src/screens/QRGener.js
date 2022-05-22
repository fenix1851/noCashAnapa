import { DrawerActions } from "@react-navigation/native";
import * as React from "react";
import axios from "axios";
import { StyleSheet, View,} from "react-native";

import {qrcode} from 'qrcode'

import * as Linking from "expo-linking";

import { Provider as PaperProvider } from "react-native-paper";
import {
  Button,
  Text,
  Paragraph,
  TextInput,
  Portal,
  Dialog,
} from "react-native-paper";
import { TouchableOpacity } from "react-native-web";

export default function QRGener({ navigation }) {
  return (
    <PaperProvider>
      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          paddingTop: 15,
          paddingLeft: 26,
          paddingRight: 17,
          backgroundColor: "#fff",
        }}
      >
        <Button
          icon="arrow-left"
          color="#2F80ED"
          style={{ position: "absolute", top: 22, left: 10 }}
          onPress={()=>{navigation.goBack()}}
        />
        </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
