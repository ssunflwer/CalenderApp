import React, {useEffect, useState} from 'react';
import {Text, View, Image, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, TextInput, FlatList} from 'react-native';

export function NewsScreen({navigation, route}) {

    const[data, setData] = useState([]);
    const [textSearch, setTextSearch] = useState('');
    const[filter, SetFilter] = useState([]);
    useEffect(() => {
        fetch('http://192.168.1.7:3000/news', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((json) => {
            setData(json);
            SetFilter(json);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

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
                            data.forEach(e => {
                                if ((e.title).includes(textSearch)) {
                                    temp.push(e);
                                    SetFilter(temp);
                                }
                            });
                        }
                    }/>
                </View>
                <FlatList style = {styles.list} data = {filter} renderItem = {item => (
                        <View style = {styles.item}>
                            <TouchableOpacity onPress = {() => {
                                navigation.navigate('Detail', {detail: item.item});
                            }}>
                                <Text style = {styles.textItem}>{item.item.title}</Text>
                                <Text>🌏 {(new Date(item.item.datePost)).toDateString()}</Text>
                                <Image source = {{uri: 'http://192.168.1.7/newsapp/images/' + item.item.id + '.jpg'}} style = {styles.image} resizeMode='stretch'/>
                            </TouchableOpacity>
                        </View>
                    )} 
                    keyExtractor = {item => item.id + ''}/>
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
        borderRadius: 5,
        padding: 5
    },
    textItem: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    image: {
        height: 200,
        marginTop: 10,
    }
});