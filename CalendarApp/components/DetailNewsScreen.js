import React, {useEffect, useState} from 'react';
import {Text, View, Image, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, TextInput, FlatList, ScrollView} from 'react-native';

export function DetailNewsScreen({navigation, route}) {
    const {detail} = route.params;
    return(
        <View style = {{flex: 1}}>
            <StatusBar backgroundColor = '#035aa6' barStyle = 'light-content'/>
            <SafeAreaView style = {{flex: 1}}>
                <ScrollView>
                    <Text style = {styles.content}>{detail.content}</Text>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        margin: 10,
        textAlign: 'justify',
        fontSize: 16
    }
});