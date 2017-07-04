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

const ExamListItem = React.createClass({

  getInitialState(){
      return{

        examState:'无',
        description:'无',
        startTime:'',
        endTime:'',

      }
  },
  handlePress(){
    this.props.onPress(this.props.dataitem);
  },


  componentWillMount: function() {
    var status=this.props.dataitem.status;
    if(status=='newly'){
        this.setState({examState: '新建态'});
    }else if (status=='initing') {
        this.setState({examState: '正在初始化'});
    }else if (status=='initFail') {
        this.setState({examState: '初始化失败'});
    }else if (status=='initSuccess') {
        this.setState({examState: '初始化成功'});
    }else if (status=='ongoing') {
        this.setState({examState: '考试正在进行'});
    }else if (status=='timeup') {
        this.setState({examState: '考试时间到'});
    }else if (status=='analyzing') {
        this.setState({examState: '正在分析结果'});
    }else if (status=='analyzingFinish') {
        this.setState({examState: '结果分析完毕'});
    }

    if(this.props.dataitem.description){
        this.setState({description:this.props.dataitem.description });
    }


    var start=this.props.dataitem.startAt;
    start=start.substring(0,start.length-2);
    this.setState({startTime: start});

    var stop=this.props.dataitem.endAt;
    stop=stop.substring(0,stop.length-2);
    this.setState({endTime: stop});


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
              <Text style={styles.title} >{this.props.dataitem.title}</Text>
            </View>
            <View style={styles.box2}>
              <Text style={styles.content} >{this.state.examState}</Text>
            </View>
          </View>


          <View style={styles.card}>
        <View style={styles.box1}>
          <Text style={styles.title} >描述:   <Text style={styles.description} >{this.state.description}</Text></Text>

        </View>
      </View>


      <View style={styles.card}>
    <View style={styles.box3}>
      <Text style={styles.title} >从 </Text>
    </View>
    <View style={styles.box4}>
      <Text style={styles.date} >{this.state.startTime}</Text>
    </View>

    <View style={styles.box5}>
      <Text style={styles.title} >开始</Text>
    </View>


  </View>

  <View style={styles.card}>
<View style={styles.box3}>
  <Text style={styles.title} >到 </Text>
</View>
<View style={styles.box4}>
  <Text style={styles.date} >{this.state.endTime}</Text>
</View>

<View style={styles.box5}>
  <Text style={styles.title} >结束</Text>
</View>


</View>



        </TouchableOpacity>

    );
  }
});


const styles = StyleSheet.create({
  item: {
    height:220,
  },

    box1: {
    flex:1,
    marginLeft:15,
  },
  box2: {
    flex:1,
    alignItems: 'flex-end'
  },


  box3:{
    flex:0.5,
    marginLeft:15,
    marginRight:15
  },
  box4:{
    flex:4,
  },
  box5:{
    flex:1,
    alignItems: 'flex-end',
    marginRight:20
  },

    card: {
      width:'100%',
      flexDirection: 'row',
      marginTop:20,
      marginBottom:5
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
    },
    description:{
      fontFamily:'JUN',
      fontSize:17,
      color:'#5a5a5b',
    },
    date:{
      fontFamily:'JUN',
      marginRight:20,
      fontSize:17,
      color:'#61738b',
      textAlign:'center'
    },
});


export default ExamListItem;
