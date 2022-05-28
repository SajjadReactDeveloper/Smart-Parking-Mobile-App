import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

//Drawer
import { DrawerContentScrollView, DrawerItem, TouchableOpacity } from '@react-navigation/drawer'

//React Native Paper
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//User Info
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUserQuery } from '../../services/userAuthApi';

export default function DrawerContent(props) {
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

  const logout = async() => {
      await AsyncStorage.setItem('firstLogin', 'false');
      await AsyncStorage.removeItem('token');
      props.navigation.navigate('Login')
  }
  return (
    <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
            <View style = {styles.userInfoSection}>
                <View style = {{flexDirection:'row', marginTop:15}}>
                    <Avatar.Image size={50} source={{uri: data ? data.avatar:null }}/>
                </View>
                <View style = {{marginLeft: 10, flexDirection: 'column', marginTop: 10}}>
                    <Title style={styles.title}>{data ? data.name: null}</Title>
                    <Caption style={styles.caption}>{data? data.email: null}</Caption>
                </View>
            </View>
            <Drawer.Section style = {styles.drawerSection}>
                <DrawerItem icon={() => <Ionicons name="home-outline" size={30} color="black"/>} label="Dashboard" onPress = {() => props.navigation.navigate('Smart Parking')}/>
                <DrawerItem icon={() => <Ionicons name="car" size={30} color="black"/>} label="Cars" onPress = {() => props.navigation.navigate('Cars')}/>
                <DrawerItem icon={() => <Ionicons name="book-outline" size={30} color="black"/>} label="Book Parking" onPress = {() => props.navigation.navigate('')}/>
                <DrawerItem icon={() => <FontAwesome name="file-text-o" size={30} color="black"/>} label="Complaints" onPress = {() => props.navigation.navigate('Complaints')}/>
                <DrawerItem icon={() => <FontAwesome name="user" size={30} color="black"/>} label="Profile" onPress = {() => props.navigation.navigate('Profile')} />
                <DrawerItem icon={() => <Ionicons name="chatbubble-ellipses" size={30} color="black"/>} label="Chat" onPress = {() => props.navigation.navigate('Chat')} />
            </Drawer.Section>
        </DrawerContentScrollView>
        <Drawer.Section style = {styles.bottomDrawerSection}>
                <DrawerItem icon={() => <Ionicons name="log-in-outline" size={30} color="black"/>} label="Sign Out" onPress={logout}/>
        </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 10,
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#fcfcfc',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16 
    }
}) 