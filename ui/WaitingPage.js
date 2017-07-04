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


});

export default MyInfoItem;
