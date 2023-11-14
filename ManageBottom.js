import { StyleSheet, Text, View,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FdaIcon from 'react-native-vector-icons/Foundation'
import ScreenHome from './ScreenHome';
import ScreenChat from './ScreenChat';
import ScreenNotification from './ScreenNotification';
import ScreenBook from './ScreenBook';
import ScreenProfile from './ScreenProfile'
import ScreenCatregory from './ScreenCatregory';
import ScreenPageUser from './ScreenPageUser';
import ScreenVideo from './ScreenVideo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default function ManageBottom(){
    
const Tab = createMaterialBottomTabNavigator();

    return(
        
        <View style={styles.container}>
            
            <Tab.Navigator
                initialRouteName='ScreenHome'
                activeColor="#000"
                barStyle={{ backgroundColor: '#FFF' }}
            >
                <Tab.Screen name='ScreenHome' component={ScreenHome} options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ color }) => (
                        // <MaterialCommunityIcons name="home" color={color} size={26} />
                        <AntDesign name="home" size={28} color={color} />
                    ),
                }}/>
                <Tab.Screen
                    name="ScreenChat"
                    component={ScreenChat}
                    options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color }) => (
                        // <MaterialCommunityIcons name="message" color={color} size={26} />
                        <AntDesign name="message1" size={28} color={color} />

                    ),
                    }}
                />
                <Tab.Screen
                    name="ScreenNotification"
                    component={ScreenNotification}
                    options={{
                    tabBarLabel: 'Thông báo',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bell-outline" color={color} size={28} />
                    ),
                    }}
                />
                <Tab.Screen
                    name="ScreenBook"
                    component={ScreenCatregory}
                    options={{
                    tabBarLabel: 'Sách',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="book-outline" color={color} size={28} />
                    ),
                    }}
                />
                <Tab.Screen
                    name="ScreenProfile"
                    component={ScreenProfile}
                    options={{
                    tabBarLabel: 'Hồ sơ',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="profile" size={28} color={color} />

                    ),
                    }}
                />
            </Tab.Navigator>
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        backgroundColor : 'red'
    }
});