import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator,StackNavigator } from 'react-navigation';
import ListItem from './classListItem.js';


var KEY_BASE64='@CourseLab:base64';
var KEY_NAME = '@CourseLab:name';
var KEY_PWD = '@CourseLab:pwd';
var KEY_User='@CourseLab:user';


var RLL=0;
var dataCounter=0;

const TeacherClass = React.createClass({



  getInitialState(){
      return{
        classLen:0,
        classJSONList:'',
        refreshing:false,
        isReady:false
      }
  },

  async logout(){
    try{
        await AsyncStorage.removeItem(KEY_NAME);
        await AsyncStorage.removeItem(KEY_PWD);
        await AsyncStorage.removeItem(KEY_BASE64);
        await AsyncStorage.removeItem(KEY_User);

        ToastAndroid.show('登录过期', ToastAndroid.SHORT);

        this.props.navigation.navigate('StudentLogin');

     }catch(error){
         Alert.alert(error.message);
        ToastAndroid.show('AsyncStorage 出现错误，错误码:TC43', ToastAndroid.SHORT);


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

  getInitialData(token){
    var that=this;
    this.timeout(5000, fetch('http://115.29.184.56:8090/api/group',{
    method:"GET",
    headers: {
         'Authorization': token
     }})).then( (response)=> {
      response.json().then(function(data) {
              // console.log(data);
            var JSONlen=0;

            for(var myid in data){

                data[JSONlen]['key']=data[JSONlen].id;

                var onejsondata=data[JSONlen];


                // that.setState({classJSONList:data});


                that.getClassSize(onejsondata,token,JSONlen,function(size,index,number){
                    console.log('JSONlen:'+index+'fnsize:'+size);
                    data[index]['size']=size;


                      console.log(data);

                      that.updateData(data);

                      dataCounter+=1;

                    if(data.length==dataCounter){
                        that.doReady();
                    }


                });
                // data[JSONlen]['size']=size;


                JSONlen+=1;




            }

            that.setState({classLen:JSONlen});

            console.log("lenght:"+JSONlen);







            }).catch(function(error){
              // not ok to show , go to login

              console.log("CLASSfetchfailedMYERROR"+error.message);
              //that.logout();
            })
    }).catch(function(error) {
      // it is ok just show network error
    console.log("timeout");
    ToastAndroid.show('网络超时了,请检查网络', ToastAndroid.SHORT);
    })

  },

getClassSize(onejsondata,token,index,fn){
  RLL+=1;
   var that=this;
    var url='http://115.29.184.56:8090/api/group/'+onejsondata.id+'/students';
    var that=this;
    this.timeout(5000,fetch(url,{
    method:"GET",
    headers: {
         'Authorization': token
     }})) .then( (response)=> {
      response.json().then(function(newdata) {


            fn(newdata.length,index,RLL);


            return 999;

            }).catch(function(error){
              // not ok to show , go to login

              console.log("fetchfailedMYERROR"+error.message);
              return 0;

            })
            return 2;
    }).catch(function(error) {
      // it is ok just show network error
    console.log("timeout");
    ToastAndroid.show('网络超时了,请检查网络', ToastAndroid.SHORT);
    return 0;
    })

  },

  updateData(data){
    this.setState({classJSONList:data});
  },

  doReady(){
    this.setState({isReady:true});
  },






  getLoginData(){
    AsyncStorage.getItem(KEY_BASE64).then((token) => {
      var realToken='Basic '+token;
      this.getInitialData(realToken);
    });
  },


  componentDidMount: function() {

    AsyncStorage.getItem(KEY_User).then((user) => {
      if(user!='student'){
        this.getLoginData();
      }
    });


  },
  renderSeparator(){
    return (
      <View style={styles.seperator} />
    );
  },
  doPullRefresh(){
    this.setState({isReady: false});
    this.setState({refreshing: true});
    this.getLoginData();
    this.setState({isReady: true});
    this.setState({refreshing: false});

  },
  renderFooter(){
    return (

      <Text style={{textAlign:'center',fontSize:15}}>
        共 {this.state.classLen} 个班级
      </Text>

    );
  },
  goToClassDetail(groupid,datalen,className){
      console.log('going to '+groupid);
      this.props.navigation.navigate('TeacherClassStudent',{gid:groupid,datalen:datalen,name:className});
  },



  render() {

    return (

      <View style={{backgroundColor: 'white',flex:1}}>

{!this.state.isReady &&
  <View>

  <ActivityIndicator color="#025ca6" size={50}  style={styles.indicator} />


  <Text style={styles.loadingText}>获取数据中...</Text>

</View>

}


{this.state.isReady &&
  <FlatList
    ListFooterComponent={this.renderFooter}
    ItemSeparatorComponent={this.renderSeparator}

    data={this.state.classJSONList}
    renderItem={({item}) => <ListItem onPress={this.goToClassDetail} id={item.key} name={item.name} size={item.size}/>}
  />

}




      </View>
    );
  }
});


const styles = StyleSheet.create({
  seperator: {
    height: 0.6,
    width: "100%",
    backgroundColor: "#CED0CE",
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:'60%'
  },

  loadingText: {
    textAlign: 'center',
    color: 'gray',
    fontSize:20,
    paddingTop:10,
  },

});





export default TeacherClass;
