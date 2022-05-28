import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react';

//Axios
import axios from 'axios';

//React Native Paper
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

//User Info
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUserQuery } from '../../../services/userAuthApi';

//Flash Message
import { showMessage, hideMessage } from "react-native-flash-message";

export default function ComplaintDetails({ route, navigation }) {
    const [token, setToken] = React.useState('');
    const [response, setResponse] = React.useState();
    const [value, setValue] = React.useState();

  React.useEffect(() => {
    (
      async () => {
        const token = JSON.parse(await AsyncStorage.getItem('token'));
        setToken(token);
      }
    )();
  });

    const { data } = useGetUserQuery(token)
    const { data1 } = route.params;
    console.log("Complaint: ", data1)

    const responseAdmin = async () => {
        console.log(data1.userId, data1._id);
        const res = await axios.post(`http://172.20.0.49:5000/response/viewResponse`, {userId: data1.userId, complaintId: data1._id});
        setResponse(res.data);
        console.log(res.data);
    }


    const deleteComplaint = async (id) => {
      try {
        const res = await axios.delete(`http://192.168.137.1:5000/complaint/deleteComplaint/${id}`);
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
        navigation.navigate('Dashboard')
      } catch (error) {}
    };
  return (
    <View style = {{flex: 1, backgroundColor: '#145858'}}>
        <Text style = {{marginTop: 20, textAlign: 'center', fontSize: 20, color: 'white' }}>Complaint Details</Text>
      <Card style = {{margin: 20}}>
        <View style = {{display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: 10}}>
            <View><Avatar.Image size={30} source={{uri: data ? data.avatar: null}} /></View>
            <Card.Title title={data ? data.name : null} subtitle="Car Owner" />
        </View>
        <Card.Content>
            <Paragraph>Complaint Id</Paragraph>
            <View style = {styles.data}><Text style = {{color: 'white'}}>{data1._id}</Text></View>
            <Paragraph>Complaint Type</Paragraph>
            <View style = {styles.data}><Text style = {{color: 'white'}}>{data1.type}</Text></View>
            <Paragraph>Complaint Title</Paragraph>
            <View style = {styles.data}><Text style = {{color: 'white'}}>{data1.title}</Text></View>
            <Paragraph>Complaint Description</Paragraph>
            <View style = {styles.data}><Text style = {{color: 'white'}}>{data1.description}</Text></View>
            <Paragraph>Complaint Status</Paragraph>
            <View style = {styles.data}><Text style = {{color: 'white'}}>{data1.status}</Text></View>
        </Card.Content>
        <Card.Actions>
            <Button onPress={() => responseAdmin()}>View Response</Button>
            <Button onPress={() => navigation.navigate('Complaints')}>Back</Button>
            <Button onPress={() => deleteComplaint(data1._id)}>Delete</Button>
        </Card.Actions>
        <View>
          {response ? (
            <View>
              <Text style = {{color: 'black', marginLeft: 20, marginBottom: 10}}>Response From Admin:</Text>
              <Text style = {{color: 'black', marginLeft: 20, marginBottom: 20, backgroundColor: 'gray', padding: 10, marginRight: 20, borderRadius: 8, color: 'white'}}>{response.response}</Text>
            </View>
          ): null}
        </View>
    </Card>
    </View>
  )
}

const styles = StyleSheet.create({
    data: {
        backgroundColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius: 6
    }
})