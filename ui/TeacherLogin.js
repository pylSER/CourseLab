import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage
} from 'react-native';



import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


var Buffer = require('buffer').Buffer
var dismissKeyboard = require('dismissKeyboard');
var KEY_NAME = '@CourseLab:name';
var KEY_PWD = '@CourseLab:pwd';
var KEY_BASE64='@CourseLab:base64';
var KEY_User='@CourseLab:user';

const TeacherLogin = React.createClass({
  getInitialState(){
      return{
          username:'',
          pwd:'',
          errorMsg:'',

      }
  },

  timeout(ms, promise) {
   return new Promise(function(resolve, reject) {
     setTimeout(function() {
       reject(new Error("timeout"))
     }, ms)
     promise.then(resolve, reject)
   })
  },


  async btndealer(){
    var isinputok=this.doCheck();

    if(!isinputok){
      return;
    }

    var name=this.state.username;
    var password=this.state.pwd;



    var payload={
      username:name,
      password:password
    };

    jsondata=JSON.stringify(payload);
    var that=this;

    this.setState({errorMsg:'登录中...'});

    this.timeout(5000, fetch('http://115.29.184.56:8090/api/user/auth',{
    method:"POST",
    headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
     },

    body:jsondata})).then( (response)=> {
      response.json().then(function(data) {

                console.log(data.username);

                if(data.username==name && data.type=='teacher'){
                  that.setState({errorMsg:''});
                  dismissKeyboard();
                  ToastAndroid.show('登录成功', ToastAndroid.SHORT);
                  that.storeNameAndPWD().then(() => {
                      that.props.screenProps.callbackTeacher();
                  });


                }else{
                  console.log("fetchfailed");
                  that.refs.scroll.scrollTo({y:1000,x:0,animated:true});
                  that.setState({errorMsg:'用户名或密码错误'});
                }

            }).catch(function(error){
              console.log("fetchfailed");
              that.refs.scroll.scrollTo({y:1000,x:0,animated:true});
              that.setState({errorMsg:'用户名或密码错误'});
            })
  }).catch(function(error) {
    console.log("timeout");
    that.setState({errorMsg:'网路超时,请检查网络'});
  })

  },

  async storeNameAndPWD(){
    try{
        await AsyncStorage.setItem(KEY_NAME,this.state.username);
        await AsyncStorage.setItem(KEY_PWD,this.state.pwd);

        var token = this.state.username+":"+this.state.pwd;
        token=this.convertBase64(token);

        console.log(token);

        await AsyncStorage.setItem(KEY_BASE64,token);

        await AsyncStorage.setItem(KEY_User,'teacher');

        console.log("writing AsyncStorage..");
     }catch(error){
        ToastAndroid.show('AsyncStorage 出现错误，错误码:SL77', ToastAndroid.SHORT);
        // Alert.alert(error.message);
     }
  },


  doCheck(){
    this.refs.scroll.scrollTo({y:1000,x:0,animated:true});
    if (this.state.username=='') {
      this.setState({errorMsg:'请输入用户名'});
      return false;
    }
    if (this.state.pwd=='') {
      this.setState({errorMsg:'请输入密码'});
      return false;
    }
    this.setState({errorMsg:''});
    return true;
  },
  convertBase64(line){
    var base64Str= new Buffer(line).toString('base64');
    return base64Str;
  },


  render() {

    return (
<View style={{flex: 1,backgroundColor:'#FAF9FC'}}>
      <ScrollView  ref='scroll' keyboardShouldPersistTaps="always" >




<View style={{flexDirection:'row',marginLeft:'6%'}}>
        <Icon name='id-card-o'

          color='#025ca6'
          style={{marginTop:60,marginRight:15,fontSize:18}}/>

          <TextInput
            blurOnSubmit={false}
            style={{width:'75%',marginTop:40,fontSize:18}}
            placeholder="教师ID"
            underlineColorAndroid='#63eecd'
            placeholderTextColor='#63eecd'
            onSubmitEditing={(event) => {
              this.refs.scroll.scrollTo({y:100,x:0,animated:true});
                this.refs.pwdInput.focus();
            }}
            onChangeText={(username) => this.setState({username})}
          returnKeyType='next'

            />
  </View>

<View style={{flexDirection:'row',marginLeft:'6%'}}>
          <Icon name='key'

            color='#025ca6'
            style={{marginTop:30,marginRight:15,fontSize:18}}/>
            <TextInput
              ref='pwdInput'
              style={{width:'75%',marginTop:10,fontSize:18}}
              placeholder="密码"
              underlineColorAndroid='#63eecd'
              placeholderTextColor='#63eecd'
              secureTextEntry={true}
              onChangeText={(pwd) => this.setState({pwd})}
              returnKeyType='done'
              onSubmitEditing={this.btndealer}

            />
</View>

<Text style={styles.errortxt}>
{this.state.errorMsg}
</Text>

<View style={{height:30}}>
</View>





</ScrollView>

<View>
  <TouchableOpacity
        style={styles.lgnbtn}
        onPress={this.btndealer}
        activeOpacity={0.8}
        >
        <Text style={styles.lgnbtntxt}>登录</Text>
  </TouchableOpacity>
</View>

</View>

    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height:'90%',
    alignItems: 'center',
    backgroundColor: '#FAF9FC',
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  btnview:{
    flex: 0,
    height:'50%',
    backgroundColor:'red'
  },
  lgnbtn:{

    width:'100%',
    height:50,
    backgroundColor:'#025ca6',
  },

  lgnbtntxt:{
    color:'white',
    textAlign: 'center',
    marginTop:11,
    fontSize:18,
    fontWeight:"600",
  },
  errortxt:{
    color:'red',
    textAlign: 'center',
    fontSize:17,
    marginTop:10,
  }
});


export default TeacherLogin;
