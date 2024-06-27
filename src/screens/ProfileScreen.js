// screens/ProfileScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const ProfileScreen = () => {
  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/profile/1'); // Substitua pelo ID do perfil desejado
      setProfile(response.data);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setBio(response.data.bio || '');
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
    }
  };

  const saveProfile = async () => {
    try {
      const updatedProfile = { ...profile, username, email, bio };
      const response = await axios.put(`http://localhost:3000/profile/${profile._id}`, updatedProfile);
      setProfile(response.data);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome de usuário</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={bio}
        onChangeText={setBio}
      />
      <Button title="Salvar Perfil" onPress={saveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ProfileScreen;
