import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import axios from 'axios';

export default function ComplaintStatus() 
{
    const [id, setId] = React.useState();
    const [type, setType] = React.useState();
    const [title, setTitle] = React.useState();
    const [status, setStatus] = React.useState();

    const submit = async() => {
        try {
            const res = await axios.get(`http://192.168.137.1:5000/complaint/getStatus/${id}`);
            setType(res.data.type)
            setTitle(res.data.title)
            setStatus(res.data.status)
        } catch (error) {
            
        }
    }
  return (
    <View style = {{backgroundColor: '#145858', flex: 1}}>
      <Text style = {{textAlign: 'center', marginTop: 20, marginBottom: 20, fontWeight: 'bold', fontSize: 24}}>Check Complaint Status</Text>
        <View style = {{backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 6}}>
            <Text style = {{color: '#f7b318'}}>Complaint Number</Text>
            <TextInput style = {styles.input} placeholder='Enter Complaint Number' onChangeText={setId} />
            <TouchableOpacity style = {styles.btn} onPress = {submit}>
                <Text style = {{color: 'white'}}>Check Status</Text>
            </TouchableOpacity>
            {type ? (
                <View>
                    <Text style= {{color: 'black'}}>Type: {type}</Text>
                    <Text style= {{color: 'black'}}>Title: {title}</Text>
                    <Text style= {{color: 'black'}}>Status: {status}</Text>
                </View>
            ) : null}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#f7b318'
    },
    btn: {
        backgroundColor: '#f7b318',
        width: 130,
        padding: 10,
        marginTop: 20,
        alignSelf: 'flex-end',
        alignItems: 'center'
    }
})