import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
} from 'react-native';

import TeacherHomework from './TeacherHomework.js';
import TeacherPractice from './TeacherPractice.js';
import { TabNavigator } from 'react-navigation';

const MainPageTab = TabNavigator({

  Home: {
    screen: TeacherHomework,
    navigationOptions:{
      title:'作业',
    },
  },

  StuPractice:{
    screen :TeacherPractice,
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
