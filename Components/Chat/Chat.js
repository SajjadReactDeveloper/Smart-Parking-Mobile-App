import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'

//Flash Message
import { showMessage, hideMessage } from "react-native-flash-message";

//Axios
import axios from 'axios';

//Import React Native Paper
import { Avatar, TextInput } from 'react-native-paper';

//User Info
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUserQuery } from '../../services/userAuthApi'

//Import Icons
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function Chat({navigation}) {
  const [message, setMessage] = React.useState([]);
  const [messages, setMessages] = React.useState();
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

    React.useEffect(() => {
      const getData = async() => {
        const res = await axios.post(`http://172.20.0.49:5000/message/syncSpecific`, {
          receiver: data._id,
        });
        setMessage(res.data);
      }
      getData();
  });

  const submit = async() => {
    try {
      console.log(messages)
      const res = await axios.post("http://172.20.0.49:5000/message/new", {
        sender: data._id,
        receiver: '624c4de730dda6331c433183',
        message: messages,
        received: false,
        Hours: new Date().getHours(),
        Minutes: new Date().getMinutes(),
      });
      if(res.data.msg == "New Mesage"){
            showMessage({
            message: "Sent",
            type: "success",
          });
          setMessages('')
        }
        //Login Failed
        else {
            showMessage({
            message: "Sending Failed",
            type: "danger",
          });
        }
    } catch (error) {

    }
  }

  const deleteMessage = (id) => {
    try {
      const res = axios.delete(`http://192.168.10.4:5000/message/deleteMessage/${id}`);
      if(res.data.msg == "Deleted"){
            showMessage({
            message: "Deleted",
            type: "success",
          });
        }
        //Login Failed
        else {
            showMessage({
            message: "Deletion Failed",
            type: "danger",
          });
        }
    } catch (error) {}
  };
  return (
    <View style = {{flex: 1}}>
      <View style = {styles.header}>
          <Ionicons name='chevron-back' color = "white" size = {25} style = {{marginRight: 10}} onPress = {() => {
              navigation.navigate('Dashboard')
          }} />
        <Avatar.Text size={40} label="S" />
        <Text style = {styles.text}>Smart Parking</Text>
      </View>
      <View>
        {message.map(message => (
          
            message.receiver == data._id ? (<ScrollView style= {{backgroundColor: 'gray', padding: 10, alignSelf: 'flex-start', margin: 10, borderRadius: 10}}>
            <Text style = {{color:'white'}}>{message.message}</Text>
          </ScrollView>): (<ScrollView contentContainerStyle = {{backgroundColor: 'green', padding: 10, alignSelf: 'flex-end', margin: 10, borderRadius: 10, flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
            <Text style = {{color:'white'}}>{message.message}</Text>
            <AntDesign name = "delete" size = {20} color = "red" style = {{marginLeft: 5}} onPress={() => deleteMessage(message._id)} />
          </ScrollView>)
          
        ))}
      </View>
      <View style = {styles.input}>
        <TextInput
            placeholder='Write Message .....'
            right={<TextInput.Icon name="send" onPress = {submit} />}
            style = {{borderTopLeftRadius: 15, borderTopRightRadius: 15}}
            onChangeText = {setMessages}
            value = {messages}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#145858',
        paddingVertical: 20
    },
    text: {
        color: 'white',
        marginLeft: 10,
        fontSize: 18
    },
    input: {
        marginTop: 'auto',
    }
})