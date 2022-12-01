import React, { useEffect, useState } from 'react'
import './index.css'
import axios from'axios'
import ReactHtmlParser from 'html-react-parser';
import { useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
    AppstoreOutlined, MailOutlined, SettingOutlined,
    HomeOutlined
  } from '@ant-design/icons';

const {  Sider } = Layout;

export default function SideBar() {


  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()

    const [menu, setMenu] = useState([])
    const items = [];
    const itemChildren = undefined

    const checkPermission = (children)=>{

      const newChild = []
      children.map((item)=>{
        
          if (item.pagepermisson === 1){
            newChild.push(item)
          }
      })
      return newChild
    }

    useEffect(() => {
      
      axios.get("http://localhost:8000/rights?_embed=children").then(res=>{
        console.log(res.data)
          
        res.data.map((item)=>{

              if(item.children.length===0){
                items.push(getItem(item.label,item.key,null,undefined))
              }else{
                items.push(getItem(item.label,item.key,item.icon,checkPermission(item.children)))
              }
            

          
        })
        setMenu(items)
        // console.log(menu)

      })

    }, [])

      
    


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
          items={menu}
          onClick={onClick}

        //   defaultOpenKeys={['sub1']}
          
        />
      </Sider>
    )
}
