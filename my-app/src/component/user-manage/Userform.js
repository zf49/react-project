import React, { useState } from 'react'



import {Form, Input, Select} from 'antd';

const { Option } = Select;


export default function Userform({ form,regionList,roleList }) {

  const [isDisable, setisDisable] = useState(false)





    return (
        <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="username"
          label="username"
          rules={[
            {
              required: true,
              message: 'Please input user name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[
            {
              required: true,
              message: 'Please input password!',
            },
          ]}>
          <Input.Password />
        </Form.Item>


        <Form.Item name="region" label="Region"  
      
        rules={isDisable?[]:[
          {
            required: true,
            message: 'Please select region!',
          }
        ]}>
          <Select 
          disabled={isDisable}
          placeholder="select your region">

              {regionList.map(item=><Option value={item.value} key={item.id}>{item.title}</Option>)} 
             
             
          </Select>
        </Form.Item>

        <Form.Item name="roleId" label="Role"  rules={[
    {
      required: true,
      message: 'Please select role!',
    },
  ]}>
          <Select 
          onChange={(value)=>{
            console.log(value)
            
            value==1?setisDisable(true):setisDisable(false)


          }}
          
          placeholder="select your role">

              {roleList.map(item=><Option value={item.id} key={item.id}>{item.roleName}</Option>)} 
             
             
          </Select>
        </Form.Item>



      </Form>
    )
}
