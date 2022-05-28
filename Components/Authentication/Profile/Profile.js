import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native'
import React from 'react'

//User Info
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUserQuery } from '../../../services/userAuthApi'

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//Avatar
import { Avatar } from 'react-native-paper';

//Flash Message
import { showMessage, hideMessage } from "react-native-flash-message";

//Import Image Picker
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import axios from 'axios';

export default function Profile({navigation}) {
  const [token, setToken] = React.useState('');
  const [name, setName] = React.useState('');
  React.useEffect(() => {
    (
      async () => {
        const token = JSON.parse(await AsyncStorage.getItem('token'));
        setToken(token);
      }
    )();
  });

    const { data } = useGetUserQuery(token)

    const [uri, setUri] = React.useState();
    const [avatar, setAvatar] = React.useState('');

  const openGalery = async() => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true, 
    }
    launchImageLibrary(options, response => {
      if(response.didCancel){
        alert('Cancel')
      }
      else{
        setUri(response.assets[0].uri); 
      }
    })
  }

  const changeAvatar = async () => {
      try {   
        console.log("Hello")
        let formData = new FormData();
        formData.append("file", {
          name: new Date + "_profile",
          uri: uri,
          type: 'image/jpeg'
        });
        const res = await axios.post("http://192.168.137.1:5000/api/uploadAvatar", formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          }});
          console.log(res.data.url)
        await setAvatar(res.data.url);
        console.log("Avatar", avatar)
         const resp = await axios.patch('http://192.168.137.1:5000/user/update', {
                name: name ? name: data.name,
                avatar: avatar ? avatar: data.avatar,

            }, {
                headers: {Authorization: token}
            })
            //If Login Successfull
        if(resp.data.msg == "Updated"){
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
      } 
      catch (error) {
        
      }
    };
  return (
    <ScrollView style = {{flex: 1, backgroundColor: '#145858'}}>
      <Text style = {{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 24, marginTop: 20}}>My Profile</Text>
      <View style = {{backgroundColor: 'white', marginTop: 30, margin: 10, padding: 20, borderRadius: 5}}>
        <View style = {{marginBottom: 20}}>
            <Avatar.Image size={70} style = {{textAlign: 'center', alignSelf: 'center'}} source={{uri: uri ? uri: data ? data.avatar: null }}/>
        </View>
        <View>
            <TouchableOpacity style = {styles.btn1} onPress = {openGalery}>
                <Text style = {{color: 'white'}}>Upload Image</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text style = {styles.text}>Name<Text style = {{color: 'red'}}>*</Text></Text>
            <TextInput style = {styles.input} placeholder='Enter Name' onChangeText = {setName} value = {data ? data.name: null} />
        </View>
        <View>
            <Text style = {styles.text}>Email</Text>
            <TextInput style = {styles.input} placeholder='Enter Email' editable = {false} value = {data ? data.email: null} />
        </View>
        <View>
            <Text style = {styles.text}>Role</Text>
            <TextInput style = {styles.input} placeholder='Enter Role' editable = {false} value = {data ? data.role == 0 ? "Car Owner": "Admin": null} />
        </View>
        <View>
            <TouchableOpacity style = {styles.btn} onPress = {changeAvatar}>
                <Text style = {{color: 'white'}}>Update Profile</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity style = {styles.btn} onPress = {() => {
              navigation.navigate('changePassword')
            }}>
                <Text style = {{color: 'white'}}>Change Password</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#f7b318',
        marginBottom: 20
    },
    btn: {
        backgroundColor: '#f7b318',
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
        borderRadius: 7
    },
    btn1: {
        backgroundColor: '#f7b318',
        width: 130,
        padding: 10,
        marginBottom: 10,
        borderRadius: 6,
        alignSelf: 'flex-end'
    },
    image: {
        width: 80,
        height: 80,
        backgroundColor: 'red',
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20
    }
})