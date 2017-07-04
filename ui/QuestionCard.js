import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const QuestionCard = React.createClass({
  getInitialState(){
      return{
        isArchieved:true,
        description:'无描述',
        avg:0,
      }
  },

  change(){
      this.setState({isArchieved:!this.state.isArchieved });
  },


  goToGit(){
    var url=this.props.questionData.gitUrl;
    Linking.canOpenURL(url).then(supported => {
  if (!supported) {
    console.log('Can\'t handle url: ' + url);
  } else {
    return Linking.openURL(url);
  }
    }).catch(err => console.error('An error occurred', err));
  },


  getAvg(){
    var len=this.props.scoredata.length;

    var sum=0;
    for(var i= 0;i<len;i++){
      sum+=this.props.scoredata[i].score;
    }


    console.log(sum);
    console.log(len);

    var avg=sum/len;




    this.setState({avg:avg.toFixed(2)});




  },


  componentWillMount: function() {
    if(this.props.questionData.description){
        this.setState({description:this.props.questionData.description });
    }


    this.getAvg();

  },

  render() {

    return (
<View>
          {this.state.isArchieved &&

            <View style={{height:40,backgroundColor:'#025ca6'}}>
              <TouchableOpacity
                onPress={this.change}
                >
              <Text style={styles.forMore}>展开题目 <Icon name='angle-double-down' color='white' style={{fontSize:15}} /></Text>

                </TouchableOpacity>
            </View>


          }



          {(!this.state.isArchieved) &&


            <View style={{height:215,backgroundColor:'#025ca6'}}>


              <View style={styles.card}>
            <View style={styles.box1}>
              <Text style={styles.content} >{this.props.questionData.title}</Text>

            </View>
            <View style={styles.box2}>
              <TouchableOpacity
                onPress={this.goToGit}
                >
                <Text style={styles.git} ><Icon name='gitlab' style={styles.git} /> 访问git</Text>

                  </TouchableOpacity>

            </View>
            </View>
<ScrollView  ref='scroll' keyboardShouldPersistTaps="always" >
              <View style={styles.card}>
                <Text style={styles.description} >{this.state.description}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.diffculty} >难度系数: {this.props.questionData.difficulty}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.content1} >类型: {this.props.questionData.type}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.content1} >创建者: {this.props.questionData.creator.name}</Text>
              </View>

            </ScrollView>

              <View style={styles.card}>

            <View style={styles.box1}>
              {this.props.isShowAvg &&
                <Text style={styles.avg} >平均分：{this.state.avg}</Text>
              }


            </View>
            <View style={styles.box2}>
              <TouchableOpacity
                onPress={this.change}
                >
                <Text style={styles.git} >收起 <Icon name='angle-double-up' style={styles.git} /></Text>

                  </TouchableOpacity>

            </View>
            </View>




            </View>



          }

        </View>
    );
  }
});


const styles = StyleSheet.create({

  box1: {
  flex:1,
  marginLeft:15,
},
box2: {
  flex:1,
  alignItems: 'flex-end',
  marginRight:15,
},

  card: {
    width:'100%',
    flexDirection: 'row',
    marginTop:5,
    marginBottom:5
  },
  forMore:{
    fontSize:17,
    color:'white',
    textAlign:'center',
    alignItems: 'center',
    justifyContent:'center',
    marginTop:'2%'
  },
  content:{
    fontSize:17,
    color:'white',
  },
  description:{
    fontSize:15,
    color:'#e4e4e4',
    fontFamily:'JUN',
    marginLeft:15,
  },
  diffculty:{
    fontSize:17,
    color:'white',
    fontFamily:'JUN',
      marginLeft:15,
  },
  content1:{
    fontSize:17,
    color:'white',
    marginLeft:15,
  },
  git:{
  fontSize:15,
  color:'#b4b4b4',

},
avg:{
  fontSize:17,
  color:'white',
  fontFamily:'JUN',
}


});

export default QuestionCard;
