import React, { useState, useEffect } from 'react';
import {SafeAreaView, View, Text, AsyncStorage, Image, StyleSheet, ScrollView } from 'react-native'

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List(){
    const [techs, setTechs] = useState([]);
    useEffect(()=>{
        AsyncStorage.getItem('techs').then(storageTechs =>{
            const arrayTechs = storageTechs.split(',').map(tech=> tech.trim());
            setTechs(arrayTechs);
        })
    },[]);
    return (
        <SafeAreaView style={style.container}>
            <Image source={logo} style={style.logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
    },
    logo:{
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop:30
    }
})