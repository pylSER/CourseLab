import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItem from './listItem.js';



const Detail = React.createClass({

  getInitialState(){
    return{
      listdata:[{key: 0}],
      isNetworkNotOK:false,
      isLoading:true,
      refreshing:false,

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

  },




  getData(){
    var that=this;
    this.timeout(5000, fetch('http://api.apixu.com/v1/history.json?key=9e5cb3115d9e4cdb9f280140171905&q=NanJing&dt=2017-05-18')).then( (response)=> {
      response.json().then(function(data) {
                  //  Alert.alert(data.forecast.forecastday[0].hour[0].time)
                  // console.log(data.forecast.forecastday[0].hour);
                  that.setState({listdata:data.forecast.forecastday[0].hour });
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
  renderSeparator(){
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
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
  ItemSeparatorComponent={this.renderSeparator}
  refreshing={this.state.refreshing}
  onRefresh={this.doPullRefresh}

  data={this.state.listdata}
  renderItem={({item}) => <ListItem time={item.time}/>}
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
  }


});


export default Detail;
