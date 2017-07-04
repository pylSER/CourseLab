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
        <View >
          <Text style={styles.title} >{this.props.title}</Text>
        </View>

<View style={styles.address}>
  <Text style={styles.content} >{this.props.content}</Text>
</View>


  </View>
    );
  }
});


const styles = StyleSheet.create({


  card: {
    width:'100%',
    marginTop:10,
    marginBottom:20,
    marginLeft:15
  },
  title:{

    fontSize:15,
    color:'#242424',

  },
  content:{
    marginRight:20,
    fontSize:17,
    color:'#b4b4b4',
  },
  address:{
    marginTop:10
  }

});

export default MyInfoItem;
