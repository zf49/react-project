
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';


import { Layout, Menu,Dropdown, Space ,Avatar } from 'antd';
const { Header, Sider, Content } = Layout;



export default function TopBar(props) {

  const navigate = useNavigate();



    const [collapsed, setCollapsed] = useState(false)

    let changeCollapse = ()=>{
            setCollapsed(!collapsed)
    }

    const [name, setName] = useState('')


      useEffect(() => {
       setName(localStorage.getItem('token'))
      }, [])


    const items = [
        {
          key: '1',
          label: name
        },
        {
            key: '4',
            danger: true,
            label: 'Login Out',
            onClick: ()=>{
              console.log(props)
              localStorage.removeItem("token")
              navigate('/login')
            } 
          },
      ];




    return (
        <Header
        className="site-layout-background"
        style={{
          padding: '0 24px'
        }}
      >
       
            {collapsed?<MenuUnfoldOutlined onClick={()=>{
                changeCollapse()
            }}/>:<MenuFoldOutlined onClick={()=>{
                changeCollapse()
            }}/>}


            <div style={{
                float:'right'
            }}>
                <span>Welcome {} back! </span>

                <Dropdown
                    menu={{items}}>

                    
                    <Space>
                        
                        <Avatar size='large' icon={<UserOutlined />} />
                    </Space>
                </Dropdown>



            </div>
            

      </Header>
    )
}








