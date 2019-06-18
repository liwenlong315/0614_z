//包含n个接口请求函数的模块
//根据接口文档编写
//调用自定义ajax请求函数请求
//每个函数的返回值都是Promise对象
import jsonp from 'jsonp'
import ajax from "./ajax";
import { message } from 'antd';
const BASE = ''

//1.登录
// export function reqLogin(username,password){
//     ajax(BASE+ '/login',{username,password},'POST')
// }
export const reqLogin = (username,password) => ajax(BASE+ '/login',{username,password},'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE+'/manage/user/add',user,'POST')

//获取分类列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {parentId})


//测试
// reqLogin('admin','admin').then(result =>{
//     console.log('result',result)
// })

export const reqWeather =(location)=>{
    const url =  `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve,reject) => {
      setTimeout(()=>{
        
        jsonp(url,{},(error,data)=>{
            if(!error && data.status ==='success'){
                const {dayPictureUrl,weather }
                = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                message.error('获取天气信息！')
            }
        })

      },2000)
    })
 
}