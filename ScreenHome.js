import { StatusBar } from 'expo-status-bar';
import  React, { useEffect, useState , useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Button ,Share, RefreshControl, Alert} from 'react-native';
import { SafeAreaView } from 'react-native';
import { initializeApp } from "firebase/app";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faXmark ,faEllipsis } from '@fortawesome/free-solid-svg-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Feather'
import { User } from './userContext';
import { getDatabase, set ,ref, push ,onValue , child,get ,remove,onChildChanged ,onChildAdded} from "firebase/database";
import  BottomSheet,{
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetFlatList,
    BottomSheetTextInput
  } from '@gorhom/bottom-sheet';



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


export default function ScreenHome({ navigation }) {

    const [searchText, setSearchText] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [data, setData] = useState([]);
    const [dataComment,setDataComment] = useState([]);
    const [heart,setHeart] = useState(null);
    const isClikHeart  = false;
    const [textComment,setTextComment] = useState();
    const app = initializeApp(firebaseConfig);
    // const db = getDatabase(app);

    const db = getDatabase();
    const dbRef = ref(db, '/post');



//bottomsheetComment
      // variables
      const dataCommentkk = useMemo(
        () =>
          Array(2)
            .fill(0)
            .map((_, index) => `index-${index}`),
        []
      );
      const [refreshing, setRefreshing] = React.useState(false);

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
          reloadPost();
          reloadUser();
        }, 1000);
      }, []);
    

      // ref
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalLikeRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '60%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    callCommentFromFirebase();
  }, []);
  const handleSheetChanges = useCallback((index) => {
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);


  const callLikeFromFirebase = () =>{
        
  }

  // function call comment from firebase realtime

    const callCommentFromFirebase = () =>{

        // const dataArray = [];
        const dbRef = ref(getDatabase());

        
        const dataArray = [];
        const dbRefComment = ref(db, '/comment');

        onValue(dbRefComment, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                // const childData = childSnapshot.val();
                dataArray.push(childSnapshot.val());

                setDataComment(dataArray);
                // console.log(dataComment);
            });
        }, {
        onlyOnce: true
        });
        
    }

    // function onShare

    const onShare = async (item) =>{
        try {
            const result = await Share.share({
            //   message:
            //     'React Native | A framework for building native apps using React',
            Title : item.title,
            Image : item.imageURL
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            // Alert.alert(error.item);        // log lỗi của item share 
          }
    }

  //end BottomSheetComment


  const handlePresentModalPressLike = useCallback(() => {
    bottomSheetModalLikeRef.current?.present();
  }, []);

  const handleClosePressLike = useCallback(() => {
    bottomSheetModalLikeRef.current?.close();
  }, []);



    useEffect(() => {

        const dataArray = [];

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                // const childData = childSnapshot.val();
                dataArray.push(childSnapshot.val());

                setData(dataArray);
                // console.log(data);
            });
        }, {
        onlyOnce: true
        });
        onChildAdded(dbRef, (snapshot) => {
            const newMessage = snapshot.val();
            reloadPost();
        });
        
    },[])

    onChildChanged(dbRef, (snapshot) => {
        const newMessage = snapshot.val();
        reloadPost();
        reloadUser();
    });

    const handleSearch = () => {
        // Lọc bài post dựa trên từ khóa tìm kiếm
        const filtered = data.filter(post => post.nameUserPost.includes(searchText));
        setFilteredPosts(filtered);
        navigation.navigate('ScreenSearchResultsPost', { filteredPosts: filtered });
      };


   
    

    const {userData} = User();
    //fix images cho user
    const imageAvatarDefault = 'https://tse4.mm.bing.net/th?id=OIP.LGfXa5GoclkgmeZiARS1EQHaHd&pid=Api&P=0&h=180';
    const imagesURL = userData.image;
    const [ImageChange, setImageChange] = useState(imagesURL);

    const reloadPost = () => {
        const dataArray = [];

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;

                dataArray.push(childSnapshot.val());
                setData(dataArray);
            });
        }, {
            onlyOnce: true
        });
    }
    const reloadUser = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/` + userData.idUser)).then((snapshot) => {
            if (snapshot.exists()) {
                setImageChange(snapshot.val().image)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    // const deletePost = (index) =>{
    //     dbRef.child(index).remove()
    //     .then(() => {
    //         console.log('Mục đã được xóa thành công từ Firebase.');
    //       })
    //       .catch((error) => {
    //         console.error('Lỗi khi xóa mục từ Firebase:', error);
    //       });
    //     const dataArrayNew = data.filter(item => index !== index);
    //     setData(dataArrayNew);
    // }

    return (
        

       
        <BottomSheetModalProvider>

        
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.imageLogo}>
                    <Image source={require('./images/logo_app.png')} style={{ flex: 1, width: 70, height: 50 }} />
                </View>
                <View style={styles.sreach}>
                    <TouchableOpacity onPress={handleSearch}>
                        <Image source={require('./images/sreach.png')} style={{ width: 32, height: 32, }} />
                    </TouchableOpacity>
                    
                    <TextInput placeholder='Tìm kiếm' onChangeText={text => setSearchText(text)} />
                </View>
            </View>
            <View style={styles.post}>
                <TouchableOpacity onPress={() => navigation.navigate('ScreenProfile')}>
                    <View style={styles.imagesAvatar}>
                        <Image source={{ uri: ImageChange || imageAvatarDefault }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.clickPost} onPress={() => navigation.navigate('ScreenPost')} >
                    <Text>Bạn đang nghĩ gì ?</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                refreshControl={
                                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
            data={data} renderItem={({ item, index }) => {
                return (
                    <View style={styles.cardPost}
                     refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }
                      >
                        <View style={{ height: 8, width: '100%', backgroundColor: '#E0E0E0' }}></View>
                        <View style={styles.itemUser}>
                            <Image source={{ uri: item.imageUserPost }} style={{ height: 50, width: 50, borderRadius: 25 }} />
                            <View style={{ flex: 6, justifyContent: 'space-between', paddingLeft: 10, width: '100%', height: 45, flexDirection: 'column' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.nameUserPost}</Text>
                                <Text>{item.timePost}</Text>
                            </View>
                            <View style={{ flex: 1.5, flexDirection: 'row', paddingRight: 10, justifyContent: 'space-between' }}>
                                <TouchableOpacity>
                                    <FontAwesomeIcon icon={faEllipsis} size={25} color='black' />
                                </TouchableOpacity>
                            </View>
                        </View>

                            <View style={styles.itemPost}>
                                <Text style={{ padding : 10}}>{item.contentPost}</Text>
                                <Image source={{uri : item.imagePost}} style={{ height : 700 , width : '100%'}} />
                            </View>
                            <View style={styles.likeCommentShare}>

                                <View style={{ flexDirection : 'row' , alignItems : 'center'}}>
                                    <TouchableOpacity >
                                    <AntDesign name="hearto" size={30} color="#000000" />
                                    </TouchableOpacity>
                                <TouchableOpacity  onPress={handlePresentModalPressLike}>
                                <Text style={{ marginLeft : 5}}>Like</Text>
                                </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={{ flexDirection : 'row' , alignItems : 'center'}} onPress={
                                    
                                    handlePresentModalPress
                                    
                                    }>
                                <Icon name='comment-o' size={30} color={"#000000"}/>
                                <Text style={{ marginLeft : 5}}>Comment</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ flexDirection : 'row' , alignItems : 'center'}} onPress={onShare(item ={
                                                                                                                    title : item.contentPost,
                                                                                                                    imageURL : item.imagePost,


                                })}>
                               <MaterialCommunityIcons name='share-outline' size={30} />
                               <Text style={{ marginLeft : 5}}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}>
                </FlatList>
                    <BottomSheetModal
                    ref={bottomSheetModalLikeRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    >
                    <View style={styles.contentContainerLike}>
                        <Text>Awesome 🎉 like</Text>
                        <TouchableOpacity onPress={handleClosePressLike}>
                            <FIcon name='x' size={20}/>
                        </TouchableOpacity>
                    </View>
                    <BottomSheetFlatList

                    >

                    </BottomSheetFlatList>
                    </BottomSheetModal>
                
                    <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    >
                    <View style={styles.contentContainerComment}>
                        <View style={{  flexDirection : 'row',justifyContent : 'space-between',}}>
                            <View>
                            </View>
                            <Text style={{ fontSize : 15}}>Bình luận</Text>
                            <TouchableOpacity onPress={handleClosePress}>
                                <FIcon name='x' size={20}/>
                            </TouchableOpacity>
                        </View>
                        
                        <BottomSheetFlatList
                            data={dataComment}
                            keyExtractor={(i) => i}
                            renderItem={
                                    ({ item }) => (
                                      <View style={{ flex :1 , flexDirection : 'row'}}>
                                        <View>
                                            <Image source={{ uri : item.imageUserComment}} style={{ width : 40 , height : 40 , borderRadius : 20}}/>
                                        </View>
                                        <View style ={{ paddingLeft  : 10}}>
                                            <Text style={{ fontWeight : '700'}}>{item.nameUserComment}</Text>
                                            <Text>{item.content}</Text>
                                        </View>

                                      </View>
                                    )
                                    }
                            contentContainerStyle={styles.contentContainer}
                            />
                        <View style={styles.viewComment}>
                            <BottomSheetTextInput style={{ width : 400}} placeholder='Bình luận' onChangeText={(Text) =>setTextComment(Text)}/>
                            <TouchableOpacity>
                                <FIcon name='send' size={24} />
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                    </BottomSheetModal>

        </View>
        </BottomSheetModalProvider>
        

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 70,
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
    },
    imageLogo: {
        width: 90,
        height: 70,
        justifyContent: 'center'
        , alignItems: 'center'
    },
    sreach: {
        width: 260,
        height: 40,
        flex_shrink: 0,
        borderWidth: 1.5,
        borderColor: '#D9D9D9',
        marginLeft: 15,
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
        flexDirection: 'row'
    },
    post: {
        flexDirection: 'row',
        height: 60,
        alignItems: "center",
        marginLeft: 10
    },
    imagesAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clickPost: {
        width: 300,
        height: 40,
        justifyContent: 'center',
        marginLeft: 10,
    },
    cardPost: {
        flex : 1
    },
    itemUser: {

        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        width: 400,
        height: 70,
        // alignItems : 'center'
    },
    itemPost: {

    },
    likeCommentShare :{
        height : 50,
        width : '100%',
        flexDirection : 'row', 
        alignItems : 'center', 
        justifyContent : 'space-between',
        paddingLeft : 15,
        paddingRight : 15
    },
    contentContainerComment:{
        flex : 1,
        paddingRight : 10,
        paddingLeft : 10
    },

    //style comment
    viewComment:{
        flexDirection : 'row',
        alignItems : 'center'
    }

});