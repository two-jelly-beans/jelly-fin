import React, { Component } from 'react';
import { Text } from 'react-native';
import app from './firebase-app';

type Prop = {};
export default class App extends Component<Prop> {
  constructor() {
    super();
  }
  render() {
    return (
      <Text>It works!</Text>
    );
  }
}

