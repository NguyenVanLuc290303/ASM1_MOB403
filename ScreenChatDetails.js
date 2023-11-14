import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, ScrollView , FlatList, TouchableOpacity, TextInput ,KeyboardAvoidingView, SafeAreaView,TouchableWithoutFeedback ,Platform , Keyboard ,Button} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass ,faAngleLeft ,faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import { User } from './userContext';
import { useEffect, useState } from 'react';
import { getDatabase ,ref,set,get,child,onValue, push ,onChildAdded, update } from 'firebase/database';



export default function ScreenChatDetails({navigation ,route}){

       // đối tượng userchat lấy từ bên chat sang
       const {idUser, username, image} = route.params;


    // gọi context dataUser
    const {userData} = User();

    const [data,setData] = useState([]);
    const [textChat,setTextChat] = useState('');
    const db = getDatabase();


    // tạo 2 biến id gửi và id nhân của Userchat và gán vào id
    const idUserSend = userData.idUser;
    const idUserReciver = idUser;

    const chat = idUserSend + idUserReciver;        // tạo biến chưa id của 2 người hội thoại
    const chat2 = idUserReciver + idUserSend; 

 


    const sendChatToFirebase = () =>{
        
        push(ref(db, 'chat/' + chat), {
          idUser : idUserSend,  
          content : textChat,  
            })
        
        push(ref(db, 'chat/' + chat2), {
                idUser : idUserSend,  
                content : textChat,  
            })

        setTextChat('');
        realoadChat();
    }

    const realoadChat = () =>{
        const dataArray =[];

        const checkChat = userData.idUser+idUser;

        // // console.log(checkChat);
        const dbRef = ref(db, `chat/` + checkChat);

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                dataArray.push(childData);
                setData(dataArray);
                });
            }, {
            onlyOnce: false
            });
        onChildAdded(dbRef, (snapshot) => {
            const newMessage = snapshot.val();
            updateChat();
        });
    }


    const updateChat = () => {

        const dataArray =[];

        const checkChat = userData.idUser+idUser;

        // // console.log(checkChat);
        const dbRef = ref(db, `chat/` + checkChat);

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                // const dataFromFirebase = childSnapshot.val();
                dataArray.push(childData);

                setData(dataArray);
                // console.log(data);
                });
            }, {
            onlyOnce: false
            });
    }

    useEffect(() =>{

        const dataArray =[];

        const checkChat = userData.idUser+idUser;

        // console.log(checkChat);
        const dbRef = ref(db, `chat/` + checkChat);

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                // const dataFromFirebase = childSnapshot.val();
                dataArray.push(childData);


                setData(dataArray);
                // console.log(data);
                });
            }, {
            onlyOnce: true
            });
    
    },[])

    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.headerItem}>
                <TouchableOpacity onPress={() => navigation.navigate('ScreenChat')}>
                    <FontAwesomeIcon icon={faAngleLeft} size={26}/>
                </TouchableOpacity>
                <Image source={{uri : image}} style={{ width : 40 , height :40 , borderRadius : 20,marginLeft : 10}}/>
                <Text style={{ fontWeight : '700' , fontSize : 16 ,paddingLeft : 10}}>{username}</Text>
            </View>
            <View style={styles.viewChat}>
                <FlatList
                    data={data} renderItem={({item}) =>{

                        const isYour = userData.idUser === item.idUser;
                        return(
                            <View  style={{ alignItems: userData.idUser === item.idUser ? 'flex-end' : 'flex-start' ,
                                            margin : 8 ,
                                            justifyContent : 'center'
                                            
                             }}>
                                {isYour ? (
                                <View  style={{height : 45 ,
                                               borderWidth :  userData.idUser === item.idUser ? 1 : 1,
                                               borderRadius : userData.idUser === item.idUser ?  20 : 20, 
                                               backgroundColor :  userData.idUser === item.idUser ? '#212121' : '#FFFFFF',
                                }}>
                                    <Text style={{
                                        color : userData.idUser === item.idUser ? '#FFFFFF' : '#000000',
                                        fontSize : 20 ,
                                        padding : 10 ,
                                    }}>{item.content}</Text>
                                </View>):(
                                    <View style={{ flexDirection : 'row' , alignItems : 'center'}}>
                                        <Image source={{ uri : image}} style={{ width : 40 , height : 40 , borderRadius : 20}}/>
                                     <View  style={{height : 45 ,
                                        borderWidth :  userData.idUser === item.idUser ? 1 : 1,
                                        borderRadius : userData.idUser === item.idUser ?  20 : 20, 
                                        backgroundColor :  userData.idUser === item.idUser ? '#212121' : '#FFFFFF',
                         }}>  

                         
                             <Text style={{
                                 color : userData.idUser === item.idUser ? '#FFFFFF' : '#000000',
                                 fontSize : 20 ,
                                 padding : 10 ,
                             }}>{item.content}</Text>
                         </View>
                                    </View>

                                )}
                                

                            </View>
                        )
                    }}
                />
            </View>
            {/* <View style={styles.textContent}> */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
               >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View                 style={{ flexDirection : 'row' , alignItems : 'center' , position : 'relative'}}
                    >
                    <View style ={{ alignItems : 'flex-end'}}>
                    <TouchableOpacity style={styles.btn_send} onPress={sendChatToFirebase}>
                        <FontAwesomeIcon icon={faPaperPlane} size={24} />
                    </TouchableOpacity>
                    </View>
                    <TextInput value={textChat} style={{ width : 360 , height : 60 , }} placeholder='Viết nội dung của bạn' onChangeText={(Text) => setTextChat(Text)}/>
                </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
 
            {/* </View> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container :{
        flex :1,
        backgroundColor : '#FFFF',
    },
    headerItem :{
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        paddingLeft : 10,
        backgroundColor : '#FFFF',
        marginTop : 20
    },
    viewChat :{
        flex : 12,
        backgroundColor : '#FAFAFA'
    },
    btn_send :{
        height :  50 ,
        width : 50,
        borderRadius : 25,
        backgroundColor : '#D5D5D5',
        justifyContent : 'center',
        alignItems : 'center',

        marginRight : 5,
    
    },

})