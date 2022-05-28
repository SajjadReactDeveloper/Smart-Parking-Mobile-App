import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

//Axios
import axios from 'axios';

//User Info
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUserQuery } from '../../../services/userAuthApi'

//Flash Message
import { showMessage, hideMessage } from "react-native-flash-message";

export default function ChangePassword() {
    const [password, setPassword] = React.useState();
    const [token, setToken] = React.useState('');
    React.useEffect(() => {
    (
      async () => {
        const token = JSON.parse(await AsyncStorage.getItem('token'));
        setToken(token);
      }
    )();
  });

    const { data } = useGetUserQuery(token)
    console.log(data)

    const reset = async() => {
        try {
            console.log(password)
            const resp = await axios.post('http://192.168.137.1:5000/user/reset', {
                password
            }, {
                headers: {Authorization: token}
            })
            //If Login Successfull
        if(resp.data.msg == "Password Reset"){
            showMessage({
            message: "Updated",
            type: "success",
          });
        }
        //Login Failed
        else {
            showMessage({
            message: "Registration Failed",
            type: "danger",
          });
        }
        } catch (error) {
            
        }
    }
  return (
    <View style = {{flex: 1, backgroundColor: '#145858'}}>
      <Text style ={{color: 'white', textAlign: 'center', fontSize: 20, marginTop: 20, marginBottom: 20}}>Change Password</Text>
        <Text style = {{color: 'white', marginTop: 10, marginLeft: 10}}>Password</Text>
        <TextInput style = {styles.input} placeholder='Enter Password' onChangeText={setPassword} />
        <Text style = {{color: 'white', marginTop: 30, marginLeft: 10}}>Confirm Password</Text>
        <TextInput style = {styles.input} placeholder='Confirm Password' />
        <TouchableOpacity style = {styles.btn} onPress = {reset}>
            <Text style = {{color: 'white'}}>Update Password</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginHorizontal: 10
    },
    btn: {
        backgroundColor: '#f7b318',
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
        borderRadius: 7,
        margin: 10
    }
})