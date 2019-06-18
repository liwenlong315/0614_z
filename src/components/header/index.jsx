/* 
Admin头部界面
*/

import React, { Component } from 'react'
import './index.less'
import {withRouter} from 'react-router-dom'
import {formateDate} from '../../utils/dataUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils';
import  {removeUser} from '../../utils/storageUtils'
import { reqWeather } from '../../api';
import { Modal } from 'antd'
import Linkbutton from '../../components/link-button'
import LinkButton from '../../components/link-button';


class Header extends Component {

  static propTypes ={}

//初始化状态
state = {
  currentTime:formateDate(Date.now()), //当前时间字符串
  dayPictureUrl:'',//天气图片的url
  weather:'', //天气文本
}

showCurrentiem =()=> {
  setInterval(()=>{
    const currentTime = formateDate(Date.now())
    this.setState({
      currentTime
    })
  },1000);
}

   getTile =()=>{
     const path = this.props.location.pathname
     let title=''
     menuList.forEach(item =>{
       if(item.key === path){
         title = item.title
       }else if(item.children){
        const cItem = item.children.find(item=>item.key === path)
         if(cItem){
            title = cItem.title
         }
       }
     })
      return title
   }
 
   getWeather = async () =>{
     const {dayPictureUrl,weather} = await reqWeather('北京')
        this.setState({
          dayPictureUrl,
          weather
        })
   }
 
logout =()=> {
   //显示确认框
   Modal.confirm({
    title: '你确定要退出吗?',
    onOk:()=> {
      console.log('确定');
      //清除保存user
       removeUser()
       memoryUtils.user = {}
      //跳转登录
      this.props.history.replace('/login')
    },
    onCancel() {
      console.log('取消');
    },
   })
}


//在组件即将销毁之前做收尾工作：清除定时器
componentWillUnmount(){
 clearInterval(this.itervalId)
}

 componentDidMount(){
   //每隔1s更新时间显示
   this.showCurrentiem()
   //获取天气
   this.getWeather()
   
 }


  render() {
   const {currentTime,dayPictureUrl,weather} = this.state
     
   const {user} =memoryUtils
   const title = this.getTile()

    return (
      <div className="header">
        <div className="header-top">
        <span>欢迎,{user.username}</span>
        {/* <a href="#" onClick={this.logout}>退出</a> */}
        <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
       
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
          <span>{currentTime}</span>
          {!!dayPictureUrl && <img src={dayPictureUrl} alt="weather"/>}
          <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)