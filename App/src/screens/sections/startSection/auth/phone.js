import * as React from "react";

import { StyleSheet, View } from "react-native";

import { Provider as PaperProvider } from "react-native-paper";
import { Button, Paragraph, TextInput, Portal, Dialog } from "react-native-paper";

import "../../../../../gobal";
import HeadlineStyle from "../../../../components/Headline";
import ButtonStyle from "../../../../components/Button";

export default function Phone({ navigation }) {
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");

  const [visible, setVisible] = React.useState(false);

   const showDialog = () => setVisible(true);

   const hideDialog = () => setVisible(false);


  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Ошибка!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Заполните поля</Paragraph>
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
        <HeadlineStyle title="Авторизация" />
        <Paragraph style={styles.text}>
          Введите номер и имя дл авторизации
        </Paragraph>
        <TextInput
          style={[styles.phoneInput, { marginBottom: 31 }]}
          activeUnderlineColor="#2F80ED"
          placeholder="+ 7 999 12 34 567"
          value={phone}
          onChangeText={(phone) => setPhone(phone)}
        />

        <TextInput
          style={[styles.phoneInput, { marginBottom: 62 }]}
          activeUnderlineColor="#2F80ED"
          placeholder="Иван"
          value={name}
          onChangeText={(name) => setName(name)}
        />

        <ButtonStyle
          height={50}
          width={195}
          title="Войти"
          handler={() => {
            if (phone && name) {
              global.phone = phone;
              global.name = name
              return navigation.navigate("Home");
            } else {
              showDialog();
            }
          }}
        />
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
    width: 344,
  },
});
