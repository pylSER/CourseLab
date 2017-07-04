import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  ScrollView

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItem from './scoreListItem.js';
import QuestionCard from './QuestionCard.js';

import StuDetailGrid from './StuDetailGrid.js';


var KEY_NAME = '@CourseLab:name';
var KEY_PWD = '@CourseLab:pwd';
var KEY_BASE64='@CourseLab:base64';
var KEY_User='@CourseLab:user';
var KEY_ID='@CourseLab:id';

var initNumber=12;

var studentID=0;

const Detail = React.createClass({

  getInitialState(){
    return{

      isNetworkNotOK:false,
      isLoading:true,
      refreshing:false,
      isEmpty:false,
      listdata:'',
      footerText:'加载中...',
      listShowData:'',
      currentIndex:0,
      noNeedLoad:false,
      studentLen:0,
      gridData:'',


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

  goToTestCase(){
    this.props.navigation.navigate('StudentTestCase');
  },
  goToReadMe(){
      this.props.navigation.navigate('ReadMe');
  },




  getData(token){
     var assid=this.props.navigation.state.params.examData.id;

   //var assid=38;

  // var stuid=64;
   var stuid=studentID;

    var that=this;
    var url='http://115.29.184.56:8090/api/assignment/'+assid+'/student/'+stuid+'/analysis';
    console.log(url);
    this.timeout(5000, fetch(url,{
    method:"GET",
    headers: {
         'Authorization': token
     }})).then( (response)=> {
      response.json().then(function(examdata) {



                  console.log(examdata);

                  that.setState({gridData:examdata.questionResults[0]});
                  that.stopLoading();

            }).catch(function(error){
              that.doNetWorkError();
              console.log(error.message);
            })
  }).catch(function(error) {
    that.doNetWorkError();
    console.log(error.message);
    })
  },

  componentWillMount: function() {
    this.setState({emptyError: ''});


    AsyncStorage.getItem(KEY_BASE64).then((token) => {
      var realToken='Basic '+token;

      AsyncStorage.getItem(KEY_ID).then((id) => {
            studentID=id;
            this.getData(realToken);
      });
    });


  },
  doRefresh(){
    this.setState({emptyError: ''});


    AsyncStorage.getItem(KEY_BASE64).then((token) => {
      var realToken='Basic '+token;

      AsyncStorage.getItem(KEY_ID).then((id) => {
            studentID=id;
            this.getData(realToken);
      });
    });
  },

  stopLoading(){
    this.setState({isLoading:false});
    this.setState({isNetworkNotOK: false});
  },
  doNetWorkError(){
    this.setState({isLoading:false});
    this.setState({isNetworkNotOK: true});
  },


  render() {

    return (

      <View style={{backgroundColor: '#FAF9FC',flex:1}}>



          {this.state.isLoading &&
          <ActivityIndicator color="#025ca6" size={50}  style={styles.indicator} />
          }

          {this.state.isLoading &&
          <Text style={styles.loadingText}>获取数据中...</Text>
          }


          {this.state.isEmpty &&
              <Text style={styles.emptyText}>班级为空</Text>
          }

          {this.state.isNetworkNotOK &&
            <TouchableOpacity
                  onPress={this.doRefresh}
                  activeOpacity={0.4}
                  style={styles.refresh}
                  >
                  <Icon name='refresh'

                    color='#e7ab34'
                    style={{fontSize:36}}/>
            </TouchableOpacity>
          }

          {this.state.isNetworkNotOK &&
          <Text style={styles.errorText}>网络连接超时啦</Text>
          }





          <View>

            {(!this.state.isLoading&& !this.state.isNetworkNotOK) &&

                <QuestionCard  scoredata={this.state.listdata}
                  questionData={this.props.navigation.state.params.examData.questions[0]}
                  isShowAvg={false}
                  />

            }


            {(!this.state.isLoading&& !this.state.isNetworkNotOK) &&
                <ScrollView  ref='scroll' keyboardShouldPersistTaps="always" >

                <StuDetailGrid goToTestCase={this.goToTestCase} goToReadMe={this.goToReadMe}  gridData={this.state.gridData} />
                </ScrollView>

            }






  </View>




      </View>
    );
  }
});

const styles = StyleSheet.create({
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
  errorText:{
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10,
    color: 'gray',
    fontSize:20,
  },
  refresh:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:'60%',
  },
  emptyText:{
    textAlign: 'center',
    color: 'gray',
    fontSize:20,
    marginTop:'60%',
  },
  seperator: {
    height: 0.7,
    width: "100%",
    backgroundColor: "#CED0CE",
  },
  box1: {
  flex:0.3,
  marginLeft:15,
},
box2: {
  flex:1,
  alignItems: 'flex-end'
},

  card: {
    width:'100%',
    flexDirection: 'row',
    marginTop:7,
    marginBottom:7
  },

});


export default Detail;
