

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import MainComp from './ui/Main.js';


export default class AwesomeProject extends Component {

  render() {
    return (

        <MainComp />

    );
  }
}


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
