import React from 'react'
import SideBar from '../../component/sandbox/SideBar'
import TopBar from '../../component/sandbox/TopBar'

import { Outlet } from 'react-router-dom'

export default function NewsSandBox() {
    return (
        <div>

            <SideBar></SideBar>
            <TopBar></TopBar>
            <Outlet/>

        </div>
    )
}
