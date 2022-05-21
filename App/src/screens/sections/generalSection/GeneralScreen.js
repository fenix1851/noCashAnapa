import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";


const Drawer = createDrawerNavigator();

import Home from "./home";
import QR from "./lists/HotelsList";
            

export default function General(){
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="QR" component={QR} />
      </Drawer.Navigator>
    );
}