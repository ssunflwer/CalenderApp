import * as React from 'react';
import {Text, View, Image, SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import { LunarDate } from './Lunar';

export function ViewDetail({route, navigation})
{
    const {day} = route.params;
    const {month} = route.params;
    const {year} = route.params;
    const {dayOfWeek} = route.params;
    let toDay = new LunarDate(day, month, year, 0, 0);
    let lunar = toDay.getLunarDate(day, month, year, dayOfWeek);
    return(
        <View style = {{flex: 1}}>
            <StatusBar backgroundColor = '#035aa6' barStyle = 'light-content'/>
            <SafeAreaView style = {{flex: 1}}>
                <Text style = {styles.headerYear}>--- {year} ({lunar.getYearCanChi(year)})---</Text>
                <Text style = {styles.headerMonth}>Tháng {month} </Text>
                <Text style = {styles.headerDay}> {day} </Text>
                <Text style = {styles.headerDayOfWeek}> {getDayName(dayOfWeek)} </Text>
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