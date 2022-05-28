import 'react-native-gesture-handler';
import { View, StatusBar } from 'react-native'
import React from 'react'

//Import Stack Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Import Drawer Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';

//Import Bottom Tab Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Import Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

//Stack Navigator
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


//Import Flash Message
import FlashMessage from "react-native-flash-message";

//Import Home Screen
import Home from './Components/Home/Home';

//Import Login Screen
import Login from './Components/Authentication/Login/Login';

//Import SignUp Screen
import SignUp from './Components/Authentication/Signup/SignUp';

//Import Forgot Password
import ForgotPassword from './Components/Authentication/ForgotPassword/ForgotPassword';

//Profile Screen
import Profile from './Components/Authentication/Profile/Profile';
import ChangePassword from './Components/Authentication/Profile/ChangePassword';

//Import Chat Screen
import Chat from './Components/Chat/Chat';

//Import Car Screen
import AddCar from './Components/Cars/AddCars/AddCar';
import ApprovedCars from './Components/Cars/ViewCars/ViewCars';
import CarDetails from './Components/Cars/Car Details/CarDetails';
import ApprovedCarDetails from './Components/Cars/ApprovedCarDetails/ApprovedCarDetails'

//Import Complaint Screen
import RegisterComplaints from './Components/Complaints/RegisterComplaints';
import ViewComplaints from './Components/Complaints/ViewComplaints/ViewComplaints';
import ComplaintStatus from './Components/Complaints/Complaint Status/ComplaintStatus';
import ComplaintDetails from './Components/Complaints/Complaint Details/ComplaintDetails';

//Drawer Content
import DrawerContent from './Components/DrawerContent/DrawerContent';

//AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//Redux
import {store} from './store';
import { Provider } from 'react-redux'

function App() {
  const [login, setLogin] = React.useState();
  React.useEffect(() => {
    const fetchData = async() => {
      const login = await AsyncStorage.getItem('firstLogin');
      setLogin(login);
    }
    fetchData();
  }, [])
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='#145858'/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='main' component={login == "true" ? MyDrawer2: Login} options = {{headerShown: false}} />
          <Stack.Screen name='Signup' component={SignUp} options = {{headerShown: false}} />
          <Stack.Screen name='Dashboard' component={MyDrawer2} options = {{headerShown: false}} />
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} options = {{headerShown: false}} /> 
          <Stack.Screen name='Home' component={MyDrawer} options = {{headerShown: false}} />  
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  )
}

const MyDrawer = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Register Car') {
              iconName = focused ? 'car' : 'car';
            }
            else if (route.name === 'View Car') {
              iconName = focused ? 'car' : 'car';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {/* <Tab.Screen name="Dashboard" component={Home} /> */}
        <Tab.Screen name="Register Car" component={AddCar} options = {{headerShown: false}} />
        <Tab.Screen name="View Car" component={ApprovedCars} options = {{headerShown: false}} />
      </Tab.Navigator>
  )
}

const MyDrawer1 = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Register Complaints') {
              iconName = focused ? 'file-text-o' : 'file-text-o';
            }
            else if (route.name === 'View Complaints') {
              iconName = focused ? 'file-text-o' : 'file-text-o';
            }
            else if (route.name === 'Complaints Status') {
              iconName = focused ? 'file-text-o' : 'file-text-o';
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {/* <Tab.Screen name="Dashboards" component={MyDrawer2} /> */}
        <Tab.Screen name="Register Complaints" component={RegisterComplaints} options = {{headerShown: false}} />
        <Tab.Screen name="View Complaints" component={ViewComplaints} options = {{headerShown: false}} />
        <Tab.Screen name="Complaints Status" component={ComplaintStatus} options = {{headerShown: false}} />
      </Tab.Navigator>
  )
}

const MyDrawer2 = () => {
  return (
    <Drawer.Navigator screenOptions = {{
      headerStyle: {
        backgroundColor: '#145858'
      },
      headerTintColor: '#fff'
    }} drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Smart Parking" component={Home} />
      <Drawer.Screen name="Article" component={RegisterComplaints} />
      <Drawer.Screen name='Complaints' component={MyDrawer1} />
      <Stack.Screen name='Cars' component={MyDrawer} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='changePassword' component={ChangePassword} />
      <Stack.Screen name='CarDetail' component={CarDetails} />
      <Stack.Screen name='ApprovedCarDetail' component={ApprovedCarDetails} />
      <Stack.Screen name='ComplaintDetail' component={ComplaintDetails} />
      <Stack.Screen name='Chat' component={Chat} options = {{headerShown: false}} />
      <Stack.Screen name='Login' component={Login} options = {{headerShown: false}} />
    </Drawer.Navigator>
  )
}

export default () => {
  return(
    <Provider store={store}>
      <App />
    </Provider>
  )
}