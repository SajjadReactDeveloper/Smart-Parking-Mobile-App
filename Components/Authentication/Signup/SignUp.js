import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

//Axios
import axios from 'axios';

//Vector Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

//Flash Message
import { showMessage, hideMessage } from "react-native-flash-message";

export default function SignUp({navigation}) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const signup = async() => {
    try {
        const res = await axios.post('http://192.168.137.1:5000/user/register', {
            name, email, password,
        })
        if(res.data.msg == "Account has been Created"){
            showMessage({
            message: "Registration Successful",
            type: "success",
          });
          //Navigation To Login Page
          navigation.navigate('Login');
        }
        //Login Failed
        else if(res.data.msg == "Invalid Email") {
            showMessage({
            message: "Invalid Email",
            type: "danger",
          });
        }
        else if(res.data.msg == "Please Fill all Fields") {
            showMessage({
            message: "Please Fill all Fields",
            type: "danger",
          });
        }
        else if(res.data.msg == "Email Already exist") {
            showMessage({
            message: "Email Already exist",
            type: "danger",
          });
        }
        else if(res.data.msg == "Password should be atlest 6 characters") {
            showMessage({
            message: "Password should be atlest 6 characters",
            type: "danger",
          });
        }
    } catch (error) {
        
    }
}
  return (
    <KeyboardAvoidingView style = {{backgroundColor: '#145858', flex: 1, justifyContent: 'center'}}>
      <View style = {styles.icon}>
        <AntDesign name='user' color={"#f7b318"} size = {50} />
      </View>
      <Text style = {{color: 'white', fontSize: 26, textAlign: 'center', margin: 10, marginBottom: 10}}>Sign Up</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput placeholderTextColor='white' style={styles.input} placeholder="Enter Name" onChangeText={setName} />
      <Text style={styles.label}>Email</Text>
      <TextInput placeholderTextColor='white' style={styles.input} placeholder="Enter Email" onChangeText={setEmail} />
      <Text style={styles.label}>Password</Text>
      <TextInput secureTextEntry placeholderTextColor='white' style={styles.input} placeholder="Enter Password" onChangeText={setPassword} />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput secureTextEntry placeholderTextColor='white' style={styles.input} placeholder="Confirm Password" />
      <TouchableOpacity style={styles.button} onPress = {signup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText} onPress={() => navigation.navigate('Login')}>Already have an Account? Login</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    mainText: {
    padding: 10,
    marginTop: 40,
    color: 'white'
  },
  label: {
    paddingHorizontal: 15,
    color: '#f7b318',
    marginTop: 15
  },
  input: {
    // padding: 15,
    borderBottomWidth: 3,
    marginHorizontal: 10,
    borderColor: '#c8e0ca',
    borderRadius: 5,
    color: 'white'
  },
  button: {
    backgroundColor: '#f7b318',
    padding: 20,
    justifyContent: 'center',
    margin: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  signUpText: {
    textAlign: 'center',
    color: 'white'
  },
  icons: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 15
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
})
