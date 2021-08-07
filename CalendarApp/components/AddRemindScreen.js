import React, {useState} from 'react';
import {Text, View, Image, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, TextInput, ScrollView, Platform} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';

var PushNotification = require('react-native-push-notification');

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: Platform.OS == 'ios',
});

export function AddRemindScreen()
{
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [valueDate, setValueDate] = useState([(new Date()).getDate(), (new Date()).getMonth() + 1, (new Date()).getFullYear()]);
    const [valueTime, setValueTime] = useState([(new Date()).getHours(), (new Date()).getMinutes()]);
    const [valueContent, setValueContent] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        setValueDate([date.getDate(), date.getMonth() + 1, date.getFullYear()]);
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        setValueTime([time.getHours(), time.getMinutes()]);
        hideTimePicker();
    };

    return(
        <View style = {{flex: 1}}>
            <StatusBar backgroundColor = '#035aa6' barStyle = 'light-content'/>
            <SafeAreaView style = {{flex: 1}}>
                <ScrollView style = {{flex: 1}}>
                <View style = {{flexDirection: 'row', margin: 10}}>
                    <TouchableOpacity onPress = {showDatePicker} style = {styles.button}>
                        <Text style = {{color: '#ffffff', fontSize: 16, textAlign: 'center'}}>Chọn ngày</Text>
                    </TouchableOpacity>
                    <TextInput value = {valueDate[0] + '/' + valueDate[1] + '/' + valueDate[2]} editable = {false} style = {styles.textDateTime}/>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
                <View style = {{flexDirection: 'row', margin: 10}}>
                    <TouchableOpacity onPress = {showTimePicker} style = {styles.button}>
                        <Text style = {{color: '#ffffff', fontSize: 16, textAlign: 'center'}}>Chọn giờ</Text>
                    </TouchableOpacity>
                    <TextInput value = {valueTime[0] + ':' + valueTime[1]} editable = {false} style = {styles.textDateTime}/>
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                    />
                </View>
                <TextInput style = {styles.content} placeholder = 'Nội dung' multiline = {true} onChangeText = {text => setValueContent(text)}/>
                <TouchableOpacity style = {styles.submit} onPress = {() => {
                    var DATA = [];
                    getData().then((data) => {
                        for (var i in data) {
                            DATA.push(data[i]);
                        }
                        let d = new Date();
                        DATA.push({
                            id: getNewID(DATA) + '',
                            date: valueDate[0] + '/' + valueDate[1] + '/' + valueDate[2],
                            time: valueTime[0] + ':' + valueTime[1],
                            content: valueContent,
                        });
                        var tmp = new Date();
                        
                        tmp.setDate(valueDate[0]);
                        tmp.setMonth(valueDate[1] - 1);
                        tmp.setFullYear(valueDate[2]);
                        tmp.setHours(valueTime[0]);
                        tmp.setMinutes(valueTime[1]);
                        tmp.setSeconds(0);
                        PushNotification.localNotificationSchedule({
                            id: (getNewID(DATA) - 1) + '',
                            title: valueDate[0] + '/' + valueDate[1] + '/' + valueDate[2] + ' - ' + valueTime[0] + ':' + valueTime[1],
                            message: valueContent,
                            date: tmp,
                        });
                        storeData(DATA);
                    });
                }}>
                    <Text style = {{color: '#ffffff', fontSize: 16, textAlign: 'center'}}>Thêm nhắc nhở</Text>
                </TouchableOpacity>
                </ScrollView>       
            </SafeAreaView>
        </View>
    );
}

function getNewID(data) {
    var id = -1;
    if (data.length == 0) return 0;
    for (var i in data) {
        if (parseInt(data[i].id) > id) {
            id = parseInt(data[i].id);
        }
    }
    return id + 1;
}

async function storeData(value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_calendar_remind', jsonValue);
    } catch (e) {
      console.log(e);
    }
};

async function getData() {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_calendar_remind');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e);
    }
}
  

const styles = StyleSheet.create({
    textDateTime: {
        flex: 2,
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 10
    },
    button: {
        flex: 1,
        backgroundColor: '#035aa6',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10        
    },
    content: {
        margin: 10,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    submit: {
        backgroundColor: '#035aa6',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10,
        margin: 10,
        height: 50
    }
});