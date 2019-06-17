
import React from 'react'
import ReactDOM from 'react-dom'
import'./api'

import App from './App' // 自定义的模块引入必须以.开头
import memoryUtils from './utils/memoryUtils';

const user= JSON.parse(localStorage.getItem('USER-KEY') || '{}')
memoryUtils.user = user

ReactDOM.render( < App /> , document.getElementById('root'))