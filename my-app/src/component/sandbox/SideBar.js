import React, { useEffect, useState } from 'react'
import './index.css'
import axios from'axios'

import { useNavigate,useLocation,useParams } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
    AppstoreOutlined, MailOutlined, SettingOutlined,
    HomeOutlined,
    UserOutlined ,
    AuditOutlined ,
    SafetyCertificateOutlined,
    BookOutlined,
    FileTextOutlined
  } from '@ant-design/icons';

const {  Sider } = Layout;


const iconList = {
  "Home":<HomeOutlined />,
  "User Management":<UserOutlined />,
  "Right Management":<SafetyCertificateOutlined />,
  "News Management":<BookOutlined />,
  "Audit Management":<AuditOutlined />,
  "Publish Management":<FileTextOutlined />,
}





export default function SideBar(props) {

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  // use

    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()

    const [menu, setMenu] = useState([])

    // check the option whether can render on menu, there is a field name "pagepermisson". if pagepermisson is 1, the option will render on sidemenu
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
        // console.log(res.data)
        const items = [];
        res.data.map((item)=>{

              if(item.children.length===0){
                items.push(getItem(item.label,item.key,iconList[item.label],undefined))
              }else{
                items.push(getItem(item.label,item.key,iconList[item.label],checkPermission(item.children)))
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

      let location =  useLocation()
      const selectKeys = [location.pathname]
      const openKeys = ["/"+location.pathname.split("/")[1]]
      
    return (
        <Sider trigger={null} collapsible collapsed={false} width={300} >
          <div>
            <div className="logo">Golbal News Admin System</div>
            <div>
                  <Menu 
                    defaultOpenKeys={openKeys}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={selectKeys}
                    items={menu}
                    onClick={onClick}
                  />
            </div>
          </div>
      </Sider>
    )
}
