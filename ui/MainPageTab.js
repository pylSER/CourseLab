import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
} from 'react-native';

import StuHomeWork from './StuHomeWork.js';
import StuPractice from './StuPractice.js';
import { TabNavigator } from 'react-navigation';

const MainPageTab = TabNavigator({

  Home: {
    screen: StuHomeWork,
    navigationOptions:{
      title:'作业',
    },
  },

  StuPractice:{
    screen :StuPractice,
    navigationOptions:{
      title:'练习',
    },
  }

}, {

backBehavior:'none',
animationEnabled:true,
  tabBarOptions: {

    style:{
      backgroundColor:'white',
      elevation: 0,
    },
    indicatorStyle:{
      backgroundColor:'#79a8d2',


    },
    labelStyle:{
      color:'#79a8d2',
      fontSize:15,
    },


  },


});

const styles = StyleSheet.create({

});


export default MainPageTab;
