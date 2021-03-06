import { DrawerActions } from "@react-navigation/native";
import * as React from "react";

import { StyleSheet, View} from "react-native";

import axios from "axios";

import HeadlineStyle from "../components/Headline";

import { Divider, Provider as PaperProvider } from "react-native-paper";
import {
  Button,
  Paragraph,
  TextInput,
  Portal,
  Dialog,
  Headline,
  Avatar,
  Text,
} from "react-native-paper";

import "../../gobal";
import { TouchableOpacity } from "react-native-web";
//https://9e2e-5-23-54-55.eu.ngrok.iocheckbalance?phone=1

 

export default function Menu({ navigation }) {
  const [balance, setBalance] = React.useState();
    axios
      .get(
        `https://9e2e-5-23-54-55.eu.ngrok.io/api/v1/getuser?phone=${global.phone}`
      )
      .then((responce) => {
        let balance = 0;
        if (responce.data.success) {
          //console.log(responce.data.result.coins);
          balance = responce.data.result.coins;
        } else {
          balance = 0;
        }
        setBalance(balance);
      });
      function Element({title, handler}){
        return(
        <View
          style={{
            width: "100%",
            justifyContent: "flex-start",
            paddingTop: 17,
            paddingBottom: 17,
          }}
        >
          <TouchableOpacity onPress={handler}>
            <Text style={{ fontSize: 12 }}>{title}</Text>
          </TouchableOpacity>
        </View>
        )
      }
 
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
        <Headline
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: 20,
            color: "#2F80ED",
          }}
        >
          ????????
        </Headline>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 17,
          }}
        >
          <Avatar.Image
            size={64}
            style={{ marginRight: 24 }}
            source={require("../assets/avatar.svg")}
          />
          <Text style={{ fontSize: 24, textTransform: 'capitalize'}}>{global.name}</Text>
        </View>
        <Divider style={{ width: "99%" }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 17,
            paddingBottom: 17,
            width: "100%",
          }}
        >
          <View>
            <Text style={{ fontSize: 12, color: "#2F80ED", marginBottom: 5 }}>
              ????????????
            </Text>
            <Text style={{ fontSize: 12 }}>{balance} ????????????</Text>
          </View>
          <Button
            mode="contained"
            color="#fff"
            labelStyle={{ fontSize: 12, color: "#2F80ED" }}
            onPress={() => navigation.navigate("Adding")}
          >
            ??????????????????
          </Button>
        </View>
        <Divider style={{ width: "99%" }} />

        <Element title="QR-??????" handler={()=>{navigation.navigate('QRGener')}}/>
        <Divider style={{ width: "99%" }} />

        <Element title="SOS" />
        <Divider style={{ width: "99%" }} />

        <Element title="?????????????? ????????????" />
        <Divider style={{ width: "99%" }} />

        <Element title="?????????????? ??????????????" />
        <Divider style={{ width: "99%" }} />

        <Element title="????????????????????????" />
        <Divider style={{ width: "99%" }} />

        <Element title="???????????????????????????????? ????????" />
        <Divider style={{ width: "99%" }} />

        <Element title="???????????? ???? ????????????????" />
        <Divider style={{ width: "99%" }} />

        <Element title="?????????? ????????????????????" />
        <Divider style={{ width: "99%" }} />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
