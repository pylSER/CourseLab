import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage,
  FlatList

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserAvatar from 'react-native-user-avatar';
import ListItem from './infoItem.js';


var initNumber=12;
const StudentTestCase = React.createClass({

  getInitialState(){
      return{

        isEmpty:'true',
        listdata:'',

      }
  },

    componentDidMount: function() {
        var data=[
          {
            name:'TestCase1',
            passed:'passed',
            key:1

          },{
            name:'TestCase2',
            passed:'passed',
            key:2

          },{
            name:'TestCase3',
            passed:'failed',
            key:3
          }

        ];

        this.setState({listdata:data});
        this.setState({isEmpty:false});
    },

    renderSeparator(){
      return (
        <View style={styles.card}>
      <View style={styles.box2}>
          <View style={styles.seperator} />
      </View>
      </View>
      );
    },

  render() {

    return (
      <View>

      {this.state.isEmpty &&
          <Text style={styles.emptyText}>测试用例为空</Text>
      }

      {!this.state.isEmpty &&
        <FlatList
              ItemSeparatorComponent={this.renderSeparator}

              initialNumToRender={initNumber}
              onEndReachedThreshold={0.5}
              removeClippedSubviews={false}
              data={this.state.listdata}
              renderItem={({item}) => <ListItem title={item.name} content={item.passed} />}
            />

      }


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
box1: {
  flex:0.3,
  marginLeft:15,
},
box2: {
  flex:1,
},

  card: {
    width:'100%',
    flexDirection: 'row',
    marginTop:13,
    marginBottom:22
  },
  title:{

    fontSize:17,
    color:'#242424',

  },
  content:{
    fontSize:15,
    color:'#b4b4b4',
    marginTop:3
  },
  avatar:{
    marginTop:0,
    marginBottom:20
  },
  name:{
    fontSize:18,
    color:'black',
    marginTop:3
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
});


export default StudentTestCase;
