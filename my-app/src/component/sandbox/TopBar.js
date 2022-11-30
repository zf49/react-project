import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;


export default function TopBar() {

    const [collapsed, setCollapsed] = useState(false)


    return (
        <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      >
       
            {collapsed?<MenuUnfoldOutlined/>:<MenuFoldOutlined/>}


      </Header>
    )
}
