import React from 'react'

import img from './../../img/background.jpeg'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';



export default function Login() {


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  



    return (
      <div style={{
        'backgroundImage':`url(${img}) no repeat`,
        
        height:'100vh',
    
        


      }}>
        {/* {img} */}
      <div style={{
        border:'1px solid grey',
        'borderRadius':'10px',
        'padding':'2em',
        position: 'absolute',
        top: '50%',
        left: '50%',
        'transform': 'translate(-50%, -50%)',
        backgroundColor:'white'
      }}>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div style={{
        textAlign:'center',
        marginBottom:'2em'
      }}>{'Login'}</div>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item style={{
        textAlign:'center'
      }}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>

    </Form>

    </div>
    </div>
    )
}
