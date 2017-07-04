import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ToastAndroid,
  Alert,
  StatusBar
} from 'react-native';

import TeacherMainBottom from './TeacherMain.js';


var KEY_NAME = '@CourseLab:name';
var KEY_PWD = '@CourseLab:pwd';
var KEY_BASE64='@CourseLab:base64';
var KEY_User='@CourseLab:user';

const Welcome = React.createClass({

  getInitialState(){
      return{
          isReady:false,
          isTeacherReady:false,
      }
  },

  async checkHaveRecord(){
    try{
         var value=await AsyncStorage.getItem(KEY_NAME);
         var pwd=await AsyncStorage.getItem(KEY_PWD);
         var base64=await AsyncStorage.getItem(KEY_BASE64);
         var usertype=await AsyncStorage.getItem(KEY_User);



         if(value!=null && pwd!=null && base64!=null){
           var res=this.checkPwd(value,pwd);
           if(res){

             if(usertype=='student'){
               this.props.navigation.navigate('MainBottom');
             }else if (usertype=='teacher') {
               //this.props.navigation.navigate('TeacherMainBottom');

               this.props.navigation.navigate('TeacherMainBottom');

             }else {
               this.props.navigation.navigate('StudentLogin');
             }
           }else {
             this.props.navigation.navigate('StudentLogin');
           }

         }else{
           this.props.navigation.navigate('StudentLogin');
         }
      }catch(error){
          Alert.alert(error.message);
           ToastAndroid.show('初始化失败,错误码:000'+error.message, ToastAndroid.SHORT);
      }
  },

  checkPwd(username,pwd){
    // if(username==pwd){
    //   return true;
    // }else {
    //   return false;
    // }
    // I decide not to check if user password is right
    // if he changed password ,we can know it from each GET request and route to login page then

    return true;

  },
  showTab(){
    //  this.setState({isReady:true});
     console.log('tab showed');

  },


  handleIfLogined(){
    this.checkHaveRecord().done();
  },
  componentWillMount: function() {
    setTimeout(this.handleIfLogined, 300);
  },

  render() {

    return (
      <View style={styles.container}>


        <StatusBar hidden={true}/>


        <Text style={styles.welcome}>
          CourseLab
        </Text>



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
  welcomearea:{
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%'
  }

});



export default Welcome;
