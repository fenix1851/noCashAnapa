import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";

import axios from "axios";

import '../../gobal'

import { Provider as PaperProvider } from "react-native-paper";
import {
  Button,
  Text,
  Paragraph,
  TextInput,
  Portal,
  Dialog,
} from "react-native-paper";

import ButtonStyle from "../components/Button";

export default function App({navigation}) {
  const [coins, setCoins] = React.useState("");

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  
  const hideDialog = () => setVisible(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Введите сумму платежа</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Введите сумму платежа</Paragraph>
              <TextInput
                style={[styles.phoneInput, { marginBottom: 62 }]}
                activeUnderlineColor="#2F80ED"
                placeholder="300"
                value={coins}
                onChangeText={(coins) => setCoins(coins)}
              ></TextInput>
            </Dialog.Content>
            <Dialog.Actions>
              <ButtonStyle
                handler={() => {
                  console.log(coins)
                  if (coins) {
                    axios.get(
                      `https://9e2e-5-23-54-55.eu.ngrok.io/api/v1/transfer/?phone_from=${global.phone}&phone_to=${global.to}&coins=${coins}`
                    ).catch;

                    hideDialog();
                    navigation.navigate('Menu');                  }
                }}
                width={120}
                height={30}
                title="OK"
              ></ButtonStyle>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Camera
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={(context) => {
            console.log(context.data)
            global.to = context.data
            setVisible(true);
          }}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
