/* 用来进行local数据存储的工具模板 */

//默认暴露
// export default {

// }


import store from 'store'

//分别暴露
//1.保存user
export function seveUser(user){
    store.set('USER-KEY',user)
}
export function getUser(){
    return store.get('USER-KEY') || {}
}
//2.删除user
export function removeUser(){
    store.remove("user")
}