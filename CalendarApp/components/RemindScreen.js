import React, {useState} from 'react';
import {Text, View, Image, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, TextInput, FlatList} from 'react-native';
import Swipeout from 'react-native-swipeout';
import AsyncStorage from '@react-native-community/async-storage';

var PushNotification = require('react-native-push-notification');

async function getData() {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_calendar_remind');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e);
    }
}

async function storeData(value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_calendar_remind', jsonValue);
    } catch (e) {
      console.log(e);
    }
}

async function removeValue() {
    try {
        await AsyncStorage.removeItem('@storage_calendar_remind');
    } catch(e) {
        console.log(e);
    }
}

export function RemindScreen({navigation})
{
    const [filter, setFilter] = useState([]);
    var DATA = [];
    getData().then((data) => {
        for (var i in data) {
            DATA.push(data[i]);
        }
        setFilter(DATA);
    });
    const [textSearch, setTextSearch] = useState('');
    

    return(
        <View style = {{flex: 1}}>
            <StatusBar backgroundColor = '#035aa6' barStyle = 'light-content'/>
            <SafeAreaView style = {{flex: 1}}>
                <View style = {styles.search}>
                    <Image source = { require('../images/search.png') } style = {{width: 18, height: 18, margin: 10, tintColor: '#00000050', alignSelf: 'center'}}/>
                    <TextInput placeholder = 'Tìm kiếm' style = {{flex: 1, fontSize: 16, color: '#000000'}} placeholderTextColor = '#00000050' 
                    onChangeText = {text => setTextSearch(text)} onSubmitEditing = {
                        () => {
                            var temp = [];
                            for (var i = 0; i < DATA.length; i++) {
                                if (DATA[i].content.startsWith(textSearch) || DATA[i].date.startsWith(textSearch) || DATA[i].time.startsWith(textSearch)) {
                                    temp.push(DATA[i]);
                                }
                            }
                            setFilter(temp);
                        }
                    }/>
                </View>
                <FlatList style = {styles.list} data = {filter} renderItem = {item => (
                        <Swipeout right = {
                            [
                                {
                                    text: 'Sửa',
                                    backgroundColor: '#50d890',
                                    onPress: () => {
                                        navigation.navigate('Sửa nhắc nhở', {
                                            id: item.item.id,
                                            date: item.item.date,
                                            time: item.item.time,
                                            content: item.item.content,
                                    
                                        });
                                    }
                                },
                                {
                                    text: 'Xoá',
                                    backgroundColor: '#e94560',
                                    onPress: () => {
                                        var temp = [];
                                        for (var i = 0; i < filter.length; i++) {
                                            if (filter[i].id != item.item.id) {
                                                temp.push(filter[i]);
                                            }
                                        }
                                        setFilter(temp);
                                        DATA = temp;
                                        PushNotification.cancelLocalNotifications({id: item.item.id});
                                        removeValue();
                                        storeData(DATA);
                                    }
                                }
                            ]
                        } style = {styles.item}>
                            <View>
                                <View style = {{flexDirection: 'row', padding: 5}}>
                                    <Text style = {styles.textItem, {flex: 1}}>🗓 {item.item.date}</Text>
                                    <Text style = {styles.textItem, {flex: 2}}>⏰ {item.item.time}</Text>
                                </View>
                                <Text style = {styles.textItem} numberOfLines = {0}>📝 {item.item.content}</Text>
                            </View>
                        </Swipeout>
                    )} 
                keyExtractor = {item => item.id}/>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    search: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    item: {
        backgroundColor: '#ffffff',
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5
    },
    textItem: {
        fontSize: 15,
        margin: 5
    }
});