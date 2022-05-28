import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React from 'react'

//Axios
import axios from 'axios';

//Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//Vector Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

//Flash Message
import { showMessage, hideMessage } from "react-native-flash-message";

export default function Login ({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = async() => {
    try {
        const res = await axios.post("http://172.21.32.1:5000/user/login", { email, password });

        //If Login Successfull
        if(res.data.msg == "Login Successfull!"){
            showMessage({
            message: "Login Successfull",
            type: "success",
          });
          //Storing Token in Async Storage
          await AsyncStorage.setItem('firstLogin', 'true');
          await AsyncStorage.setItem('token', JSON.stringify(res.data.token));
          //Navigation To Dashboard
          navigation.navigate('Dashboard');
        }
        //Login Failed
        else {
            showMessage({
            message: "Login Failed",
            type: "danger",
          });
        }
      } catch (error) {
        console.log("Error: ", error);
      }
  }
  return (
    <View style={{backgroundColor: '#145858', flex: 1, justifyContent: 'center'}}>
      {/* <Text style={styles.mainText}>
        Login with one of the following options
      </Text> */}
      {/* <View style={styles.icons}>
        <View style = {{ marginRight: 10, backgroundColor: '#c8e0ca', padding: 10, borderRadius: 7, width: '50%', textAlign: 'center', alignItems: 'center'}}>
            <MaterialIcons name='facebook' color={"#4267B2"} size = {40} />
        </View>
        <View style = {{ backgroundColor: '#c8e0ca', padding: 10, borderRadius: 7, width: '50%', textAlign: 'center', alignItems: 'center'}}>
            <AntDesign name='google' color={"#db4a39"} size = {40} />
        </View>
      </View> */}
      {/* <Text style = {{color: '#c8e0ca', textAlign: 'center', margin: 10, fontSize: 20, fontWeight: 'bold'}}>or Login with</Text> */}
      <View style = {styles.icon}>
        <AntDesign name='user' color={"#f7b318"} size = {50} />
      </View>
      <Text style = {{color: 'white', fontSize: 26, textAlign: 'center', margin: 10, marginBottom: 10}}>Login</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput placeholderTextColor='white' style={styles.input} placeholder="Enter Email" onChangeText={setEmail} />
      <Text style={[styles.label, {marginTop: 20}]}>Password</Text>
      <TextInput placeholderTextColor='white' style={styles.input} secureTextEntry placeholder="Enter Password" onChangeText={setPassword} />
      <TouchableOpacity style = {{alignItems: 'center', margin: 15}} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style = {{color: 'white'}}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress = {login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.signUpText}
        onPress={() => navigation.navigate('Signup')}>
        Dont have an Account? Sign up
      </Text>
      <View style={{flexDirection: 'row', marginTop: 20, marginHorizontal: 20}}>
        <View style={{backgroundColor: 'white', height: 1, flex: 1, alignSelf: 'center'}} />
          <Text style={{ alignSelf:'center', paddingHorizontal:7, color: 'white' }}>or Login with</Text>
        <View style={{backgroundColor: 'white', height: 1, flex: 1, alignSelf: 'center'}} />
      </View>
      <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
        <View style = {{ marginRight: 10, backgroundColor: 'white', padding: 6, borderRadius: 50, textAlign: 'center', alignItems: 'center'}}>
            <MaterialIcons name='facebook' color={"#4267B2"} size = {40} />
        </View>
        <View style = {{ padding: 6, backgroundColor: 'white', borderRadius: 50, textAlign: 'center', alignItems: 'center'}}>
            <AntDesign name='google' color={"#db4a39"} size = {40} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    padding: 10,
    marginTop: 40,
    color: 'white',
  },
  label: {
    paddingHorizontal: 13,
    color: '#f7b318',
  },
  input: {
    // padding: 15,
    // borderWidth: 3,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    // borderColor:
    //   'linear-gradient(90deg, rgba(127,5,142,1) 0%, rgba(211,41,162,1) 85%)',
    borderColor: '#c8e0ca' ,
    borderRadius: 5,
    color: 'white',
  },
  button: {
    // backgroundColor:
    //   'linear-gradient(90deg, rgba(127,5,142,1) 0%, rgba(211,41,162,1) 85%)',
    backgroundColor: '#f7b318',
    padding: 20,
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  signUpText: {
    textAlign: 'center',
    color: 'white',
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10
  },
  icon: {
    backgroundColor: '#FFFFFF',
    width: 80,
    height: 80,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  }
});