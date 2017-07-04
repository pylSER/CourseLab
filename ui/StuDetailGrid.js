import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Grid = React.createClass({
  getInitialState(){
    return{
      isEmpty:false,
    }
  },
  componentWillMount: function() {

        // if(typeof(this.props.gridData)=='undefined'){
        //   this.setState({isEmpty:true});
        // }
  },

  goToReadMe(){
      this.props.goToReadMe();
  },

  goToTestCase(){
      this.props.goToTestCase();
  },

  render() {

    return (
<View >

      {this.state.isEmpty &&
        <View >
          <Text style={styles.emptyText} >无数据</Text>
        </View>
      }

      {!this.state.isEmpty &&
        <View>

        <View style={styles.card}>


                <Text style={styles.scoreTitle}>得分</Text>

            <View >
                <Text style={styles.score} >100</Text>
            </View>

        </View>

        <View style={styles.card}>
            <View style={styles.box3}>
                <Icon name='check-circle' color='#30e849' style={{fontSize:70,textAlign:'center',marginTop:'10%'}}  />
                <Text style={styles.subtitle} >编译结果</Text>
            </View>

            <View style={styles.box4}>
              <TouchableOpacity onPress={this.goToTestCase} >
              <Icon name='list-alt' color='#329de2' style={{fontSize:70,textAlign:'center',marginTop:'10%'}}  />
                <Text style={styles.subtitle} >测试用例</Text>
                </TouchableOpacity>
            </View>

        </View>


        <View style={styles.card}>
            <View style={styles.box3}>
                <Text style={styles.number} >158</Text>
                <Text style={styles.subtitle} >代码行数</Text>
            </View>

            <View style={styles.box4}>
              <Text style={styles.number} >35</Text>
                <Text style={styles.subtitle} >注释行数</Text>
            </View>

        </View>


        <View style={styles.card}>
            <View style={styles.box3}>
              <Text style={styles.number} >5</Text>
                <Text style={styles.subtitle} >field 数</Text>
            </View>

            <View style={styles.box4}>
                <Text style={styles.number} >5</Text>
                  <Text style={styles.subtitle} >方法数</Text>
            </View>

        </View>


        <View style={styles.card}>
            <View style={styles.box3}>
                <Text style={styles.number} >2</Text>
                <Text style={styles.subtitle} >max_coc</Text>
            </View>

            <View style={styles.box4}>
              <TouchableOpacity onPress={this.goToReadMe} >
              <Icon name='file-text' color='#00a777' style={{fontSize:70,textAlign:'center',marginTop:'10%'}}  />
                <Text style={styles.subtitle} >ReadMe</Text>
                </TouchableOpacity>
            </View>

        </View>


        <View style={{height:90}}></View>

      </View>


      }


  </View>
    )
  }
});


const styles = StyleSheet.create({


  card: {
    width:'100%',
    marginTop:0,
    marginBottom:0,
    marginLeft:0,
    flexDirection: 'row',
    backgroundColor:'white',
    height:140
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
  },
  emptyText:{
    textAlign: 'center',
    color: 'gray',
    fontSize:20,
    marginTop:'60%',
  },
  box3:{
    flex:1,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  box4:{
    flex:1,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  box5:{
    flex:1,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  scoreTitle:{
    fontSize:15,
    marginLeft:10,
    marginTop:10
  },
  score:{
    fontSize:55,
    marginTop:35,
    marginLeft:'35%',
    marginBottom:10,
  },
  subtitle:{
    textAlign:'center',
    marginTop:'10%'
  },
  number:{
    fontSize:50,
    textAlign:'center',
    marginTop:'10%',
    fontFamily:'JUN'
  }

});

export default Grid;
