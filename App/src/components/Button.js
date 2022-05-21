import * as React from "react";

import { StyleSheet } from "react-native";

import { Button } from "react-native-paper";

export default function ButtonStyle({ title, handler, height, width }) {
  return <Button onPress={handler} color='#fff' style={[styles.button, {height: height,width: width }]}>{title}</Button>;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2F80ED",
    justifyContent: 'center'
  },
});
