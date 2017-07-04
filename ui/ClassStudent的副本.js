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

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItem from './listItem.js';

var initNumber=15;

const Detail = React.createClass({

  getInitialState(){
    return{

      isNetworkNotOK:false,
      isLoading:true,
      refreshing:false,
      isEmpty:false,
      listdata:'',
      footerText:'加载中...',


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
// this.props.navigation.state.params.gid
  },




  getData(){
    if(this.props.navigation.state.params.datalen==0){
        this.handleEmpty();
        this.stopLoading();
        return;
    }

    var that=this;
    var url='http://115.29.184.56:8090/api/group/'+this.props.navigation.state.params.gid+'/students';
    this.timeout(5000, fetch(url)).then( (response)=> {
      response.json().then(function(data) {

                  // console.log(data.forecast.forecastday[0].hour);
                  // that.setState({listdata:data.forecast.forecastday[0].hour });



                  var datalen=data.length;

                  if(datalen==0){
                    that.handleEmpty();
                  }else {
                    that.handleNOTEmpty();

                    var JSONlen=0;
                    for(var id in data){
                      data[JSONlen]['key']=data[JSONlen].id;
                      JSONlen+=1;
                    }



                    that.setState({listdata: data});


                  }

                  console.log(data);
                  that.stopLoading();

            }).catch(function(error){
              that.doNetWorkError();
            })
  }).catch(function(error) {
    that.doNetWorkError();
    })
  },

  componentWillMount: function() {
    this.setState({emptyError: ''});
    this.getData();

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

    if(this.props.navigation.state.params.datalen==0){
      return (

        <Text>

        </Text>

      );

    }else if(this.props.navigation.state.params.datalen<=initNumber){

        return (
          <Text style={{textAlign:'center',fontSize:15,marginBottom:5}}>
            共 {this.props.navigation.state.params.datalen} 个学生

          </Text>
        );
    }else if (this.props.navigation.state.params.datalen>initNumber) {
      return (
        <Text style={{textAlign:'center',fontSize:15,marginBottom:5}}>
          {this.state.footerText}
        </Text>
      );
    }

  },
  endFooter(){
    var text='共 '+this.props.navigation.state.params.datalen+' 个学生';
    this.setState({footerText:text });
  },


  goToStuInfo(studata){
    console.log(studata);
      this.props.navigation.navigate('TeacherStudentInfo',{data:studata});
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


          {(!this.state.isLoading&& !this.state.isNetworkNotOK) &&
                  <FlatList
                        ListFooterComponent={this.renderFooter}
                        ItemSeparatorComponent={this.renderSeparator}
                        refreshing={this.state.refreshing}
                        onRefresh={this.doPullRefresh}
                        onEndReached={this.endFooter}
                        initialNumToRender={initNumber}
                        onEndReachedThreshold={0.5}
                        removeClippedSubviews={false}
                        data={this.state.listdata}
                        renderItem={({item}) => <ListItem onPress={this.goToStuInfo} alldata={item} id={item.key} number={item.number} avatar={item.avatar} name={item.name} />}
                      />
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


});


export default Detail;
