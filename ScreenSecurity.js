import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function ScreenSecurity({navigation}){
    return(
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Đổi mật khẩu')}>
            <View style={styles.line}></View>
                <View style={{ marginTop : 10 , height : 50 ,justifyContent : 'center'}}>
                    <Text style={styles.textUser}>Đổi mật khẩu</Text>
                </View>
                <View style={styles.line}></View>
            </TouchableOpacity>
            <TouchableOpacity >
            {/* <View style={styles.line}></View> */}
                <View style={{ marginTop : 10 , height : 50 ,justifyContent : 'center'}}>
                    <Text style={styles.textUser}>Xác minh 2 bước</Text>
                </View>
                <View style={styles.line}></View>
            </TouchableOpacity>
            <TouchableOpacity >
            {/* <View style={styles.line}></View> */}
                <View style={{ marginTop : 10 , height : 50 ,justifyContent : 'center'}}>
                    <Text style={styles.textUser}>Thiết bị của bạn</Text>
                </View>
                <View style={styles.line}></View>
            </TouchableOpacity>
            <TouchableOpacity >
            {/* <View style={styles.line}></View> */}
                <View style={{ marginTop : 10 , height : 50 ,justifyContent : 'center'}}>
                    <Text style={styles.textUser}>Quản lý quyền của ứng dụng</Text>
                </View>
                <View style={styles.line}></View>
            </TouchableOpacity>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container:{
        backgroundColor : 'white'
    },
    line: {
      width: '100%',
      height: 0.4, // Độ cao của đường kẻ ngang
      backgroundColor: '#A5A5A5', // Màu của đường kẻ ngang
    },
    textUser :{
      fontWeight : '600' ,
      fontSize : 17 ,
      paddingLeft : 15
    }
})