import React from 'react'
import {Navigate,useRoutes } from 'react-router-dom'
import NotFound from '../view/404/NotFound'
import Login from '../view/login/Login'
import Home from './../view/NewsSandBox/home/Home';
import UserList from './../view/NewsSandBox/user-manage/UserList';
import RoleList from './../view/NewsSandBox/auth-manage/RoleList';
import AuthList from './../view/NewsSandBox/auth-manage/AuthList';
import NewsSandBox from '../view/NewsSandBox/NewsSandBox'





export default function IndexRouter() {


    let element = useRoutes([
        {
            path:'/',
            element:localStorage.getItem("token")?<NewsSandBox/>:<Navigate to='/login'></Navigate>,
            children:[
                {
                    path:"home",
                    element:<Home/>
                },
                {
                    path:"user-manage/list",
                    element:<UserList/>
                },
                {
                    path:"right-manage/role/list",
                    element:<RoleList/>
                },
                {
                    path:"right-manage/right/list",
                    element:<AuthList/>
                },
                {
                    path:'*',
                    element:<NotFound/>
                }
            ]
        },
        {
            path:'/login',
            element:<Login/>
        }
    ]) 

    return (
            <>
              {element}
            </>
    )
}
