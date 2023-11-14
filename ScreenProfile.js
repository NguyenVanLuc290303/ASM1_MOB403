import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { User } from './userContext';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { getDatabase, set, ref as dataRef, get, update, child, query, orderByChild, equalTo, onValue, } from "firebase/database";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Inicon from 'react-native-vector-icons/Ionicons';

const firebaseConfig = {
    apiKey: "AIzaSyB2-QE5OBrXNuiOzvN8sA_1YPLiC5OMj7s",
    authDomain: "appreadbook-e7ad0.firebaseapp.com",
    databaseURL: "https://appreadbook-e7ad0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "appreadbook-e7ad0",
    storageBucket: "appreadbook-e7ad0.appspot.com",
    messagingSenderId: "291503301889",
    appId: "1:291503301889:web:8dcb07cb95b2db280ea700",
    measurementId: "G-3D3NGQLCBY",
    databaseURL: 'https://appreadbook-e7ad0-default-rtdb.asia-southeast1.firebasedatabase.app/',
};


export default function SreenProfile({ navigation, route }) {

    const [selectImage, setSelectedImage] = useState(null);

    
    // // khởi tạo firebase
    const app = initializeApp(firebaseConfig);

    const uniqueFileName = `image_${new Date().getTime()}.jpg`;
    const db = getDatabase();
    const storage = getStorage();
    const storageRef = ref(storage, uniqueFileName);


    const { userData } = User();
    const imageAvatarDefault = 'https://tse4.mm.bing.net/th?id=OIP.LGfXa5GoclkgmeZiARS1EQHaHd&pid=Api&P=0&h=180';
    const [ImageChange, setImageChange] = useState(userData.image);

    const userId = userData.idUser;

    
    useEffect (() => {},[]);
    const reload = () => {
        const dbRef = dataRef(getDatabase());
        get(child(dbRef, `users/` + userId)).then((snapshot) => {
            if (snapshot.exists()) {
                setImageChange(snapshot.val().image)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const auth = getAuth();

    const signOut = () =>{
        // signOut(auth).then(() => {
        //     // Sign-out successful.
            navigation.navigate('ScreenLogin');
        //   }).catch((error) => {
        //     // An error happened.
        //   });
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={styles.nameTK}>{userData.username}</Text>
                    <TouchableOpacity style={{ position: 'absolute', zIndex: 1, marginLeft: 250, borderWidth: 2, borderColor: 'white', borderRadius: 20 }}>
                        <Image source={require('./images/step.png')} style={{ width: 30, height: 30, marginTop: 5 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.view3}>
                    <Image source={{ uri: ImageChange || imageAvatarDefault }} style={{ width: 200, height: 200, borderRadius: 100, position: 'absolute', zIndex: 0, }} />
                    <TouchableOpacity onPress={()=>{navigation.navigate('ScreenUpdateAvartar');}} style={{ position: 'absolute', zIndex: 1, marginTop: 180, marginLeft: 130, borderWidth: 2, borderColor: 'white', borderRadius: 15 }}>
                        <Image source={require('./images/pen.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ width: 70, height: 30, borderWidth: 1, borderRadius: 5, borderColor: '#000', alignItems: 'center', justifyContent: 'center', marginTop: 220 }}>
                    <Text>+ Tiểu Sử</Text>
                </TouchableOpacity>
                <View style={styles.view11}>
                    <TouchableOpacity style={{ width: 70, height: 30, borderWidth: 1, borderRadius: 5, borderColor: '#000', alignItems: 'center', justifyContent: 'center', marginTop: 10 }} onPress={() => navigation.navigate('ScreenPageUser')}>
                        <Text>Bài đăng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 100, height: 30, borderWidth: 1, borderRadius: 5, borderColor: '#000', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 20, marginLeft: 20 }} >
                        <Text>Sách đã thích</Text>
                    </TouchableOpacity>
                </View>
                </View>
                
                <View style={styles.line}></View>
                <View style={styles.viewTitle}>
                    {/* <Image source={require('./images/setting.png')} style={{ width:20,height:20, marginTop:18, marginRight:10}}/> */}
                    <Text style={{ fontSize: 25, marginTop: 10, width: 200  , paddingLeft : 10 }}>Cài đặt chung</Text>
                </View>
                <View style={styles.view2}>
                    <TouchableOpacity onPress={() => navigation.navigate('Tài khoản')}>
                        <View style={styles.view1}>
                            <Inicon name='person' size={24} color={'gray'}/>
                            <Text style={{ fontSize: 18, width: 300 , paddingLeft : 10  ,fontWeight : '500' }}>Tài khoản</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.view1}>
                            <Inicon name='lock-closed' size={24} color={'gray'}/>
                            <Text style={{ fontSize: 18, width: 300 , paddingLeft : 10 ,fontWeight : '500' }}>Quyền riêng tư</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => navigation.navigate('Bảo mật')}>
                        <View style={styles.view1}>
                            <MaterialCommunityIcons name='security' size={24}  color={'gray'}/>
                            <Text style={{ fontSize: 18, width: 300 , paddingLeft : 10 ,fontWeight : '500' }}>Bảo mật</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.view1}>
                            <MaterialCommunityIcons name='cart' size={24}  color={'gray'}/>
                            <Text style={{ fontSize: 18, width: 300 , paddingLeft : 10,fontWeight : '500'  }}>Đơn hàng của bạn</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ScreenWallet')}>
                        <View style={styles.view1}>
                            <Inicon name='wallet' size={24} color={'gray'}/>
                            <Text style={{ fontSize: 18, width: 300 , paddingLeft : 10,fontWeight : '500'  }}>Số dư</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={styles.line}></View>
                <View style={styles.view2}>
                    <TouchableOpacity onPress={signOut}>
                        <View style={styles.viewlogout}>
                            <Image source={require('./images/logout.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                            <Text style={{ fontSize: 20, width: 170  }}>Đăng xuất</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent:'center',
        // alignItems: 'center',
        backgroundColor: '#EEEFF0',
    },
    header:{
        alignItems : 'center',
    },
    nameTK: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    line: {
        width: 600,
        height: 1, // Độ cao của đường kẻ ngang
        backgroundColor: '#A5A5A5', // Màu của đường kẻ ngang
        // marginRight: 190
    },
    view1: {
        width: 350,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'center'
    },
    viewTitle : {

    },
    view11: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    view2: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        // justifyContent: 'left',
        // alignItems: 'flex-start',
    },
    view3: {
        marginRight: 200
    },
    viewlogout:{
        flexDirection : 'row',
        padding : 10
    }
});