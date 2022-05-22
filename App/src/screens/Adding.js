import * as React from "react";

import { StyleSheet, View } from "react-native";

import * as Linking from "expo-linking";

import * as WebBrowser from "expo-web-browser";

import { Provider as PaperProvider } from "react-native-paper";
import {
  Button,
  Text,
  Paragraph,
  TextInput,
  Portal,
  Dialog,
  IconButton
} from "react-native-paper";

import "../../gobal";
import HeadlineStyle from "../components/Headline";
import ButtonStyle from "../components/Button";
import axios from "axios";
import { TouchableOpacity } from "react-native-web";

export default function Adding({ navigation }) {
  const [coins, setCoins] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Ошибка!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Введите сумму платежа</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <ButtonStyle
              handler={hideDialog}
              width={120}
              height={30}
              onPress={hideDialog}
              title="OK"
            ></ButtonStyle>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.container}>
        <View style={{position: 'absolute', top: 40, left:27}}>
          <TouchableOpacity onPress={()=>{navigation.navigate('Menu')}} >
            <Text style={{ fontSize: 24, color: "#2F80ED", fontWeight: 500 }}>
              Назад
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 20 }}>Введите сумму для пополнения</Text>
        <TextInput
          outlineColor="#fff"
          activeOutlineColor="#eee"
          selectionColor="#fff"
          mode="outlined"
          style={styles.phoneInput}
          activeUnderlineColor="#2F80ED"
          placeholder="300"
          value={coins}
          onChangeText={(coins) => setCoins(coins)}
          //right={<TextInput.Icon name="currency_ruble" />}
        />
        <Button
          onPress={() => {
            if (coins) {
              axios
                .get(
                  `http://45.8.230.89:8080/api/v1/supp?phone=${global.phone}&coins=${coins}&ref={http://5.23.54.55:19006/${global.phone}/${global.name}}`
                )
                .then((responce) => {
                  console.log(responce.data);
                  Linking.openURL(responce.data.url);
                  //WebBrowser.openBrowserAsync(responce.data.url);
                });
              //return navigation.navigate("");
            } else {
              showDialog();
            }
          }}
          labelStyle={{
            color: "#2F80ED",
            fontSize: 14,
            textTransform: "capitalize",
            fontWeight: 400,
          }}
        >
          Продолжить
        </Button>
        {/* <Button mode="outlined" style={{height:100, justifyContent:'center'}}>Отправить код</Button> */}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 184,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    paddingBottom: 34,
    paddingTop: 34,
  },
  text: {
    width: 285,
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  phoneInput: {
    height: 54,
    width: 360,
    marginBottom: 33,
    marginTop: 33,
    borderRadius: 10,
  },
});
