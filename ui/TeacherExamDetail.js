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
  AsyncStorage

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItem from './scoreListItem.js';
import QuestionCard from './QuestionCard.js';


var KEY_NAME = '@CourseLab:name';
var KEY_PWD = '@CourseLab:pwd';
var KEY_BASE64='@CourseLab:base64';
var KEY_User='@CourseLab:user';

var initNumber=12;

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

  goToDetailItem(){
// this.props.navigation.state.params.examData
  },




  getData(token){
     //var assid=this.props.navigation.state.params.examData.id;

    var assid=38;

    var that=this;
    var url='http://115.29.184.56:8090/api/assignment/'+assid+'/score';
    this.timeout(5000, fetch(url,{
    method:"GET",
    headers: {
         'Authorization': token
     }})).then( (response)=> {
      response.json().then(function(examdata) {


                  var data=examdata.questions[0].students;




                  var datalen=data.length;

                  that.setState({studentLen: datalen});

                  if(datalen==0){
                    that.handleEmpty();
                  }else {
                    that.handleNOTEmpty();

                    var JSONlen=0;
                    for(var id in data){
                      data[JSONlen]['key']=data[JSONlen].studentId;
                      JSONlen+=1;
                    }

                    var showdata=[];
                    var showlen=0;
                    if(datalen<=initNumber){
                      showlen=datalen;
                      that.setState({noNeedLoad: true});
                    }else {
                      showlen=initNumber;
                      that.setState({noNeedLoad: false});
                    }


                    for(var i=0;i<showlen;i++){
                      showdata.push(data[i]);
                    }

                    that.setState({listShowData: showdata});
                    that.setState({listdata: data});

                    that.setState({currentIndex:1});


                  }

                  console.log(data);
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

  componentDidMount: function() {
    this.setState({emptyError: ''});


    AsyncStorage.getItem(KEY_BASE64).then((token) => {
      var realToken='Basic '+token;
      this.getData(realToken);
    });


  },
  showData(){
    // Alert.alert('alert',this.state.listdata)
    console.log(this.state.listdata);
  },
  stopLoading(){
    this.setState({isLoading:false});
    this.setState({isNetworkNotOK: false});
  },
  doNetWorkError(){
    this.setState({isLoading:false});
    this.setState({isNetworkNotOK: true});
  },
  doRefresh(){
    this.setState({isLoading:true});
    this.setState({isNetworkNotOK: false});
    this.getData();
  },
  doPullRefresh(){
    this.setState({refreshing: true});
    this.getData();
    this.setState({refreshing: false});
  },
  handleEmpty(){
    this.setState({isEmpty: true});
  },
  handleNOTEmpty(){
    this.setState({isEmpty: false});
  },
  renderSeparator(){
    return (
      <View style={styles.card}>
    <View style={styles.box1}>

    </View>
    <View style={styles.box2}>
        <View style={styles.seperator} />
    </View>
    </View>
    );
  },
  renderFooter(){

    if(this.state.studentLen==0){
      return (

        <Text>

        </Text>

      );

    }else if(this.state.studentLen<=initNumber){

        return (
          <Text style={{textAlign:'center',fontSize:15,marginBottom:5}}>
            共 {this.state.studentLen} 个学生

          </Text>
        );
    }else if (this.state.studentLen>initNumber) {
      return (
        <Text style={{textAlign:'center',fontSize:15,marginBottom:5}}>
          {this.state.footerText}
        </Text>
      );
    }

  },
  endFooter(){
    var text='共 '+this.state.studentLen+' 个学生';
    this.setState({footerText:text });
  },


  goToStuInfo(studata){
    console.log(studata);
    this.props.navigation.navigate('TeacherStudentInfo',{data:studata});
  },
  loadMore(){
    if(this.state.noNeedLoad){
      console.log('no need load');
      return;
    }else {
      console.log('load more');
      var alldata=this.state.listdata;

      var showdata=this.state.listShowData;

      var startPos=this.state.currentIndex*initNumber;

      var duration=0;
      if((startPos+initNumber)<=alldata.length){
        duration=startPos+initNumber;
      }else {
        duration=alldata.length;
        this.setState({noNeedLoad: true});
        this.endFooter();
      }


      for (var i = startPos; i <duration ; i++) {
        showdata.push(alldata[i]);
      }

      this.setState({currentIndex:(this.state.currentIndex+1) });

      this.setState({listShowData:showdata });
    }



  },
  handleSearch(){
    console.log('search tapped');
    this.props.navigation.navigate('TeacherSearchScore',{data:this.state.listdata});
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
                  isShowAvg={true}
                  />

            }

          {(!this.state.isLoading&& !this.state.isNetworkNotOK) &&

                  <FlatList
                        ListFooterComponent={this.renderFooter}
                        ItemSeparatorComponent={this.renderSeparator}
                        refreshing={this.state.refreshing}
                        onRefresh={this.doPullRefresh}
                        onEndReached={this.loadMore}
                        initialNumToRender={initNumber}
                        onEndReachedThreshold={0.5}
                        removeClippedSubviews={false}
                        data={this.state.listShowData}
                        renderItem={({item}) => <ListItem score={item.score} isScored={item.scored} id={item.key} number={item.studentNumber} avatar={item.avatar} name={item.studentName} />}
                      />
          }



  </View>


            {(!this.state.isLoading&& !this.state.isNetworkNotOK) &&
              <View style={styles.fab}>
                    <TouchableOpacity
                          onPress={this.handleSearch}
                          activeOpacity={0.4}

                          >
                          <Icon name='search'
                            color='white'
                            style={styles.searchIcon}/>
                    </TouchableOpacity>
                    </View>
            }



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
  fab:{
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#706af3',
    position: 'absolute',
    bottom: 60,
    right: 25,
    justifyContent:'center'
  },
  searchIcon:{
    fontSize:22,
    textAlign:'center',
    fontWeight:"100"

  }


});


export default Detail;
