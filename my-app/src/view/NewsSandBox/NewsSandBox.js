import React from 'react'
import SideBar from '../../component/sandbox/SideBar'
import TopBar from '../../component/sandbox/TopBar'

import { Outlet } from 'react-router-dom'
import './NewSandBox.css'


import { Layout, Menu} from 'antd';
let {Content} = Layout

export default function NewsSandBox() {
    return (
        <Layout>

            <SideBar></SideBar>


            <Layout className="site-layout" style={{height:"100vh"}}>
                
                <TopBar></TopBar>

                <Content
                className="site-layout-background"
                style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                overflow:"auto"
                }}
            >
                <Outlet/>
            </Content>

            </Layout>
        </Layout>

           

     
    )
}
