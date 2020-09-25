import React, {useState, useEffect} from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user =>{
            if(user){
                navigation.navigate('List');
            }
        })
    },[])
    async function handleSubmit(){
      const response = await api.post('/sessions', { email });
      const { _id } = response.data;
      await AsyncStorage.setItem('user', _id);
      await AsyncStorage.setItem('techs', techs);

      navigation.navigate('List');
    }
    return (
    <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'}  style={style.container}>
        <Image source={logo}/>
        <View style={style.form}>
            <Text style={style.label}>Seu Email *:</Text>
            <TextInput
                style={style.input}
                placeholder="Seu Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                ></TextInput>
                <Text style={style.label}>Tecnologias *:</Text>
            <TextInput
                style={style.input}
                placeholder="Tecnologias de Interesse"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
                ></TextInput>
                <TouchableOpacity onPress={handleSubmit} style={style.button}>
                    <Text style={style.buttonText}>Encontre Spots</Text>
                </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    );   
}


const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom:8,
    },
    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop:30,
    },
    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom:30,
        borderRadius: 2,
    },
    button:{
        height:42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})