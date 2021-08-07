import 'react-native-gesture-handler';
import React from 'react';
import {Image, TouchableOpacity, Text} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ViewCalendarScreen} from './components/ViewCalendarScreen';
import {RemindScreen} from './components/RemindScreen';
import { TodayScreen } from './components/TodayScreen';
import {ViewDetail} from './components/ViewDetail';
import {AddRemindScreen} from './components/AddRemindScreen';
import { EditRemindScreen } from './components/EditRemindScreen';
import { NewsScreen } from './components/NewsScreen';
import { DetailNewsScreen } from './components/DetailNewsScreen';

const stack = createStackNavigator();
const tab = createBottomTabNavigator();

function CalendarStack()
{
  return(
    <stack.Navigator>
      <stack.Screen name = 'Lịch' component = {ViewCalendarScreen} 
        options = {({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#035aa6',
          },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 17
          },
          headerRight: () => (
            <TouchableOpacity onPress = {() => navigation.navigate('Hôm nay')}>
              <Text style = {{color: '#ffffff', fontSize: 17, marginRight: 10}}>Hôm nay</Text>
            </TouchableOpacity>
          )
        })}
      />
      <stack.Screen name = 'Hôm nay' component = {TodayScreen}
        options = {({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#035aa6',
          },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 17
          },
        })}
      />
      <stack.Screen name = 'Chi tiết' component = {ViewDetail}
        options = {({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#035aa6',
          },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 17
          },
        })}
      />
    </stack.Navigator>
  );
}

function NewsStack() {
  return(
    <stack.Navigator>
      <stack.Screen name = 'News' component = {NewsScreen}
        options = {({navigation, route}) => ({
        headerStyle: {
          backgroundColor: '#035aa6',
        },
        headerTintColor: '#ffffff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 17
        },
      })}
      />
      <stack.Screen name = 'Detail' component = {DetailNewsScreen}
        options = {({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#035aa6',
          },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 17
          },
        })}
      />
    </stack.Navigator>
  );
}

function RemindStack()
{
  return(
    <stack.Navigator>
      <stack.Screen name = 'Nhắc nhở' component = {RemindScreen}
        options = {({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#035aa6',
          },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 17
          },
          headerRight: () => (
            <TouchableOpacity onPress = {() => navigation.navigate('Thêm mới')}>
              <Image source = {require('./images/add.png')} style = {{tintColor: '#ffffff', alignSelf: 'center', marginRight: 20}}/>
            </TouchableOpacity>
          )
        })}
      />
      <stack.Screen name = 'Thêm mới' component = {AddRemindScreen}
        options = {({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#035aa6',
          },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 17
          },
        })}
      />
      <stack.Screen name = 'Sửa nhắc nhở' component = {EditRemindScreen}
        options = {({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#035aa6',
          },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 17
          },
        })}
      />
    </stack.Navigator>
  );
}

function App() 
{
  return(
    <NavigationContainer>
    <tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Calendar') {
              if (focused) {
                return(<Image source = {require('./images/calendar.png')} style = {{tintColor: '#035aa6'}}/>);
              }
              return(<Image source = {require('./images/calendar.png')} style = {{tintColor: 'gray'}}/>);
            } else if (route.name == 'Remind') {
              if (focused) {
                return(<Image source = {require('./images/remind.png')} style = {{tintColor: '#035aa6'}}/>);
              }
              return(<Image source = {require('./images/remind.png')} style = {{tintColor: 'gray'}}/>);
            } else {
              if (focused) {
                return(<Image source = {require('./images/newspaper.png')} style = {{tintColor: '#035aa6'}}/>);
              }
              return(<Image source = {require('./images/newspaper.png')} style = {{tintColor: 'gray'}}/>);
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#035aa6',
          inactiveTintColor: 'gray',
        }}
    >
      <tab.Screen name = 'Calendar' component = {CalendarStack}/>
      <tab.Screen name = 'News' component = {NewsStack}/>
      <tab.Screen name = 'Remind' component = {RemindStack}/>
    </tab.Navigator>
  </NavigationContainer>
  );
}

export default App;