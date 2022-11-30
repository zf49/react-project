import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined, 
  SmileOutlined,
} from '@ant-design/icons';





import { Layout, Menu,Dropdown, Space ,Avatar } from 'antd';
const { Header, Sider, Content } = Layout;

export default function TopBar() {

    const [collapsed, setCollapsed] = useState(false)

    let changeCollapse = ()=>{
            setCollapsed(!collapsed)
    }
            

    const items = [
        {
          key: '1',
          label: "111"
        },
        {
            key: '4',
            danger: true,
            label: 'a danger item',
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
