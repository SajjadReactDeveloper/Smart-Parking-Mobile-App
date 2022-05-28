import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//React Native Paper
import { DataTable } from 'react-native-paper';

//User Info
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUserQuery } from '../../../services/userAuthApi'

//Axios
import axios from 'axios';

//Icons
import AntDesigns from 'react-native-vector-icons/AntDesign'

export default function ViewComplaints({navigation}) {
  const [token, setToken] = React.useState('');
  const [complaints, setComplaints] = React.useState([])
  React.useEffect(() => {
    (
      async () => {
        const token = JSON.parse(await AsyncStorage.getItem('token'));
        setToken(token);
      }
    )();
  });

  const { data } = useGetUserQuery(token);

  React.useEffect(() => {
    async function fetchData(){
      try {
        const res = await axios.get(`http://192.168.10.4:5000/complaint/viewSpecificComplaint/${data._id}`);
        setComplaints(res.data);
        console.log("Complaint: ", res.data)
      } 
      catch (error) 
      {
        console.log("Error: ", "Network Errror");
      }
    }
    fetchData();
  }, [])
  return (
    <View style = {{backgroundColor: '#145858', flex: 1}}>
      <Text style = {styles.mainText}>My Complaints</Text>
      <DataTable>
      <DataTable.Header>
        <DataTable.Title textStyle = {{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Type</DataTable.Title>
        <DataTable.Title textStyle = {{color: 'white', fontSize: 16, fontWeight: 'bold'}} numeric>Title</DataTable.Title>
        <DataTable.Title textStyle = {{color: 'white', fontSize: 16, fontWeight: 'bold'}} numeric>Status</DataTable.Title>
      </DataTable.Header>

      {complaints.map((complaint, i) => (
        <DataTable.Row onPress={() => {
          navigation.navigate('ComplaintDetail', {data1: complaint})
        }}>
        <DataTable.Cell textStyle = {{color: '#f7b318'}}>{complaint.type}</DataTable.Cell>
        <DataTable.Cell textStyle = {{color: '#f7b318'}} numeric>{complaint.title}</DataTable.Cell>
        <DataTable.Cell textStyle = {{color: '#f7b318'}} numeric>{complaint.status}</DataTable.Cell>
      </DataTable.Row>
      ))}
      </DataTable>
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