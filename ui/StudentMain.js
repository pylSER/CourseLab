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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator,StackNavigator,NavigationActions } from 'react-navigation';

import MY from './my.js';
import Mission from './StuMission.js';
import MainTab from './MainPageTab.js';


const StudentMain = React.createClass({

  getInitialState(){
      return{

      }
  },


  goDetail(){
    this.props.navigation.navigate('Detail');
  },

  goToExamDetail(dataitem){
    this.props.navigation.navigate('StudentExamDetail',{examData:dataitem});
  },

  goToTestCase(){
    this.props.navigation.navigate('StudentTestCase');
  },




  render() {

    return (
      <View style={{backgroundColor: '#FAF9FC',flex:1}}>
          <MainTab screenProps={{ goToExamDetail:this.goToExamDetail,goToTestCase:this.goToTestCase}} />
      </View>
    );
  }
});





const MainBottom = TabNavigator({
  Home: {
    screen:StudentMain,
    navigationOptions:{
      title:'任务',
      tabBarIcon: () => (<Icon name='tasks' color='#848484' style={{fontSize:24}}/>)
    },
  },
  Mission: {
    screen: Mission,
    navigationOptions:{
      title:'考试',
      tabBarIcon: () => ( <Icon name='pencil-square-o' color='#848484' style={{fontSize:24}}/>)
    },
  },
  My: {
    screen: MY,
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
         Home: {
           labelColor: '#848484', // like in the standalone version, this will override the already specified `labelColor` for this tab
           activeLabelColor: '#025ca6',
           activeIcon: <Icon name='tasks' color='#025ca6' style={{fontSize:24}}/>
         },
         Mission: {
           labelColor: '#848484', // like in the standalone version, this will override the already specified `labelColor` for this tab
           activeLabelColor: '#025ca6',
           activeIcon: <Icon name='pencil-square-o' color='#025ca6' style={{fontSize:24}}/>
         },
         My: {
           labelColor: '#848484', // like in the standalone version, this will override the already specified `labelColor` for this tab
           activeLabelColor: '#025ca6',
           activeIcon: <Icon name='user-circle' color='#025ca6' style={{fontSize:24}}/>
         },

       }
     }

  },


});


const defaultGetStateForAction = MainBottom.router.getStateForAction;

MainBottom.router.getStateForAction = (action, state) => {


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



export default MainBottom;
