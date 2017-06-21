/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import OAuthManager from 'react-native-oauth';
import SocketIOClient from 'socket.io-client';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


export default class SandBoxApp extends Component {

  constructor(props) {
    super(props);
    this.manager = new OAuthManager('SandBoxVictorApp');
    this.socket = SocketIOClient('http://192.168.1.113:3000');
  }

  componentDidMount() {
    const config =  {
      twitter: {
        consumer_key: '3D5GJQQJY2RRvlNAzvNG027t3',
        consumer_secret: 'IXdwogOQxXgA9Le4CQivlgzRINbjVlXhiqBYnBGo68FbP2z5Jz'
      }
    };
// Create the manager

// configure the manager
    this.manager.configure(config);
  }

  pressHandler() {
    this.manager.authorize('twitter')
      .then(resp => console.log('Your users ID', resp))
      .catch(err => console.log('There was an error'));
  }

  emitMessage() {
    this.socket.emit('message', {message: 'test'});
  }

  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.buttonStyle} onPress={() => this.pressHandler()} title="Twitter" />
        <Button style={styles.buttonStyle} onPress={() => this.emitMessage()} title="WebSocket" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  buttonStyle: {
    marginBottom: 20,
    paddingBottom: 20,
    color: 'red'
  }
});


AppRegistry.registerComponent('SandBoxApp', () => SandBoxApp);
