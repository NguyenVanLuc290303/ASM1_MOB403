import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, FlatList ,Alert } from 'react-native';
import { getDatabase, set, ref, push, update, child, orderByChild, equalTo, query, get, onValue, remove } from "firebase/database";
import { getStorage, uploadBytes, ref as sRef, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { User } from './userContext';
import { useState } from 'react';



export default function ScreenUpdatePost({route}) {
    const {id,idUser,content,image,nameUser,imageUser,time} = route.params;


    const [imageUpdate,setImageUpdate] = useState(null);
    const [contentUpdate,setContentUpdate] = useState();
    const timeUpdate = new Date().getTime();


    const uniqueFileName = `image_${new Date().getTime()}.jpg`;

    const db = getDatabase();
    const storage = getStorage();

    const storageRef = sRef(storage,uniqueFileName);
    



    const postImageUpdate = async () =>{
        
        const response = await fetch(imageUpdate);

        const blob = await response.blob();
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            return getDownloadURL(storageRef);
           
          })
          
          .then((url) => {
                console.log(url);
                updatePostToFireBaseRealTime(url);
          })
          .catch((error) => {
            console.error('Không thể tải lên hình ảnh:', error);
          });
          
}



const updatePostToFireBaseRealTime = async (imageURL) =>{


    const rt= new Date().getTime();
    
    console.log(imageURL);
    set(ref(db, 'post/' + id), {
      id : id,
      idUserPost : idUser,
      contentPost: contentUpdate,
      imagePost: imageURL,
      timePost: timeUpdate,
      nameUserPost: nameUser,
      imageUserPost: imageUser,  
        }).catch((error) =>{                        //dòng này fix thêm lỗi nếu lỗi firebase hãy sửa từ dòng này đến 161
            console.log('lỗi đăng lên firebase')
        }).then(()=>{
        Alert.alert('Update thành công');
        navigation.navigate('ManageBottom');
    })
}


const openPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setImageUpdate(result.assets[0].uri);
    }
    else{
        
    }
}




    return(
        <View style ={styles.container}>
            <View style={styles.headerUpdate}>

            </View>
            <View style={styles.viewDisplayItemUpdate}>
                <TextInput  onChangeText={(Text) => setContentUpdate(Text)} />
                <View>
                    <Image source={{ uri : imageUpdate}} style = {{ width : '100%' , height : 500}}/>
                </View>
                
            </View>
            <View style={ styles.PickerImageUpdate}>
                <TouchableOpacity onPress={openPickImage}>
                    <Text>Chọn Ảnh</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ width : 100 , height : 40, justifyContent: 'center' ,  alignItems : 'center'}} onPress={postImageUpdate}>
                <Text>Lưu</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex :1,
        paddingTop : 20
    }
})