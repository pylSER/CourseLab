import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListItem = React.createClass({

  getInitialState(){
      return{

      }
  },
  handlePress(){
    this.props.onPress(this.props.id,this.props.size,this.props.name);
  },

  render() {

    return (

        <TouchableOpacity
              style={styles.item}
              activeOpacity={0.6}
              onPress={this.handlePress}
              >
              <View style={styles.card}>
            <View style={styles.box1}>
              <Text style={styles.title} >{this.props.name}</Text>
            </View>
            <View style={styles.box2}>
              <Text style={styles.content} >{this.props.size} 人</Text>

            </View>
          </View>
        </TouchableOpacity>

    );
  }
});


const styles = StyleSheet.create({
  item: {
    height:70,
  },

    box1: {
    flex:1,
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
      fontSize:18,
      color:'#242424',
    },
    content:{
      fontFamily:'JUN',
      marginRight:20,
      fontSize:17,
      color:'#5a5a5b',
    }
});


export default ListItem;
