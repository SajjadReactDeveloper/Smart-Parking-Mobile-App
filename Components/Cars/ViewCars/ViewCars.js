import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

//React Native Paper
import { DataTable } from 'react-native-paper';
import { Chip } from 'react-native-paper';

//Axios
import axios from 'axios';

//User Info
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUserQuery } from '../../../services/userAuthApi';


export default function ApprovedCars({navigation}) {
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

  const [cars, setCars] = React.useState([])
  const [approvedCars, setApprovedCars] = React.useState([])
  const [error, setError] = React.useState();
  React.useEffect(() => {
    async function fetchData(){
      try {
        const res = await axios.post("http://192.168.10.4:5000/car/viewSpecificUserCar", {ownerId: data._id});
        setCars(res.data)
      } catch (error) {
        setError('error')
        console.log("Error: ", "Network Errror");
      }
    }
    fetchData();
  }, [])

  React.useEffect(() => {
    async function fetchData(){
      try {
        const resp = await axios.post("http://192.168.10.4:5000/car/viewSpecificUserApprovedCar", {ownerId: data._id});
        setApprovedCars(resp.data)
      } catch (error) {
        setError('error')
        console.log("Error: ", "Network Errror");
      }
    }
    fetchData();
  }, [])
  return (
    <View style = {{backgroundColor: '#145858', flex: 1}}>
      <Text style = {styles.mainText}>My Cars</Text>
      {cars ? (
        <DataTable>
        <DataTable.Header style = {{backgroundColor: '#f7b318'}}>
          <DataTable.Title textStyle = {{color: 'white', fontSize: 16, fontWeight: 'bold'}}>License No</DataTable.Title>
          <DataTable.Title textStyle = {{color: 'white', fontSize: 16, fontWeight: 'bold'}} numeric>Brand</DataTable.Title>
          <DataTable.Title textStyle = {{color: 'white', fontSize: 16, fontWeight: 'bold'}} numeric>Model</DataTable.Title>
          <DataTable.Title textStyle = {{color: 'white', fontSize: 16, fontWeight: 'bold'}} numeric>Status</DataTable.Title>
        </DataTable.Header>

        {error ? cars.map((car) => (
          <DataTable.Row key={car._id} onPress = {() => {
            navigation.navigate('CarDetail', {data: car})
          }}>
            <DataTable.Cell textStyle = {{color: '#f7b318'}}>{car.regNo}</DataTable.Cell>
            <DataTable.Cell textStyle = {{color: '#f7b318'}} numeric>{car.brand}</DataTable.Cell>
            <DataTable.Cell textStyle = {{color: '#f7b318'}} numeric>{car.model}</DataTable.Cell>
            <DataTable.Cell textStyle = {{color: '#f7b318'}} numeric><Chip color = "red" style = {{backgroundColor: '#FF0000'}} textStyle = {{color: 'white'}}>waiting</Chip></DataTable.Cell>
          </DataTable.Row>
        )): (<ActivityIndicator size="large" color='red' />)}
        {error ? approvedCars.map((car) => (
          <DataTable.Row key={car._id} onPress = {() => {
            navigation.navigate('ApprovedCarDetail', {data: car})
          }}>
            <DataTable.Cell textStyle = {{color: '#f7b318'}}>{car.regNo}</DataTable.Cell>
            <DataTable.Cell textStyle = {{color: '#f7b318'}} numeric>{car.brand}</DataTable.Cell>
            <DataTable.Cell textStyle = {{color: '#f7b318'}} numeric>{car.model}</DataTable.Cell>
            <DataTable.Cell textStyle = {{color: '#f7b318'}} numeric>{car.color}</DataTable.Cell>
            <DataTable.Cell textStyle = {{color: '#f7b318'}} numeric><Chip color = "green">Approved</Chip></DataTable.Cell>
          </DataTable.Row>
        )): null}
      </DataTable>
      ) : null}
    </View>
  );
}


const styles = StyleSheet.create({
  mainText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  }
})