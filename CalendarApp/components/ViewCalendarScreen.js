import * as React from 'react';
import {Text, View, Image, SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import {CalendarList} from 'react-native-calendars';

export function ViewCalendarScreen({navigation})
{
    return(
        <View style = {{flex: 1}}>
            <StatusBar backgroundColor = '#035aa6' barStyle = 'light-content'/>
            <SafeAreaView style = {{flex: 1}}>
                <CalendarList theme = {{todayTextColor: '#035aa6', textDayHeaderFontWeight: 'bold'}}
                firstDay = {1} onDayPress = {(date) => {
                    let now = new Date(date.dateString);
                    navigation.navigate('Chi tiết', {
                    day: date.day,
                    month: date.month,
                    year: date.year,
                    dayOfWeek: now.getDay()
                })}
                }/>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#035aa6',
        height: 50,
        color: '#ffffff',
        fontSize: 17,
        textAlignVertical: 'center'
    }
});