import React, {useState} from 'react';
import { SafeAreaView, Alert, Text, AsyncStorage, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({navigation}){
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');
    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/booking`, {
            date
        },{
            headers: {user_id}
        });
        Alert.alert('Solicitação de Reserva Enviada');
        navigation.navigate('List');
    }
    function handleCancel(){
        navigation.navigate('List');
    }
    return (
        <SafeAreaView style={styles.container}>
           <Text style={styles.label}>Data de Interesse *:</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data Você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
                />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.button,styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container:{
        margin:30
    },
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom:8,
        marginTop:30
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
    cancelButton:{
        backgroundColor: '#ccc',
        marginTop:10
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})