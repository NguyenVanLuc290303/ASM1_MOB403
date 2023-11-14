import { StatusBar,  } from 'expo-status-bar';
import { StyleSheet,Text, View,Image, FlatList,TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue ,set,get,child } from "firebase/database";
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
 



export default function ScreenBook(props){
 
  const {navigation,route} = props;
  const {params} = route;
    
    return(
      <ScrollView style = {styles.container}>
              {/* <Image
                 source={{ uri: 'https://brandkey.vn/wp-content/uploads/2022/07/thiet-ke-logo-trang-tin-tuc-tong-hop-ring-ring.jpg' }}
                  style={{ width: 150, height: 150 ,borderRadius:10}}
                  /> */}
              <View style={{ alignItems : 'center'}}>
                  <Image style = {styles.img}
                  source ={{uri : params.object.image}}
                  />
              </View>
              
              <Text style = {styles.tieude}>
              {params.object.name}
            
              </Text>
              <Text style = {styles.noidung}>
              {params.object.tieude}
               </Text>
            <View style={{ width : '100%' , alignItems : 'center'}}>
                  <View style = { styles.extenstion}>
                        <View style={styles.love}>
                            <View style={{ flexDirection : 'row' , alignItems : 'center'}}>
                                <TouchableOpacity>
                                    <AntDesign name='hearto' size={24}/>
                                </TouchableOpacity>
                                <Text>Thích</Text>
                            </View>
                            <Text>122K</Text>
                        </View>
                        <View style={styles.reponsive}>
                            <View style={{ flexDirection : 'row'}}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name='star-outline' size={30}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name='star-outline' size={30}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name='star-outline' size={30}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name='star-outline' size={30}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name='star-outline' size={30}/>
                            </TouchableOpacity>
                            </View>
                            <Text>112K</Text>
                        </View>
                        <View style={styles.cart}>
                            <View>
                            <MaterialCommunityIcons name='cart-outline' size={30}/>
                            </View>
                            <Text>112K</Text>
                        </View>
                  </View>
                  <TouchableOpacity style={styles.btn_readbook}>
                        <Text style={{ color : 'white'  ,fontSize : 30 , fontWeight : 'bold'}}>Đọc Sách</Text>
                  </TouchableOpacity>
            </View>

         </ScrollView>
    )
}

const styles = StyleSheet.create({
  container :{
    flex:1,
},

img:{
    marginStart:25,
    width:200,
    height:200,
    borderRadius:10,
},

tieude:{
    marginStart:25,
    marginEnd:25,
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    marginBottom:20,
    marginTop:20,
},

noidung:{
    marginStart:25,
    marginEnd:25,
    color:'grey',
  
},
extenstion : {
    height : 80,
    width : 350,
    backgroundColor : '#D5D5D5',
    flexDirection:'row',
    borderRadius : 20,
    marginTop : 10,
    alignItems : 'center',
    justifyContent : 'space-between' , 
    padding : 20
},
btn_readbook :{
    width : 350,
    height : 80,
    backgroundColor : 'black',
    marginTop : 30,
    borderRadius : 20,
    alignItems : 'center' , 
    justifyContent : 'center'
},
reponsive :{
    width : 150,
    justifyContent : 'center',
    alignItems : 'center'
}
});