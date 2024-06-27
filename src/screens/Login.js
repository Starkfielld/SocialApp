import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import LoginButton from '../Interface/components/buttons/LoginButton';
import GoogleButton from '../Interface/components/buttons/GoogleButton';
import GitHubButton from '../Interface/components/buttons/GitHubButton';
import LinkedinButton from '../Interface/components/buttons/LinkedinButton';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post('/users/login', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('Feed');
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <MaterialIcons style={styles.logo} name="device-hub" size={50} color="black" />
        <Text style={styles.textLogo}>SocialApp</Text>
        <View style={styles.manualLogin}>
          <TextInput
            placeholder='Email'
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder='Senha'
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {loading ? <ActivityIndicator size="large" color="#0000ff" /> : (
            <LoginButton value='Login' onPress={handleLogin} />
          )}
        </View>
        <View style={styles.separate} />
        <View style={styles.socialLogin}>
          <Text style={styles.textInput}>Ou entre com suas contas:</Text>
          <View style={styles.buttonGroup}>
            <GoogleButton />
            <LinkedinButton />
            <GitHubButton />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Não tem conta? Cadastre-se Aqui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    backgroundColor: '#fff',
    width: 300,
    height: 450,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  separate: {
    height: 1,
    margin: 10,
    width: '80%',
    backgroundColor: '#000',
    alignSelf: 'center',
  },
  textInput: {
    alignSelf: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logo: {
    alignSelf: 'center',
    margin: 10,
  },
  textLogo: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signupText: {
    alignSelf: 'center',
    marginTop: 10,
    color: 'red',
  },
});
