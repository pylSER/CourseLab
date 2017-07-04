import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TouchableOpacity
} from 'react-native';
import IconBadge from 'react-native-icon-badge';
import Icon from 'react-native-vector-icons/FontAwesome';

const MissionIcon = React.createClass({
  getInitialState(){
    return{

      hasNew:false,
      count:1,

    }
  },


  componentWillMount: function() {
    if(this.checkNew()){
      this.setState({hasNew:true});
      this.setState({count:2});
    }else{
      this.setState({hasNew:false});
    }
  },
  checkNew(){

    if(this.state.count==1){
        return true;
    }else{
      return false;
    }


  },


  render() {

    return (
      <View>

{this.state.hasNew &&
  <IconBadge
         MainElement={
           <View style={{marginLeft:3}}>
          <Icon name='tasks' color='#848484' style={{fontSize:17,marginTop:4}}/>
          </View>
         }

         IconBadgeStyle={
           {width:9,
           height:9,
           right:0,
           top:0,
           backgroundColor: 'red'}
         }
  />
}


     {!this.state.hasNew &&
       <Icon name='tasks' color='#848484' style={{fontSize:19}}/>
     }

   </View>

    );
  }
});


export default MissionIcon;
