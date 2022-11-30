import React, { useState } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
    AppstoreOutlined, MailOutlined, SettingOutlined
  } from '@ant-design/icons';

const {  Sider } = Layout;


function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }


  // fake data!!!, for real, using axios interact with back-end, get the data like above stracture.
  // iterate the json, like below.
  const items = [
    getItem('Home', '/home', <MailOutlined />),
    getItem('User Management', '/user-manage', <MailOutlined />, [
      getItem('User List', '/user-manage/list')
    ]),
    getItem('Authority Management', '/right-manage', <AppstoreOutlined />, [
      getItem('Role List', '/right-manage/role/list'),
      getItem('Authority List', '/right-manage/auth/list'),
      
    ])
  ];





export default function SideBar() {

    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()


    const onClick = (e) => {
        // the value e return
        // {key: '7', keyPath: Array(3), domEvent: SyntheticBaseEvent}
        // domEvent
        // : 
        // SyntheticBaseEvent {_reactName: 'onClick', _targetInst: null, type: 'click', nativeEvent: PointerEvent, target: span.ant-menu-title-content, …}
        // key
        // : 
        // "7"
        // keyPath
        // : 
        // (3) ['7', 'sub3', 'sub2']
        // item
        // : 
        // (...)
        // get item
        // : 
        // ƒ ()
        // [[Prototype]]
        // : 
        // Object

        console.log('click ', e.key);
        
        navigate(e.key)
        


      };

    return (
        <Sider trigger={null} collapsible collapsed={false} width={300} >
            
        <div className="logo">Golbal News Admin System</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          onClick={onClick}

        //   defaultOpenKeys={['sub1']}
          
        />
      </Sider>
    )
}
