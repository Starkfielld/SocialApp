import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { width: screenWidth } = Dimensions.get('window');

export default function App() {
  const [historys, setHistorys] = useState([]);
  const [comment, setComment] = useState('');

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: undefined,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri, width, height } = result.assets[0];
      setHistorys([...historys, { uri, width, height, text: 'Nova Postagem', comments: [] }]);
    }
  };

  function addComment(index) {
    let newHistorys = [...historys];
    newHistorys[index].comments.push(comment);
    setHistorys(newHistorys);
    setComment(''); // Limpa o campo de comentário
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.historyContainer}>
        {historys.map((item, index) => (
          <View style={styles.historyFeed} key={index}>
            <View style={styles.historyNameContainer}>
              <Text style={styles.historyName}>#Postagem nº { index + 1}</Text>
            </View>
            <Image 
              source={{ uri: item.uri }} 
              style={[
                styles.image, 
                {
                  width: 400, 
                  height: 600 
                }
              ]}
            />
            <View style={styles.historyFeedInfo}>
              {item.comments.map((comment, commentIndex) => (
                <View key={commentIndex} style={styles.comments}>
                  <Text style={styles.commentName}>Paulo Roberto</Text>
                  <Text style={styles.commentText}>{comment}</Text>
                </View>
              ))}
              <View style={styles.commentContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Adicione um comentário"
                  placeholderTextColor="#ddd"
                  value={comment}
                  onChangeText={setComment}
                />
                <TouchableOpacity style={styles.commentButton} onPress={() => addComment(index)}>
                  <Text style={styles.commentButtonText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={pickImage}>
        <Text style={styles.addButtonText}>Adicionar Postagem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  historyContainer: {
    width: '100%',
  },
  historyNameContainer: {
    width: '100%', 
    alignItems: 'flex-start',
    paddingLeft: 10, 
    margin: 20,
  },
  historyName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyFeed: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 10,
  },
  historyFeedInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    width: screenWidth,
  },
  image: {
    resizeMode: 'contain',
  },
  addButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 10, // Garante que o botão esteja sobreposto
  },
  addButtonText: {
    color: '#4b0081',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    padding: 5,
    color: '#000',
  },
  commentButton: {
    padding: 10,
    backgroundColor: '#4b0081',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  commentButtonText: {
    color: '#fff',
  },
  commentText: {
    color: '#fff',
    marginTop: 5,
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  commentName: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
});