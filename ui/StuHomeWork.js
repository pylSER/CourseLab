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
import ListItem from './ExamListItem.js';


var KEY_BASE64='@CourseLab:base64';
var KEY_ID='@CourseLab:id';

var RLL=0;

const StuMission = React.createClass({



  getInitialState(){
      return{
        classLen:0,
        classJSONList:'',
        refreshing:false,
        isReady:false,
        myid:'',
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
        ToastAndroid.show('AsyncStorage 出现错误，错误码:TC43', ToastAndroid.SHORT);
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

  getInitialData(token){
    var that=this;
    this.timeout(5000, fetch('http://115.29.184.56:8090/api/course/2/homework',{
    method:"GET",
    headers: {
         'Authorization': token
     }})).then( (response)=> {
      response.json().then(function(data) {
            var JSONlen=0;

            for(var id in data){
                data[JSONlen]['key']=data[JSONlen]['id'];
                JSONlen+=1;
            }

            that.setState({classLen:JSONlen});
            that.updateData(data);
            console.log(data);

            }).catch(function(error){
              // not ok to show , go to login

              console.log("fetchfailedMYERROR"+error.message);
              that.logout();
            })
    }).catch(function(error) {
      // it is ok just show network error
    console.log("timeout");
    ToastAndroid.show('网络超时了,请检查网络', ToastAndroid.SHORT);
    })

  },



  updateData(data){
    this.setState({classJSONList:data});
    this.setState({isReady:true});
  },




  getLoginData(){
    AsyncStorage.getItem(KEY_BASE64).then((token) => {
      var realToken='Basic '+token;
      this.getInitialData(realToken);
    });
  },


  componentWillMount: function() {
    AsyncStorage.getItem(KEY_ID).then((id) => {
      this.setState({myid:id});
      console.log('myid is'+id);

        this.getLoginData();
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
        共 {this.state.classLen} 次作业
      </Text>

    );
  },
  goToExamDetail(dataitem){
      this.props.screenProps.goToExamDetail(dataitem);
  },



  render() {

    return (

      <View style={{backgroundColor: 'white',flex:1}}>

        {!this.state.isReady &&
          <View >

          <ActivityIndicator color="#025ca6" size={50}  style={styles.indicator} />

          <Text style={styles.loadingText}>获取数据中...</Text>

          </View>

        }

{this.state.isReady &&
  <FlatList
    ListFooterComponent={this.renderFooter}
    ItemSeparatorComponent={this.renderSeparator}

    data={this.state.classJSONList}
    renderItem={({item}) => <ListItem onPress={this.goToExamDetail} dataitem={item}/>}
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
    paddingTop:'50%'
  },

  loadingText: {
    textAlign: 'center',
    color: 'gray',
    fontSize:20,
    paddingTop:10,
  },


});





export default StuMission;
