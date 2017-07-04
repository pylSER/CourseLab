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


const My = React.createClass({

  getInitialState(){
      return{
        loginName:'',
        loginPWD:'',
        realName:'无数据',
        avatarlink:'null',
        gendericon:'venus',
        email:'未设定',
        hasAvatar:false,
        avatarText:'CL',
        number:'',
        gitID:'',
        gitUserName:''


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


  getInitialData(){
    var data=this.props.navigation.state.params.data;

        //ok to show data
        this.setState({realName:data.name});
        if(data.email!=''){
          this.setState({email:data.email});
        }

        this.setState({number:data.number});
        this.setState({gitID:data.gitId});
        this.setState({gitUserName:data.gitUsername});


        if(data.gender='male'){
          this.setState({gendericon:'mars'});
        }

        if(data.avatar=='null'){
          this.setState({hasAvatar:false});
        }else {
          this.setState({avatarlink:data.avatar});
          this.setState({hasAvatar:true});
        }

        var len=this.getAvatarTextLen(data.name);

        if(len>2){
          var subName=data.name.substring(0,1);
          this.setState({avatarText:subName});
        }else {
          this.setState({avatarText:data.name});
        }


  },

  componentWillMount: function() {
      this.getInitialData();
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
                {this.state.realName}  |  <Icon name={this.state.gendericon} color='white' style={{fontSize:15}}/>
              </Text>

              <Text style={styles.subinfo}>
                学生
              </Text>

              <Text style={styles.subinfo}>
                学号: {this.state.number}
              </Text>
            </View>


<ScrollView  ref='scroll' keyboardShouldPersistTaps="always" >

<InfoItem title='姓名' content={this.state.realName} />

  <View
    style={{
      height: 0.6,
      width: "100%",
      backgroundColor: "#CED0CE",
    }}
  />


<EmailItem title='电子邮箱' content={this.state.email} />
    <View
      style={{
        height: 0.6,
        width: "100%",
        backgroundColor: "#CED0CE",
      }}
    />

  <InfoItem title='git ID' content={this.state.gitID} />
    <View
      style={{
        height: 0.6,
        width: "100%",
        backgroundColor: "#CED0CE",
      }}
    />

  <InfoItem title='git用户名' content={this.state.gitUserName} />


</ScrollView>


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

export default My;
