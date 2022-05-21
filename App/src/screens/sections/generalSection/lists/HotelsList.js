import * as React from "react";

const axios = require('axios')

import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  useState,
  Image
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Checkbox, Provider as PaperProvider } from "react-native-paper";
import { Rating } from "react-native-ratings";
import '../../../../../gobal'

import {
  Appbar,
  Button,
  Paragraph,
  TextInput,
  ToggleButton,
  Divider
} from "react-native-paper";
import SwitchSelector from "react-native-switch-selector";

import HeadlineStyle from "../../../../components/Headline";
import ButtonStyle from "../../../../components/Button";
const DATA = [];
console.log(global.ids)

axios.get("http://45.8.230.89:8080/api/v1/getallbeaches").then((responce) => {
  //console.log(responce.data.result)
  for (let beach of responce.data.result) {
    beach["checked"] = false;
    DATA.push(beach);
  }
  //setList(DATA)
  
});
export default function HotelList({ navigation }) {
  //const [state, setState] = useState('1')
  console.log(global.ids)
  
  const [items, setList] = React.useState(DATA);
  const STAR = require("./star.svg");
  


  const checkList = (clickedItem) => {

    setList((prev)=>{
        let returnList = []
        for(let i = 0;  i<prev.length; i++){
            let item = prev[i]
            //console.log(item);
            if(item.id == clickedItem.id){
                item.checked = !item.checked
            }
            returnList.push(item)
        }
        return(returnList)
    })}

  const _goBack = () => {};

  const buttonHandler = () => {
       let returnList = [];
       for (let i = 0; i < items.length; i++) {
         let item = items[i];
         //console.log(item);
         if (item.checked) {
           returnList.push(item.id);
         }
         
       }
       //console.log(returnList.join(';'))
  };

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => navigation.openDrawer();

  const Item = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => checkList(item)}>
        <View style={styles.item}>
          <View
            style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Rating
              type="custom"
              ratingImage={STAR}
              ratingCount={4.5}
              imageSize={13}
              ratingColor="#fff"
              ratingBackgroundColor="#fff"
            />
          </View>
          <Checkbox
            color="#2F80ED"
            status={item.checked ? "checked" : "unchecked"}
          ></Checkbox>
        </View>
      </TouchableOpacity>
      <Divider style={{ width: 350 }} />
    </View>
  );

  const renderItem = ({ item }) => <Item item={item} />;
  const options = [
    {
      label: "места",
      value: "1",
      testID: "switch-one",
      accessibilityLabel: "switch-one",
    },
    {
      label: "карта",
      value: "2",
      testID: "switch-two",
      accessibilityLabel: "switch-two",
    },
  ];

  return (
    <PaperProvider>
      <View style={{ backgroundColor: "#fff", height: "100%" }}>
        <Appbar.Header
          style={{ backgroundColor: "#2F80ED", paddingBottom: 38 }}
          statusBarHeight={38}
        >
          <Appbar.Action icon="menu" onPress={_handleMore} />
          <Appbar.BackAction onPress={() => navigation.navigate("BeachList")} />
          <Appbar.Content title="Выберите отель" />
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
        </Appbar.Header>

        <View
          style={{
            position: "absolute",
            top: 133,
            right: 55,
            flexDirection: "row",
          }}
        >
          <SwitchSelector
            options={options}
            initial={0}
            textColor={"#2F80ED"} //'#7a44cf'
            selectedColor={"#fff"}
            buttonColor={"#2F80ED"}
            borderColor={"transparent"}
            hasPadding
            onPress={(value) =>
              console.log(`Call onPress with value: ${value}`)
            }
            style={{
              width: 305,
              textTransform: "uppercase",
              fontSize: 14,
              letterSpacing: 1.25,
              borderColor: "#eee",
              borderWidth: 1,
              borderRadius: 42,
            }}
          />
        </View>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ marginTop: 106, marginLeft: 34 }}
        />
        <View style={{ alignItems: "center", paddingBottom: 40 }}>
          <ButtonStyle
            handler={() => buttonHandler()}
            title="Далее"
            height={50}
            width={195}
          ></ButtonStyle>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  item: {
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    paddingTop: 13,
    paddingRight: 31,
    paddingBottom: 13,
  },
  text: {
    fontSize: 14,
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
    fontSize: 14,
  },
});
