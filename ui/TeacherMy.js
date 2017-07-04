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
  AsyncStorage,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserAvatar from 'react-native-user-avatar';

import InfoItem from './infoItem.js';
import EmailItem from './emailItem.js';

var KEY_NAME = '@CourseLab:name';
var KEY_PWD = '@CourseLab:pwd';
var KEY_BASE64='@CourseLab:base64';
var KEY_User='@CourseLab:user';


const TeacherMy = React.createClass({

  getInitialState(){
      return{
        loginName:'',
        loginPWD:'',
        realName:'无数据',
        avatarlink:'null',
        gendericon:'venus',
        email:'',
        hasAvatar:false,
        avatarText:'CL',


      }
  },

  async logout(type){
    try{
        await AsyncStorage.removeItem(KEY_NAME);
        await AsyncStorage.removeItem(KEY_PWD);
        await AsyncStorage.removeItem(KEY_BASE64);
        await AsyncStorage.removeItem(KEY_User);

if(type=='logout'){
  ToastAndroid.show('已注销', ToastAndroid.SHORT);
}else if(type=='expired') {
  ToastAndroid.show('登录过期', ToastAndroid.SHORT);
}


        this.props.navigation.navigate('StudentLogin');

     }catch(error){
        ToastAndroid.show('AsyncStorage 出现错误，错误码:my51', ToastAndroid.SHORT);
        // Alert.alert(error.message);
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

  getLoginData(){

    AsyncStorage.getItem(KEY_NAME).then((name) => {
      this.setState({
        loginName:name
      });

      AsyncStorage.getItem(KEY_PWD).then((pwd) => {
        this.setState({
          loginPWD:pwd
        });
          console.log("pwd"+this.state.loginName);
         console.log("pwd"+this.state.loginPWD);
         this.getInitalData();
      });

    });





 },

  getInitalData(){


    var payload={
      username:this.state.loginName,
      password:this.state.loginPWD
    };

    jsondata=JSON.stringify(payload);
    var that=this;

console.log("jsondata:"+jsondata);
    this.timeout(5000, fetch('http://115.29.184.56:8090/api/user/auth',{
    method:"POST",
    headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
     },

    body:jsondata})).then( (response)=> {
      response.json().then(function(data) {
              console.log(data);
                if(data.username==that.state.loginName && data.type=='teacher'){
                  //ok to show data
                  that.setState({realName:data.name});
                  that.setState({email:data.email});

                  if(data.gender='male'){
                    that.setState({gendericon:'mars'});
                  }

                  if(data.avatar=='null'){
                    that.setState({hasAvatar:false});
                  }else {
                    that.setState({avatarlink:data.avatar});
                    that.setState({hasAvatar:true});
                  }

                  var len=that.getAvatarTextLen(data.name);

                  if(len>2){
                    var subName=data.name.substring(0,1);
                    that.setState({avatarText:subName});
                  }else {
                    that.setState({avatarText:data.name});
                  }






                }else{
                  // not ok to show , go to login
                  console.log("fetchfailedMYELSE");
                  that.logout('expired');
                }

            }).catch(function(error){
              // not ok to show , go to login
              console.log("fetchfailedMYERROR"+error.message);
                that.logout('expired');

            })
    }).catch(function(error) {
      // it is ok just show network error
    console.log("timeout");
    ToastAndroid.show('网络超时了,请检查网络', ToastAndroid.SHORT);
    })
  },

  componentWillMount: function() {
      this.getLoginData();
  },
  getAvatarTextLen(text){
    return text.replace(/[\u0391-\uFFE5]/g,"a").length;
  },




  render() {

    return (

      <View style={{flex:1,backgroundColor:'white'}}>
          <View style={styles.avatarBG}>


            {this.state.hasAvatar &&
              <UserAvatar name={this.state.avatarText} size={80} colors={['#f69988','#f9a825']} src={this.state.avatarlink} style={styles.avatar}/>
            }

            {!this.state.hasAvatar &&
              <UserAvatar name={this.state.avatarText} size={80} colors={['#f69988','#f9a825']} style={styles.avatar}/>
            }



              <Text style={styles.subinfo}>
                {this.state.loginName}  |  <Icon name={this.state.gendericon} color='white' style={{fontSize:15}}/>
              </Text>

              <Text style={styles.subinfo}>
                教师
              </Text>

            </View>


<ScrollView  ref='scroll' keyboardShouldPersistTaps="always" >

<InfoItem title='姓名' content={this.state.realName} />

  <View
    style={{
      height: 1,
      width: "100%",
      backgroundColor: "#CED0CE",
    }}
  />



<EmailItem title='电子邮箱' content={this.state.email} />






</ScrollView>
<TouchableOpacity

      onPress={this.logout.bind(this,'logout')}
      activeOpacity={0.8}
      style={styles.lgnbtn}
      >
      <Text style={styles.lgnbtntxt}>注销</Text>
</TouchableOpacity>


    </View>
    );
  }
});


const styles = StyleSheet.create({
  avatarBG: {
    height:'46%',
    backgroundColor:'#025ca6',

    alignItems: 'center'
  },
  avatar:{
    marginTop:10,
    marginBottom:5
  },
  lgnbtn:{
    marginTop:20,
    width:'100%',
    height:50,
    backgroundColor:'#fe5764',
  },

  lgnbtntxt:{
    color:'white',
    textAlign: 'center',
    marginTop:11,
    fontSize:18,
    fontWeight:"600",
  },
  subinfo:{
    color:'white',
    fontSize:15,
    paddingTop:10
  },
  cardtitle:{
    height:100,
  }

});

export default TeacherMy;
