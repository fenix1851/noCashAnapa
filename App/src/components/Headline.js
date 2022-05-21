import * as React from "react";

import { StyleSheet} from "react-native";

import { Provider as PaperProvider } from "react-native-paper";
import { Headline} from "react-native-paper";

export default function HeadlineStyle({title}) {
  return (
    <Headline style={styles.headline}>{title}</Headline>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 24,
  },
});
