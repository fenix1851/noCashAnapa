import { DrawerActions } from "@react-navigation/native";
import * as React from "react";
import axios from "axios";
import { StyleSheet, View, ImageBackground } from "react-native";
import SwitchSelector from "react-native-switch-selector";

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
import "../../../../gobal";

export default function Home({navigation}) {
  console.log(Linking.createURL('./src/assets/Menu.js'))
  axios
    .get(
      `https://9e2e-5-23-54-55.eu.ngrok.io/api/v1/getuser?phone=${global.phone}`
    )
    .then((responce) => {
      console.log();
      if (!responce.data.success) {
        axios
          .get(
            `https://9e2e-5-23-54-55.eu.ngrok.io/api/v1/registerPhone?phonenumber=${global.phone}&fio=${global.name}`
          )
          .then((responce) => {
            console.log(responce.data.success);
          });
      }
    });
    const options = [
      {
        label: "места",
        value: "1",
        testID: "switch-one",
        accessibilityLabel: "switch-one",
      },
      {
        label: "карта",
        value: "2",
        testID: "switch-two",
        accessibilityLabel: "switch-two",
      },
    ];
  return (
    <PaperProvider>
      <View
        style={{
          alignItems: "center",
          paddingTop: 67,
          height: "100%",
          backgroundColor: "#fff",
        }}
      >
        <Button
          icon="menu"
          contentStyle={{ width: 30, height: 20 }}
          style={{ position: "absolute", top: 22, left: 19 }}
          color="#2F80ED"
          onPress={() => navigation.navigate("Menu")}
        ></Button>
        <SwitchSelector
          options={options}
          initial={0}
          textColor={"#2F80ED"} //'#7a44cf'
          selectedColor={"#fff"}
          buttonColor={"#2F80ED"}
          borderColor={"transparent"}
          hasPadding
          onPress={(value) => console.log(`Call onPress with value: ${value}`)}
          style={{
            width: 305,
            textTransform: "uppercase",
            fontSize: 14,
            letterSpacing: 1.25,
            borderColor: "#eee",
            borderWidth: 1,
            borderRadius: 42,
          }}
        />

        <View
          style={{
            maxWidth: "90%",
            maxHeight: "30%",
            height: "25%",
            width: "90%",
            marginTop: 30,
          }}
        >
          <ImageBackground
            source={require("./1.webp")}
            resizeMode="cover"
            style={{
              flex: 1,
              alignItems: "center",
              paddingTop: 30,
              paddingBottom: 30,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BeachList");
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "600",
                  letterSpacing: "0.4",
                }}
              >
                Разработано в рамках Хакатона 2022
              </Text>
              <Button
                style={{ borderRadius: 25 }}
                mode="contained"
                labelStyle={{ textTransform: "none" }}
                color="#fff"
              >
                Доставка на пляж
              </Button>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View
          style={{
            width: "90%",
            height: "20%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <View style={{ width: "47%", height: "100%" }}>
            <ImageBackground
              source={require("./2.webp")}
              resizeMode="cover"
              style={{
                flex: 1,
              }}
            ></ImageBackground>
          </View>
          <View style={{ width: "47%", height: "100%" }}>
            <ImageBackground
              source={require("./3.webp")}
              resizeMode="cover"
              style={{
                flex: 1,
              }}
            ></ImageBackground>
          </View>
        </View>
        <View style={{ width: "90%", height: "25%", marginTop: 20 }}>
          <ImageBackground
            source={require("./4.webp")}
            resizeMode="cover"
            style={{
              flex: 1,
            }}
          ></ImageBackground>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
});
