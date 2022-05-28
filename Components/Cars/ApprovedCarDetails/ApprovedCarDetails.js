import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios';

//React Native Paper
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function ApprovedCarDetails({ route, navigation }) {
    const { data } = route.params;
    console.log(data)

  const deleteApprovedCar = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`http://192.168.137.1:5000/car/deleteApprovedCar/${id}`);
      alert(res.data.msg);
      
    } catch (error) {}
  };
  return (
    <View style = {{flex: 1, backgroundColor: '#145858'}}>
        <Text style = {{marginTop: 20, textAlign: 'center', fontSize: 20, color: 'white' }}>Car Details</Text>
      <Card style = {{margin: 20}}>
        <View style = {{display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: 10}}>
            <View><Avatar.Image size={24} source={{uri: data.ownerAvatar}} /></View>
            <Card.Title title={data.ownerName} subtitle="Car Owner" />
        </View>
        <View><Card.Cover source={{ uri: data.carImage }} /></View>
        <Card.Content>
            <Title>License No: {data.regNo}</Title>
            <Paragraph>Car Brand: {data.brand}</Paragraph>
            <Paragraph>Car Color: {data.color}</Paragraph>
            <Paragraph>Car Model: {data.model}</Paragraph>
        </Card.Content>
        <Card.Actions>
      <Button onPress={() => {navigation.navigate('Cars')}}>Back</Button>
      <Button onPress={() => {deleteApprovedCar(data._id)}}>Delete</Button>
    </Card.Actions>
    </Card>
    </View>
  )
}

const styles = StyleSheet.create({})