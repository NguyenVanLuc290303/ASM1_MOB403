import { StatusBar,  } from 'expo-status-bar';
import { StyleSheet,Text, View,Image, FlatList,TextInput, TouchableOpacity} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue ,set,get,child } from "firebase/database";
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { Dimensions } from 'react-native';



export default function ScreenCatregory({navigation}){
    const [data, setData] = useState([]);


    useEffect(()=>{

        const db = getDatabase();
        const dbRef = ref(getDatabase());
       get(child(dbRef, `theloai/`)).then((snapshot) => {
       if (snapshot.exists()) {
           const dataFromFirebase = snapshot.val();

           const dataArray = Object.keys(dataFromFirebase).map((key) => ({
               id: key,
               name: dataFromFirebase[key].name,
               image: dataFromFirebase[key].imageCategory,
              
             }));
             setData(dataArray);
            //  console.log(data);
       } else {
           console.log("No data available");
       }
       }).catch((error) => {
       console.error(error);
       });

    },[])

    const renderItem = ({item}) => (
        <TouchableOpacity  onPress={()=>{navigation.navigate('ScreenBookDetail',{object:item})}} style={ styles.itemCategory}>
        <Image style = {styles.img}
          source={{uri : item.image}}
        />   
        <Text style = {styles.tieude}>{item.name}</Text>
      </TouchableOpacity>
      );

    return(
        <View style={styles.container}>
            <View style={styles.sreach}>
                <Image source={require('./images/sreach.png')} style={{ width : 32 , height : 32,}}/>
                <TextInput placeholder='Tìm kiếm'/>
            </View>
        <FlatList data={data} numColumns={2}  renderItem={renderItem} >

        </FlatList>
   
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex :1,
        marginTop :50,
        alignItems:'center',
 
      
    },
    sreach:{
        width: 260,
        height: 40,
        flex_shrink: 0,
        borderWidth:1.5,
        borderColor:'#D9D9D9',
        marginLeft : 15,
        borderRadius : 15,
        backgroundColor : '#D9D9D9',
        flexDirection :'row'
    },
    img:{
        width:140,
        height:140,
        borderRadius:10,
        
        },
        
        // content:{
        // marginStart:20,
        // marginTop:10
        // },
        
        tieude:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
        // width :Dimensions.get('window').width - 86 -20 -5,
        marginTop:20
        
        },
        
        noidung:{
        color:'grey',
        width :Dimensions.get('window').width - 96 -20-5
        },
        itemCategory :{
        marginTop:20 ,
        width:170,
        height:200,
        borderWidth:1 ,
        marginLeft:10 ,
        borderRadius:10, 
        justifyContent : 'center',
        alignItems : 'center'
        }
});