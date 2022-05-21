import * as React from "react";

import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { Provider as PaperProvider } from "react-native-paper";
import { Button, Paragraph, TextInput } from "react-native-paper";

import HeadlineStyle from "../../../../components/Headline";
import ButtonStyle from "../../../../components/Button";

export default function Code({ navigation }) {
  const [phone, setPhone] = React.useState("");
  return (
    <PaperProvider>
      <View style={{paddingTop:56,paddingLeft:20, backgroundColor: '#fff'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Phone");
          }}
        >
          <Text style={styles.href}>Назад</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <HeadlineStyle title="Код из СМС" />
        <Paragraph style={styles.text}>
          Мы отправили вам проверочный код в смс, введите его
        </Paragraph>
        <TextInput
          style={styles.phoneInput}
          activeUnderlineColor="#2F80ED"
          placeholder="Проверочный код"
          value={phone}
          onChangeText={(phone) => setPhone(phone)}
        />
        <ButtonStyle
          height={50}
          width={195}
          title="Далее"
          handler={() => {
            navigation.navigate("BeachList");
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
    paddingTop: 112,
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
  href: {
    textTransform: "uppercase",
    color: "#2F80ED",
    fontSize: 14
  },
});
