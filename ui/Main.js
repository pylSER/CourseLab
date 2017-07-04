import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Button,
  AsyncStorage,
  BackAndroid,
  ToastAndroid,Animated,Easing
} from 'react-native';

import { StackNavigator,NavigationActions } from 'react-navigation';

import LoginTab from './LoginTab.js';

import MainBottom from './StudentMain.js';

import Welcome from './welcome.js';

import Detail from './detail.js';

import TeacherMainBottom from './TeacherMain.js';

import TeacherClassStudent from './ClassStudent.js';

import TeacherStudentInfo from './TeacherStudentInfo.js';

import TeacherSearchStudent from './TeacherSearchStudent.js';

import StudentExamDetail from './StudentExamDetail.js';

import TeacherExamDetail from './TeacherExamDetail.js';

import TeacherSearchScore from './TeacherSearchScore.js';

import ReadMe from './ReadMe.js';

import StudentTestCase from './StudentTestCase.js';



const Main = React.createClass({
  goToStudentMain(studentid){
    this.props.navigation.navigate('MainBottom')
  },
  goToTeacherMain(teacherid){
    this.props.navigation.navigate('TeacherMainBottom')
  },

  render() {

    return (

      <View>



      <View style={styles.container}>
        <Text style={styles.welcome}>
          CourseLab
        </Text>

        <Text style={styles.subline}>
          随时随地查看课程信息
        </Text>


      </View>



      <View style={styles.bottomview}>
        <LoginTab screenProps={{ callbackStu:this.goToStudentMain, callbackTeacher:this.goToTeacherMain }}/>


      </View>




      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#025ca6',
    height:'40%'
  },
  welcome: {
    fontFamily:'AT',
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    color:'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  subline:{
    color:'white',
    fontSize: 15,
  },
  bottomview:{
    flex: 0,
    height:'60%',

  },
  header:{
    backgroundColor:'red'
  }

});


const StudentStackNav = StackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions:{
      header: null

    },
  },

  StudentLogin: {
    screen: Main,
    navigationOptions:{
      header: null

    },
  },

  TeacherMainBottom:{
    screen:TeacherMainBottom,
    navigationOptions:{
      title:'CourseLab',
      headerStyle:{backgroundColor:'#025ca6'},
      headerTitleStyle:{color:'white',fontSize:20},
      headerLeft:null

    },
  },



  MainBottom:{
    screen:MainBottom,
    navigationOptions:{
      title:'CourseLab',
      headerStyle:{backgroundColor:'#025ca6'},
      headerTitleStyle:{color:'white',fontSize:20},
      headerLeft:null

    },
  },

  TeacherClassStudent:{
    screen:TeacherClassStudent,
    navigationOptions:{
      title:'班级学生',
      headerStyle:{backgroundColor:'#025ca6'},
      headerTitleStyle:{color:'white',fontSize:20},
      headerTintColor:'white',
      gesturesEnabled:true

    },
  },

  StudentExamDetail:{
    screen:StudentExamDetail,
    navigationOptions:{
      title:'考试详情',
      headerStyle:{backgroundColor:'#025ca6'},
      headerTitleStyle:{color:'white',fontSize:20},
      headerTintColor:'white',
      gesturesEnabled:true

    },
  },

  ReadMe:{
    screen:ReadMe,
    navigationOptions:{
      title:'ReadMe',
      headerStyle:{backgroundColor:'#025ca6'},
      headerTitleStyle:{color:'white',fontSize:20},
      headerTintColor:'white',
      gesturesEnabled:true

    },
  },

  StudentTestCase:{
    screen:StudentTestCase,
    navigationOptions:{
      title:'测试用例',
      headerStyle:{backgroundColor:'#025ca6'},
      headerTitleStyle:{color:'white',fontSize:20},
      headerTintColor:'white',
      gesturesEnabled:true

    },
  },

  TeacherExamDetail:{
    screen:TeacherExamDetail,
    navigationOptions:{
      title:'考试详情',
      headerStyle:{backgroundColor:'#025ca6'},
      headerTitleStyle:{color:'white',fontSize:20},
      headerTintColor:'white',
      gesturesEnabled:true

    },
  },

  TeacherHomeworkDetail:{
    screen:TeacherExamDetail,
    navigationOptions:{
      title:'作业详情',
      headerStyle:{backgroundColor:'#025ca6'},
      headerTitleStyle:{color:'white',fontSize:20},
      headerTintColor:'white',
      gesturesEnabled:true

    },
  },

  TeacherPracticeDetail:{
    screen:TeacherExamDetail,
    navigationOptions:{
      title:'练习详情',
      headerStyle:{backgroundColor:'#025ca6'},
      headerTitleStyle:{color:'white',fontSize:20},
      headerTintColor:'white',
      gesturesEnabled:true

    },
  },

  TeacherStudentInfo:{
    screen:TeacherStudentInfo,
    navigationOptions:{
      title:'学生信息',
      headerStyle:{backgroundColor:'#025ca6'},
      headerTitleStyle:{color:'white',fontSize:20},
      headerTintColor:'white',
      gesturesEnabled:true

    },
  },
    TeacherSearchStudent:{
      screen:TeacherSearchStudent,
      navigationOptions:{
        header: null

      },
  },

  TeacherSearchScore:{
    screen:TeacherSearchScore,
    navigationOptions:{
      header: null

    },
},


  Detail:{
    screen:Detail,
    navigationOptions:{
      title:'Detail',
      headerStyle:{backgroundColor:'#025ca6'},
      headerTitleStyle:{color:'white',fontSize:16},
      headerTintColor:'white',
      gesturesEnabled:true

    },
  },

}, { headerMode: 'screen',transitionConfig:()=>({
  transitionSpec: {
    duration: 250,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps
    const { index } = scene

    const height = layout.initWidth
    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [height, 0, 0],
    })

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1],
    })

    return { opacity, transform: [{ translateX }] }
  },
})
});



const defaultGetStateForAction = StudentStackNav.router.getStateForAction;

StudentStackNav.router.getStateForAction = (action, state) => {




  if (
    (state) &&
    action.type === NavigationActions.BACK&&
    (state.routes[state.index].routeName=='TeacherMainBottom'||state.routes[state.index].routeName=='MainBottom'||state.routes[state.index].routeName=='StudentLogin'||state.routes[state.index].routeName=='Welcome')
  ) {
    // Returning null from getStateForAction means that the action
    // has been handled/blocked, but there is not a new state
    // Alert.alert(state.routes[state.index].key);
    return null;
  }

  return defaultGetStateForAction(action, state);
};



export default StudentStackNav;
