import * as React from "react";

import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

import { Provider as PaperProvider } from "react-native-paper";
import { Headline, Text, Paragraph, Badge, Button } from "react-native-paper";
var firstScreen = require("./SliderSeven.webp");

export default function SliderScreenSeven({navigation}) {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Headline style={styles.headline}>Анапка</Headline>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Phone");
            }}
          >
            <Text style={styles.href}>Пропустить</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapper}>
          <Image style={styles.image} source={firstScreen} />
          <View style={styles.bottom}>
            <View style={styles.bottomText}>
              <Headline style={styles.headline}>Как использовать</Headline>
              <Paragraph>
                Пополните кошелек, оплачивайте все необходимое вам, а если
                остались Анапки, просто выведите их на свою банковкую карту
              </Paragraph>
            </View>
            <View style={styles.bottomNav}>
              <View style={styles.dotGroup}>
                <Badge size={12} style={[styles.disactiveDot, styles.dot]} />
                <Badge size={12} style={[styles.disactiveDot, styles.dot]} />
                <Badge size={12} style={[styles.disactiveDot, styles.dot]} />
                <Badge size={12} style={[styles.disactiveDot, styles.dot]} />
                <Badge size={12} style={[styles.disactiveDot, styles.dot]} />
                <Badge size={12} style={[styles.disactiveDot, styles.dot]} />
                <Badge size={12} style={[styles.activeDot, styles.dot]} />
              </View>
              <Button
                onPress={() => {
                  navigation.navigate("Phone");
                }}
                style={styles.button}
                mode="contained"
              >
                Далее
              </Button>
            </View>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headline: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 24,
  },
  href: {
    textTransform: "uppercase",
    color: "#2F80ED",
  },
  container: {
    height: "100%",
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  image: {
    marginTop: 45,
    width: 392,
    height: 392,
  },
  wrapper: {
    alignItems: "center",
  },
  bottom: {
    marginTop: 40,
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: 'space-between',
    height: 202
  },
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
  },
  dotGroup: {
    flexDirection: "row",
    marginRight: 10,
  },
  dot: {
    marginRight: 10,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  disactiveDot: {
    backgroundColor: "#D9D9D9",
  },
  button: {
    backgroundColor: "#2F80ED",
  },
});
