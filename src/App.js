/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import app from './firebase-app';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Text>It works!</Text>
    );
  }
}

