// @flow
import React, { Component } from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

export default class App extends Component {
  db = firebase.firestore()
  addDocument = () => {
    this.db.collection('test').add({
      text: 'Test',
      date: new Date().getTime()
    })
      .then(() => Alert.alert('Success!', 'The document was added.'))
      .catch(() => Alert.alert('Error!', 'An error ocurred adding the document.'))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Jelly Fin!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
          onPress={this.addDocument}
          title="Add a document in Test collection"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
