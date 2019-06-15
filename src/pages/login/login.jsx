import React from 'react'
import {  Form,  Icon, Input, Button, } from 'antd'
import logo from "./images/logo.png";
import './login.less'

const Item = Form.Item

/* 
登陆的一级路由组件
*/
 class Login extends React.Component {

  handleSubmit = (event) => {
    // 阻止默认行为
    event.preventDefault()
    //统一验证表单
    this.props.form.validateFields((err,values)=>{
     if(!err){
      //  const{username,password} = values
       console.log('登录Ajxs请求',values)
     }else{
       console.log(err)
     }
    })

   //收集数据
    // const username = this.props.form.getFieldValue('username')
    // const password = this.props.form.getFieldValue('password')
    // const value = this.props.form.getFieldValue()
    // console.log('用户名'+username,password,value)
  }
  validatePwd = (rule,value,callback) =>{
    value = value.trim()
    if(!value){
      callback('密码不能为空')
    }else if(value.lenght < 4){
      callback('密码长度小于4位')
    }else if(value.lenght>12){
      callback('密码长度大于12位')
    }else if(!/^[a-zA-Z0-9]+$/.test(value)){
       callback('密码必须是英文、数字组成')
    }else{
      callback()
    }
 
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">

            {/* 用户名 */}
            <Item>
              {
                getFieldDecorator('username',{
                  rules:[{ required: true, message: '用户名不能为空' },
                  {min:4,message:'用户名小于4位'},
                  {max:12,message:'用户名大于12位'},
                  {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须英文、数字、下划线组成'}
                ],
                })(

                  <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
                )
              }
            </Item>

            {/* 密码输入 */}
            <Form.Item>
              {
                getFieldDecorator('password',{
                  rules:[
                    {validator:this.validatePwd}
              ]
                //   rule:[{required:true,message:'密码不能为空'},
                //   {min:4,message:'密码不能小于4位'},
                //   {max:4,message:'密码不能大于12位'},
                //   {pattern:/^[a-zA-Z0-9]+$/,message:'密码必须由英文数字组成'}
                // ]
                })(
                  <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
                )
              }
            
            </Form.Item>
            
            {/* 登录按钮 */}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登 陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

const WrapperLogin = Form.create()(Login)
export default WrapperLogin
