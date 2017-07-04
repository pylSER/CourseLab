import React, { Component } from 'react';


import TeacherLogin from './TeacherLogin.js';
import StudentLogin from './StudentLogin.js';

import { TabNavigator } from 'react-navigation';





const LoginTab = TabNavigator({

  Home: {
    screen: StudentLogin,
    navigationOptions:{
      title:'学生用户',
    },
  },

  TeacherLogin:{
    screen :TeacherLogin,
    navigationOptions:{
      title:'教师用户',
    },
  }

}, {

backBehavior:'none',

  tabBarOptions: {

    style:{
      backgroundColor:'#FAF9FC',
      elevation: 0,
    },
    indicatorStyle:{
      backgroundColor:'#FAF9FC',

    },
    labelStyle:{
      color:'#79a8d2',
      fontSize:15,
    },


  },


});



export default LoginTab;
