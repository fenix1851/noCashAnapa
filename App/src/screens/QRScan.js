import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Camera } from "expo-camera";

// You can import from local files
import AssetExample from "./components/AssetExample";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

export default function App() {
  useEffect((f) => {
    (async (f) => {
      try {
        const hasCam = await Camera.isAvailableAsync().catch(
          (e) => `Error: ${e.message}`
        );
        const cameras = await Camera.getAvailableCameraTypesAsync().catch(
          (e) => `Error: ${e.message}`
        );
        const permissions = await Camera.getPermissionsAsync().catch(
          (e) => `Error: ${e.message}`
        );

        console.log(
          "Device has cam: ",
          hasCam,
          cameras,
          " permissions :",
          permissions
        );

        if (!permissions.granted) {
          console.log("No permissions yet, asking");
          const newPermissions = await Camera.requestPermissionsAsync();
          console.log("Result: ", newPermissions);
        }
      } catch (e) {
        console.log("Permissions error: ", e);
      }
    })();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Change code in the editor and watch it change on your phone! Save to get
        a shareable url.
      </Text>
      <Card>
        <Camera
          ratio="16:9"
          autofocus={Camera.Constants.AutoFocus.on}
          style={{
            width: 500,
            height: 500,
            maxWidth: "100%",
            borderWidth: 10,
            borderColor: "red",
          }}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
