import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//Axios
import axios from 'axios';

//Flash Message
import { showMessage, hideMessage } from "react-native-flash-message";

//User Info
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUserQuery } from '../../../services/userAuthApi';

//Import Image Picker
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

//Avatar
import { Avatar } from 'react-native-paper';

export default function AddCar() {
  const [token, setToken] = React.useState('');
  React.useEffect(() => {
    (
      async () => {
        const token = JSON.parse(await AsyncStorage.getItem('token'));
        setToken(token);
      }
    )();
  });

    const { data } = useGetUserQuery(token);

    const [regNo, setRegNo] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [color, setColor] = React.useState('');
    const [model, setModel] = React.useState('');
    const [ownerName, setOwnerName] = React.useState('');
    const [avatar, setAvatar] = React.useState('');

    const register = async() => {
        try {
            const res = await axios.post('http://192.168.10.4:5000/car/addCar', {
                regNo, brand, model, color, ownerName, ownerId: data._id, ownerAvatar: data.avatar, carImage: avatar
            })
            //If Login Successfull
        if(res.data.msg == "Your Request has been send"){
            showMessage({
            message: "Your Request has been send",
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

    const [uri, setUri] = React.useState();

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
        let formData = new FormData();
        formData.append("file", {
          name: new Date + "_profile",
          uri: uri,
          type: 'image/jpeg'
        });
        const res = await axios.post("http://192.168.10.4:5000/api/uploadAvatar", formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          }});
        await setAvatar(res.data.url);
        console.log("Avatar", avatar)
        const resp = await axios.post('http://192.168.10.4:5000/car/addCar', {
                regNo, brand, model, color, ownerName: data.name, ownerId: data._id, ownerAvatar: data.avatar, carImage: avatar
            })
            //If Login Successfull
        if(resp.data.msg == "Your Request has been send"){
            showMessage({
            message: "Your Request has been send",
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
    <ScrollView contentContainerStyle = {{backgroundColor: '#145858', flex: 1, justifyContent: 'center'}}>
        <Ionicons name='car-sport' color={"#f7b318"} size = {70} style = {{textAlign: 'center'}} />
      <Text style = {styles.mainText}>Register Your Car</Text>
      <View style = {styles.imageUpload}>
        {uri ? <Avatar.Image size={70} source={{uri: uri ? uri:null }}/>: <Ionicons name='add' color = "black" size = {70} style = {{textAlign: 'center'}} onPress = {openGalery} />}
      </View>
      <Text style = {styles.label}>License Number</Text>
      <TextInput placeholderTextColor='white' placeholder='Enter Car Registration Number' style = {styles.input} onChangeText = {setRegNo}/>
      <Text style = {styles.label}>Brand</Text>
       <TextInput placeholderTextColor='white' placeholder='Enter Car Brand' style = {styles.input} onChangeText = {setBrand}/>
      <Text style = {styles.label}>Model</Text>
       <TextInput placeholderTextColor='white' placeholder='Enter Car Model' style = {styles.input} onChangeText = {setModel} />
      <Text style = {styles.label}>Color</Text>
       <TextInput placeholderTextColor='white' placeholder='Enter Car Color' style = {styles.input} onChangeText = {setColor} />
      {/* <Text style = {styles.label}>Owner Name</Text>
       <TextInput placeholderTextColor='white' placeholder='Enter Car Owner Name' style = {styles.input} onChangeText = {setOwnerName} /> */}
       <TouchableOpacity style = {styles.button} onPress = {changeAvatar}>
           <Text style = {styles.buttonText}>Register</Text>
       </TouchableOpacity>
     </ScrollView>
  );
}

const styles = StyleSheet.create({
    mainText: {
    padding: 10,
    // marginTop: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  label: {
    // padding: 10,
    color: '#f7b318',
    paddingHorizontal: 14,
    marginTop: 15
  },
  input: {
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor:
      '#f7b318',
    borderRadius: 5,
    color: 'white'
  },
  button: {
    backgroundColor:
      '#f7b318',
    padding: 20,
    justifyContent: 'center',
    margin: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  signUpText: {
    textAlign: 'center',
  },
  icons: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center'
  },
  imageUpload: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 50
  }
})