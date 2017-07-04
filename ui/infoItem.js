import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const MyInfoItem = React.createClass({

  render() {

    return (

      <View style={styles.card}>
    <View style={styles.box1}>
      <Text style={styles.title} >{this.props.title}</Text>
    </View>
    <View style={styles.box2}>
      <Text style={styles.content} >{this.props.content}</Text>
    </View>
  </View>
    );
  }
});


const styles = StyleSheet.create({

  box1: {
  flex:0.4,
  marginLeft:15,
},
box2: {
  flex:1,
  alignItems: 'flex-end'
},

  card: {
    width:'100%',
    flexDirection: 'row',
    marginTop:20,
    marginBottom:20
  },
  title:{

    fontSize:17,
    color:'#242424',

  },
  content:{
    marginRight:20,
    fontSize:17,
    color:'#b4b4b4',
  }

});

export default MyInfoItem;
