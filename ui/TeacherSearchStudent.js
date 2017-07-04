import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from 'react-native-searchbar';
import ListItem from './listItem.js';


var initNumber=8;

const StuPractie = React.createClass({

  getInitialState(){
      return{
        isResultEmpty:false,
        listShowData:'',
        listdata:'',
        footerText:'加载中...',
        noNeedLoad:false,
        currentIndex:1,
        listdata:'',

      }
  },

  goBack(){
    console.log('going back');
    this.props.navigation.goBack();
  },
  handleSearch(input){
    var searchdata=[];
    console.log(input);
    this.setState({currentIndex:1});
    this.setState({noNeedLoad:false});


    if(input=='1' || input==''){
      this.setState({isResultEmpty:false});
      return
    }

    var alldata=this.props.navigation.state.params.data;

    for(var id in alldata) {

        if(this.isContains(alldata[id].name,input)){
          searchdata.push(alldata[id]);
          continue;
        }

        if(this.isContains(alldata[id].number,input)){
          searchdata.push(alldata[id]);
        }
    }

    if(searchdata.length==0){
      this.setState({isResultEmpty:true});
    }else {
      this.setState({isResultEmpty:false});
    }

    if(searchdata.length<=initNumber){
      this.setState({noNeedLoad:true});
      this.setState({listShowData:searchdata});
    }else {
      this.setState({noNeedLoad:false});
      var showdata=[];
      for(var i=0;i<initNumber;i++){
        showdata.push(searchdata[i]);
      }
      this.setState({listShowData:showdata});

    }


    console.log(searchdata);
    this.setState({listdata:searchdata});
  },
  goToStuInfo(studata){
    console.log(studata);
    this.props.navigation.navigate('TeacherStudentInfo',{data:studata});
  },

  isContains(str, substr) {
    return str.indexOf(substr) >= 0;
  },

  renderFooter(){
  if(this.state.listdata.length<=initNumber){

        return (
          <Text style={{textAlign:'center',fontSize:15,marginBottom:5}}>
            共 {this.state.listShowData.length} 个学生

          </Text>
        );
    }else if (this.state.listdata.length>initNumber) {
      return (
        <Text style={{textAlign:'center',fontSize:15,marginBottom:5}}>
          {this.state.footerText}
        </Text>
      );
    }

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
  endFooter(){
    var text='共 '+this.state.listdata.length+' 个学生';
    this.setState({footerText:text });
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

  render() {

    return (

      <View style={{backgroundColor:'white',flex:1}}>

      <SearchBar
        ref={(ref) => this.searchBar = ref}
        showOnLoad={true}
        data={this.props.navigation.state.params.data}
        onBack={this.goBack}
        placeholder="输入姓名/学号"
        handleSearch={this.handleSearch}

        />

      <Text style={{textAlign:'center',fontSize:15,marginTop:80}}>
          在 {this.props.navigation.state.params.className} 内搜索学生:
      </Text>


      {this.state.isResultEmpty &&
        <Text style={{textAlign:'center',fontSize:25,marginTop:30}}>
            无结果
        </Text>

      }




              <FlatList
                    ListFooterComponent={this.renderFooter}
                    ItemSeparatorComponent={this.renderSeparator}

                    onEndReached={this.loadMore}
                    initialNumToRender={initNumber}
                    onEndReachedThreshold={0.5}
                    removeClippedSubviews={false}
                    data={this.state.listShowData}
                    renderItem={({item}) => <ListItem onPress={this.goToStuInfo} alldata={item} id={item.key} number={item.number} avatar={item.avatar} name={item.name} />}
                  />


        </View>


    );
  }
});


const styles = StyleSheet.create({
  item: {
    height:80,
  },
  text:{
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:18,
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


export default StuPractie;
