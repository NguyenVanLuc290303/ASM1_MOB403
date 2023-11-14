import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput ,ToastAndroid} from 'react-native';
import { getAuth, signInWithEmailAndPassword, getASecureRandomPassword ,updatePassword } from "firebase/auth";
import { getDatabase ,ref,set,get,child,update } from 'firebase/database';
import { User } from './userContext';


  

export default function ScreenChangePassword(navigation){

  
    const {userData} = User();

    const [oldPassword,setOldPassword] = useState();
    const [newPassword,setNewPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();


    const auth = getAuth();
    const user = auth.currentUser;
    // const newPasswordd = getASecureRandomPassword();

    const db = getDatabase();

    const ChangePassword = () => {

        if(userData.password === oldPassword && newPassword === confirmPassword){

            updatePassword(user , newPassword)
            .then(() => {

                })
                .catch((error) => {
                    // Xử lý lỗi
                    console.log(error)
                });


            update(ref(db, 'users/' + userData.idUser), { password: newPassword })
            .then(() => {
                console.log("Cập nhật ảnh user của post thành công");
                // ToastAndroid.show('update password successfully!', ToastAndroid.SHORT);
            })
            .catch((error) => {
                console.error("Lỗi khi cập nhật ảnh user của post thành công:", error);
            });
            }
    }

    return(
       <View style={ styles.container}>
            <View >
                <Text style={{ color : 'gray'}}>Nhập mật khẩu hiển tại của bạn</Text>
                <TextInput style={styles.PasswordOld} placeholder='Mật khẩu cũ' onChangeText={(Text) => setOldPassword(Text)}/>
            </View>
            <View style={styles.changePassword}>
                <View>
                </View>
                <View >
                    <Text style={{ color : 'gray'}}>Nhập mật khẩu mới của bạn</Text>
                    <TextInput style={styles.newPassword} placeholder='Mật khẩu mới' onChangeText={(Text) => setNewPassword(Text)}/>
                </View>
                <View style={{ marginTop : 20,}} >
                    <Text style={{ color : 'gray'}}>Nhập lại mật khẩu mới của bạn</Text>
                    <TextInput style={styles.confirmPassword} placeholder='Nhập lại mật khẩu' onChangeText={(Text) => setConfirmPassword(Text)}/>
                </View>
            </View>
            <TouchableOpacity style={styles.btn_changePassword} onPress={ChangePassword}>
                <Text style={{ color : 'white' , fontSize : 16 , fontWeight : '600' }}>Đổi mật khẩu</Text>
            </TouchableOpacity>
       </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex :1, 
        backgroundColor : 'white',
        paddingTop : 20,
        alignItems : 'center'
    },
    PasswordOld:{
        width : 300,
        height : 45,
        borderRadius : 10,
        borderColor : 'gray',
        borderWidth : 0.5,
        justifyContent : 'center',
        paddingLeft : 10
    },
    newPassword :{
        width : 300,
        height : 45,
        borderRadius : 10,
        borderColor : 'gray',
        borderWidth : 0.5,
        justifyContent : 'center',
        paddingLeft : 10
    },
    confirmPassword:{
        width : 300,
        height : 45,
        borderRadius : 10,
        borderColor : 'gray',
        borderWidth : 0.5,
        justifyContent : 'center',
        paddingLeft : 10

    },
    changePassword:{
        marginTop : 20,
    },
    btn_changePassword :{
        width : 200,
        height : 40,
        borderRadius : 5,
        borderWidth : 1,
        backgroundColor : 'black',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 20,
    }


})