import React, { forwardRef, useEffect, useState } from 'react'



import {Form, Input, Select} from 'antd';

const { Option } = Select;


  const Userform = ({ form,regionList,roleList,item}) => {



  useEffect(() => {
    form.setFieldsValue(item)

    if(item?.roleId === 1){
      setisDisable(true)
      form.setFieldsValue({
        region:""
      })
    }
   
}, [])



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
          <Input
          //  defaultValue={typeof(username)!=undefined?username:''}
            // value="123"
           />
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
          placeholder="select your region"
         
          >

              {regionList.map(item=><Option value={item.value} key={item.id}>{item.title}</Option>)} 
             
             
          </Select>
        </Form.Item>

        <Form.Item 
              name="roleId" 
              label="Role"  
              rules={[
                  {
                      required: true,
                      message: 'Please select role!',
                  },
              ]}

            
        >
          <Select
          
          placeholder="select your role"

          onChange={(value)=>{
            
            if(value === 1){
              setisDisable(true)
              form.setFieldsValue({
                region:""
              })
            }else{
              setisDisable(false)

            }
           
          }}
          >

              {roleList.map(item=><Option value={item.id} key={item.id}>{item.roleName}</Option>)} 
             
             
          </Select>
        </Form.Item>



      </Form>
    )
}

export default Userform