import * as React from 'react';
import {Text, View, Image, SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import { LunarDate } from './Lunar';

export function TodayScreen()
{
    let date = new Date();
    let toDay = new LunarDate(date.getDate(), date.getMonth() + 1, date.getFullYear(), 0, 0);
    let lunar = toDay.getLunarDate(date.getDate(), date.getMonth() + 1, date.getFullYear());
    return(
        <View style = {{flex: 1}}>
            <StatusBar backgroundColor = '#035aa6' barStyle = 'light-content'/>
            <SafeAreaView style = {{flex: 1}}>
                <Text style = {styles.headerYear}>--- {date.getFullYear()} ({lunar.getYearCanChi(date.getFullYear())})---</Text>
                <Text style = {styles.headerMonth}>Tháng {date.getMonth() + 1} </Text>
                <Text style = {styles.headerDay}> {date.getDate()} </Text>
                <Text style = {styles.headerDayOfWeek}> {getDayName(date.getDay())} </Text>
                <Text style = {styles.headerLunarMonth}>Tháng {lunar.month} </Text>
                <Text style = {styles.headerLunarDay}> {lunar.day} </Text>
                <Text style = {styles.headerGioHoangDao}>⏳ Giờ hoàng đạo: {lunar.getGioHoangDao(lunar.jd)} </Text>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerYear: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    headerMonth: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center'
    },
    headerDay: {
        flex: 2,
        fontSize: 100,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 25,
        color: '#035aa6',
        textAlignVertical: 'center'
    },
    headerDayOfWeek: {
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: '#035aa6',
        padding: 10,
        color: '#ffffff'
    },
    headerLunarMonth: {
        fontSize: 17,
        fontWeight: '800',
        textAlign: 'center',
        marginTop: 10
    },
    headerLunarDay: {
        flex: 1,
        fontSize: 50,
        fontWeight: '800',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    headerGioHoangDao: {
        fontSize: 14,
        margin: 10,
        fontStyle: 'italic',
        marginBottom: 20
    }
});

function getDayName(day) {
    var name = '';
    switch (day) {
        case 0:
            name = 'Chủ Nhật';
            break;
        case 1:
            name = 'Thứ Hai';
            break;
        case 2:
            name = 'Thứ Ba';
            break;
        case 3:
            name = 'Thứ Tư';
            break;
        case 4:
            name = 'Thứ Năm';
            break;
        case 5:
            name = 'Thứ Sáu';
            break;
        case 6:
            name = 'Thứ Bảy';
            break;
    }
    return name;
}