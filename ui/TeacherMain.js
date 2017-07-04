import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  BackAndroid,
  ToastAndroid,
  ListView,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator,StackNavigator,NavigationActions } from 'react-navigation';

import TeacherExam from './TeacherExam.js';
import TeacherClass from './TeacherClass.js';
import TeacherMy from './TeacherMy.js';

import QuestionCard from './QuestionCard.js';


import MainTab from './MainTeacherTab.js';
const TeacherMission = React.createClass({

  getInitialState(){
      return{
          isReady:false,
      }
  },

  goToDetail(dataitem){
        this.props.navigation.navigate('TeacherHomeworkDetail',{examData:dataitem});
  },

  goToEXEDetail(dataitem){
    this.props.navigation.navigate('TeacherPracticeDetail',{examData:dataitem});
  },

  render() {

    return (

  <View style={{backgroundColor: '#FAF9FC',flex:1}}>


    <MainTab screenProps={{goToDetail:this.goToDetail,goToEXEDetail:this.goToEXEDetail}}/>
  </View>

    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height:'40%'
  },
  welcome: {
    fontFamily:'AT',
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    color:'#025ca6'
  },
});




const TeacherMainBottom = TabNavigator({
  TeacherMission: {
    screen: TeacherMission,
    navigationOptions:{
      title:'任务',
      tabBarIcon: () => ( <Icon name='tasks' color='#848484' style={{fontSize:24}}/>)
    },
  },

  TeacherExam: {
    screen: TeacherExam,
    navigationOptions:{
      title:'考试',
      tabBarIcon: () => ( <Icon name='pencil-square-o' color='#848484' style={{fontSize:24}}/>)
    },
  },
  TeacherClass: {
    screen: TeacherClass,
    navigationOptions:{
      title:'班级',
      tabBarIcon: () => (<Icon name='users' color='#848484' style={{fontSize:24}}/>)
    },
  },
  TeacherMy: {
    screen: TeacherMy,
    navigationOptions:{
      title:'我的',
      tabBarIcon: () => (<Icon name='user-circle' color='#848484' style={{fontSize:24}}/>)
    },
  },


}, {

backBehavior:'none',
tabBarComponent: NavigationComponent,
tabBarPosition: 'bottom',
swipeEnabled:false,
animationEnabled:false,
  tabBarOptions: {

    bottomNavigationOptions: {
      rippleColor:'green',
       tabs: {
         TeacherMission: {
           labelColor: '#848484', // like in the standalone version, this will override the already specified `labelColor` for this tab
           activeLabelColor: '#025ca6',
           activeIcon: <Icon name='tasks' color='#025ca6' style={{fontSize:24}}/>
         },
         TeacherExam: {
           labelColor: '#848484', // like in the standalone version, this will override the already specified `labelColor` for this tab
           activeLabelColor: '#025ca6',
           activeIcon: <Icon name='pencil-square-o' color='#025ca6' style={{fontSize:24}}/>
         },
         TeacherClass: {
           labelColor: '#848484', // like in the standalone version, this will override the already specified `labelColor` for this tab
           activeLabelColor: '#025ca6',
           activeIcon: <Icon name='users' color='#025ca6' style={{fontSize:24}}/>
         },

         TeacherMy: {
           labelColor: '#848484', // like in the standalone version, this will override the already specified `labelColor` for this tab
           activeLabelColor: '#025ca6',
           activeIcon: <Icon name='user-circle' color='#025ca6' style={{fontSize:24}}/>
         },

       }
     }

  },


});


const defaultGetStateForAction = TeacherMainBottom.router.getStateForAction;

TeacherMainBottom.router.getStateForAction = (action, state) => {


  if (
    (state)
  ) {
    // Returning null from getStateForAction means that the action
    // has been handled/blocked, but there is not a new state
    // Alert.alert(state.routes[state.index].params.title);
    // return null;
  }

  return defaultGetStateForAction(action, state);
};



export default TeacherMainBottom;
