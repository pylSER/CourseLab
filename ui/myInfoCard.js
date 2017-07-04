import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const MyInfoCard = React.createClass({

  render() {

    return (

      <View style={styles.card}>
        <Text style={styles.title}>
          {this.props.title}
        </Text>


        <Text style={styles.content}>
          {this.props.content}
        </Text>

      </View>
    );
  }
});


const styles = StyleSheet.create({
  card: {
    backgroundColor:'white',
    marginLeft:'2%',
    width:'96%',
    height:100,
    marginTop:10,
    marginBottom:0,
    borderLeftWidth:5,
    borderLeftColor:'#f5d32b'
  },
  title:{
    fontSize:17,
    marginLeft:10,
    marginTop:5
  },
  content:{
    textAlign:'center',
    fontSize:23,
    color:'#545454',
    paddingTop:'4%'
  }

});

export default MyInfoCard;
