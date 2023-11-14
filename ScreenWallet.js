import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Inicon from 'react-native-vector-icons/Ionicons';
import Ficon from 'react-native-vector-icons/Fontisto';

import { User } from './userContext';

export default function ScreenWallet({navigation}){
    const {userData} = User();


    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn_back} onPress={() => navigation.navigate('ScreenProfile')}>
                <Inicon name='chevron-back-outline' size={38}/>
            </TouchableOpacity>
            <View style={ styles.titleUser}>
                <Text style={{ fontSize : 30 , fontWeight : '700'}}>Số dư của : {userData.username}</Text>
            </View>
            
                <View style={styles.dislayCardMoney}>
                    <Text style={styles.textCardMoney}>Xu</Text>
                    <Text style={{ fontSize : 30 , color : '#FFFFFF',fontWeight : '700', padding : 15}}>0 </Text>
                    <View style={styles.line}></View>
                    <Text style={{ color : '#FFFFFF' ,padding : 15}}>Phần thưởng</Text>
                    <Text style={{ color : '#FFFFFF' ,paddingLeft : 15 , fontSize : 30 , fontWeight : '700'}}>0</Text>
                </View>
            <View>
                <Text  style={{ fontSize : 20,fontWeight : '700', padding : 15}}>Dịch Vụ</Text>
            </View>
            <View style={styles.transactionAndResponsive}>
                <TouchableOpacity style={styles.transaction}>
                    <Ficon name='money-symbol' size={30} style={{paddingLeft : 15 , paddingTop : 15}}/>
                    <Text style={{paddingLeft : 15 , paddingTop : 15 , fontWeight : '600' , fontSize : 18}}>Nạp Tiền</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.responsive}>
                    <MaterialCommunityIcons name='responsive' size={30} style={{paddingLeft : 15 , paddingTop : 15}}/>
                    <Text style={{paddingLeft : 15 , paddingTop : 15 , fontWeight : '600' , fontSize : 18}}>trợ giúp</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        paddingTop : 30,
        paddingLeft : 20,
        paddingRight : 20,
        backgroundColor:'#F4F4F4'
    },
    btn_back:{
        
    },
    titleUser:{
        marginTop : 15
    }, 
    dislayCardMoney :{
        width : 380,
        height : 200,
        backgroundColor : '#212121',
        borderRadius : 10,
        marginTop : 15
    },
    textCardMoney :{
        color : '#FFFFFF',
        padding : 15
    },
    line:{
        width : '100%',
        height : 0.5,
        backgroundColor : 'gray',
    },
    transactionAndResponsive:{
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    transaction :{
        width : 170,
        height : 100,
        backgroundColor : '#FFFFFF',
        borderRadius : 10
    },
    responsive:{
        width : 170,
        height : 100,
        backgroundColor : '#FFFFFF',
        borderRadius : 10
    }
})