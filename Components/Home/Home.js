import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

//User Info
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUserQuery } from '../../services/userAuthApi';

export default function Home({navigation}) {
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
  console.log(data)

  const logout = async() => {
    await AsyncStorage.setItem('firstLogin', 'false');
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login')
  }

  return (
    <View style = {styles.container}>
      <FontAwesome name='parking' size={70} color={"#f7b318"} style = {{marginTop: 40, alignSelf: 'center'}} />
      <Text style = {[styles.text, {marginTop: 10}]}>Welcome to</Text>
      <Text style = {[styles.text, {fontWeight: 'bold', textTransform: 'uppercase'}]}>Smart Parking</Text>
      <View style = {{display:'flex', flexDirection: 'row', alignItems: 'center' , marginTop: 40}}>
        <FontAwesome name='user-circle' size={30} color={"#f7b318"} style = {{ marginLeft: 30, marginRight: 10}} />
        <Text style = {{color: '#f7b318', fontSize: 22}}>{data? data.name: null}</Text>
      </View>
      <View style = {{display:'flex', flexDirection: 'row', alignItems: 'center' , marginTop: 20}}>
        <MaterialIcon name='email' size={30} color={"#f7b318"} style = {{ marginLeft: 30, marginRight: 10}} />
        <Text style = {{color: '#f7b318', fontSize: 22}}>{data? data.email: null}</Text>
      </View>
      <View style = {{marginTop: 'auto', flexDirection: 'row', display: 'flex'}}>
        <Pressable style = {styles.btn} onPress = {() => {
          navigation.navigate('Cars')
        }}>
          <Ionicons name='car' size={40} color={"white"} />
          <Text style = {styles.btnText}>Cars</Text>
        </Pressable>
        <Pressable style = {styles.btn} onPress = {() => {
          navigation.navigate('Complaints')
        }}>
          <FontAwesome5 name='file-text-o' size={30} color={"white"} style = {{marginBottom: 10}} />
          <Text style = {styles.btnText}>Complaints</Text>
        </Pressable>
        
        <Pressable style = {styles.btn} onPress = {() => {
          navigation.navigate('Complaints')
        }}>
          <MaterialIcon name='local-parking' size={40} color={"white"} />
          <Text style = {styles.btnText}>Booking</Text>
        </Pressable>
        </View>
        <View style = {{flexDirection: 'row', display: 'flex', marginBottom: 20}}>
        <Pressable style = {styles.btn} onPress = {() => {
          navigation.navigate('Profile')
        }}>
          <FontAwesome name="user-circle" size={40} color="white"/>
          <Text style = {styles.btnText}>Profile</Text>
        </Pressable>
        <Pressable style = {styles.btn} onPress = {() => {
          navigation.navigate('Chat')
        }}>
          <Ionicons name="chatbubble-ellipses" size={40} color="white"/>
          <Text style = {[styles.btnText, {marginTop: 10}]}>Chat</Text>
        </Pressable>
        <Pressable style = {styles.btn} onPress = {logout}>
          <Ionicons name="log-in-outline" size={40} color="white"/>
          <Text style = {styles.btnText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
  },
  container: {
    flex: 1,
    // backgroundColor: '#6b9d2a'
    backgroundColor: '#145858',
  },
  btn: {
    // backgroundColor: '#2d452f',
    backgroundColor: '#f7b318',
    padding: 10,
    margin: 10,
    width: 100,
    flex: 1,
    borderRadius: 3,
    alignItems:'center'
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center'
  }
})