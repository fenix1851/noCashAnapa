import { DrawerActions } from "@react-navigation/native";
import * as React from "react";
import axios from "axios";
import { StyleSheet, View, Image } from "react-native";

const QRCode = require("qrcode");

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
import { RCTDeviceEventEmitter } from "react-native";
import HeadlineStyle from "../components/Headline";
import { TouchableOpacity } from "react-native-web";
import { ceil } from "react-native-reanimated";

import {BarCodeScanner} from 'expo-barcode-scanner'

export default function QRScaner({ navigation }) {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
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

const styles = StyleSheet.create({});
