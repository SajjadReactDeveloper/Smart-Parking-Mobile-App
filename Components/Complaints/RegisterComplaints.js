import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

//Picker
import {Picker} from '@react-native-picker/picker';

//Flash Message
import { showMessage, hideMessage } from "react-native-flash-message";

//Axios
import axios from 'axios';

//User Info
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUserQuery } from '../../services/userAuthApi'

export default function RegisterComplaints() {
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

  const [selectedLanguage, setSelectedLanguage] = React.useState();
  const [type, setType] = React.useState();
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();

  const submit = async() => {
      try {
        console.log(type, title, description)
          const res = await axios.post('http://172.20.0.49:5000/complaint/addComplaint', {
                type, title, description, userId:data._id
            })
            console.log(res.data.msg)
            if(res.data.msg == "Your Complaint has been registered"){
            showMessage({
            message: "Complaint Registered",
            type: "success",
          });
        }
        //Login Failed
        else {
            showMessage({
            message: "Complaint Registration Failed",
            type: "danger",
          });
        }
      } catch (error) {
          
      }
  }
  return (
    <View style={{backgroundColor: '#145858', flex: 1}}>
      <Text style={styles.mainText}>Register Complaint</Text>
      <Text style={styles.label}>Complaint Type</Text>
      <View style = {{borderBottomWidth: 1, borderBottomColor: '#f7b318', marginHorizontal: 13}}>
            <Picker
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) =>
                    setType(itemValue)
                }
            >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
      </View>
      <Text style={styles.label}>Complaint Title</Text>
      <TextInput
        placeholderTextColor="white"
        placeholder="Enter Complaint Title"
        style={styles.input}
        onChangeText = {setTitle}
      />
      <Text style={[styles.label, {marginBottom: 10}]}>Complaint Details</Text>
      <TextInput
        placeholderTextColor="white"
        placeholder="Enter Complaint Details"
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={10}
        style={{
          textAlignVertical: 'top',
          padding: 15,
          borderWidth: 1,
          marginHorizontal: 10,
          borderColor:
            '#f7b318',
          borderRadius: 5,
          color: 'white',
        }}
      />
      <TouchableOpacity style={styles.button} onPress = {submit}>
        <Text style={styles.buttonText}>Register Complaint</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    // padding: 10,
    color: '#f7b318',
    paddingHorizontal: 15,
    marginTop: 10
  },
  input: {
    // padding: 15,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor: '#f7b318',
    borderRadius: 5,
    color: 'white',
  },
  button: {
    backgroundColor: '#f7b318',
    padding: 20,
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    marginTop: 20
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
    alignContent: 'center',
  },
});
