import * as React from 'react';

import { StyleSheet, View } from 'react-native';

import { Provider as PaperProvider } from 'react-native-paper';
import { Avatar, Caption, Sa} from 'react-native-paper'

export default function BuyerHomeScreen() {
    return (
      <PaperProvider>
        <View style={styles.avatar}>
          <Avatar.Text size={24} label="XD" />
          <Caption>Username</Caption>
        </View>
      </PaperProvider>
    );
}

const styles = StyleSheet.create({
    avatar: {
        justifyContent:"space-between",
        padding: 10,
        flexDirection: 'row'
    }
})