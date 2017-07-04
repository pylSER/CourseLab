import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserAvatar from 'react-native-user-avatar';

const ListItem = React.createClass({

  getInitialState(){
      return{
        avatarText:'NA',
        hasAvatar:false
      }
  },
  getAvatarTextLen(text){
    return text.replace(/[\u0391-\uFFE5]/g,"a").length;
  },

    componentDidMount: function() {



      if(!this.props.avatar){
        this.setState({hasAvatar:false});
        var len=this.getAvatarTextLen(this.props.name);
        // console.log('aaaa:'+len);

        if(len>2){
          var subName=this.props.name.substring(0,1);
          this.setState({avatarText:subName});
          // console.log('avatarTXT:'+subName);
        }else {
          this.setState({avatarText:this.props.name});
        }



      }else {
        this.setState({hasAvatar:true});
      }



    },

    goToDetailItem(){
      this.props.onPress(this.props.alldata);
    },

  render() {

    return (

        <TouchableOpacity
              style={styles.item}
              activeOpacity={0.6}
              onPress={this.goToDetailItem}
              >


              <View style={styles.card}>
            <View style={styles.box1}>
              {this.state.hasAvatar &&
                <UserAvatar name={this.state.avatarText} size={50} colors={['#f69988','#f9a825','#0192eb']} src={this.props.avatar} style={styles.avatar}/>
              }

              {!this.state.hasAvatar &&
                <UserAvatar name={this.state.avatarText} size={50} colors={['#f69988','#f9a825','#0192eb']} style={styles.avatar}/>
              }
            </View>
            <View style={styles.box2}>
              <Text style={styles.name} >{this.props.name}</Text>
              <Text style={styles.content} >{String(this.props.number)}</Text>
            </View>
          </View>



        </TouchableOpacity>

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
  }
});


export default ListItem;
