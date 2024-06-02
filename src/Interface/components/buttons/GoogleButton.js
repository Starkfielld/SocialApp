
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Google() {
  return (
    <TouchableOpacity style={styles.button}>
        <AntDesign name="google" size={24} color="black" />
        <Text>Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    });
