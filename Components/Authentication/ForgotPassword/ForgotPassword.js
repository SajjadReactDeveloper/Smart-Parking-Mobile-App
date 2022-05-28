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

export default function ForgotPassword ({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = async() => {
    try {
        const res = await axios.post("http://192.168.137.1:5000/user/login", { email, password });

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
          navigation.navigate('Home');
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
      <View style = {styles.icon}>
        <AntDesign name='user' color={"#f7b318"} size = {50} />
      </View>
      <Text style = {{color: '#f7b318', fontSize: 26, marginTop: 30, marginHorizontal: 10, marginBottom: 1}}>Forgot Password?</Text>
      <Text style = {{margin: 10, color: 'white', fontSize: 16, lineHeight: 25.5}}>Don't worry it happens. Please Enter the email address associated with this account</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput placeholderTextColor='white' style={styles.input} placeholder="Enter Email" onChangeText={setEmail} />
      <TouchableOpacity style={styles.button} onPress = {login}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style = {{marginTop: 20, textAlign: 'center', color: 'white'}} onPress = {() => {
          navigation.navigate('Login')
      }}>Back to Login</Text>
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
    marginTop: 30,
    marginHorizontal: 10,
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