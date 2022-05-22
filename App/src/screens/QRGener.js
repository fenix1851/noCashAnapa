import { DrawerActions } from "@react-navigation/native";
import * as React from "react";
import axios from "axios";
import { StyleSheet, View, Image} from "react-native";

const QRCode = require('qrcode')

import "../../gobal";

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
import HeadlineStyle from "../components/Headline";
import { TouchableOpacity } from "react-native-web";
import { ceil } from "react-native-reanimated";



export default function QRGener({ navigation }) {
    const [src, setSrc] = React.useState('')

    React.useEffect(()=>{
        QRCode.toDataURL(global.phone).then((data)=>{
            setSrc(data)
        })
    }, [])

  return (
    <PaperProvider>
      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          paddingTop: 20,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "baseline",
          }}
        >
          <Button
            icon="arrow-left"
            color="#2F80ED"
            style={{}}
            labelStyle={{
              fontSize: 20,
              textTransform: "capitalize",
              fontWeight: "400",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            Назад
          </Button>
          <HeadlineStyle title="QR-код" />
          <Button
            color="#2F80ED"
            labelStyle={{
              fontSize: 20,
              textTransform: "capitalize",
              fontWeight: "400",
            }}
            style={{}}
            onPress={() => {
              navigation.goBack();
            }}
          >
            Поделится
          </Button>
        </View>

        <View
          style={{
            width: "90%",
            height: "40%",
            shadowColor: "#2F80ED",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
            borderRadius: 9,
            marginTop: 120,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 40, letterSpacing: 0.5, textTransform: 'capitalize' }}>
            {global.name}
          </Text>
          <Image source={src} style={{ height: 250, width: 250 }}></Image>
        </View>
        <Paragraph
          style={{
            width: "70%",
            textAlign: "center",
            color: "#66666",
            fontSize: 13,
            letterSpacing: 0.15,
            marginTop: 17,
          }}
        >
          Покажите этот код другому человеку, чтобы он перевел вам деньги
        </Paragraph>
        <Button mode="contained" color="#2F80ED" style={{ marginTop: 40, width: 280, height: 60, alignItems: 'center', justifyContent: 'center' }} labelStyle={{fontSize:20, letterSpacing: 1.25}}>
          Сканировать
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
