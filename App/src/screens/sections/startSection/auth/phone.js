import * as React from "react";

import { StyleSheet, View } from "react-native";

import { Provider as PaperProvider } from "react-native-paper";
import { Button, Paragraph, TextInput, Portal, Dialog } from "react-native-paper";

import "../../../../../gobal";
import HeadlineStyle from "../../../../components/Headline";
import ButtonStyle from "../../../../components/Button";

export default function Phone({ navigation }) {
  const [phone, setPhone] = React.useState("");
  const [visible, setVisible] = React.useState(false);

   const showDialog = () => setVisible(true);

   const hideDialog = () => setVisible(false);


  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Нужно ввести номер!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Введите номер телефона</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <ButtonStyle handler={hideDialog} width={120} height={30} onPress={hideDialog} title="OK"></ButtonStyle>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.container}>
        <HeadlineStyle title="Авторизация" />
        <Paragraph style={styles.text}>
          Введите ваш номер телефона для авторизации в приложении
        </Paragraph>
        <TextInput
          style={styles.phoneInput}
          activeUnderlineColor="#2F80ED"
          placeholder="+ 7 000 00 00 000"
          value={phone}
          onChangeText={(phone) => setPhone(phone)}
        />
        <ButtonStyle
          height={50}
          width={195}
          title="Войти"
          handler={() => {
            if (phone) {
              global.phone = phone;
              return navigation.navigate("BeachList");
            } else {
              showDialog()
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
    marginBottom: 62,
  },
});
