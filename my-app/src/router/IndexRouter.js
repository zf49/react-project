import React from 'react'
import { Routes,Navigate,Route } from 'react-router-dom'
import Login from '../view/login/Login'
import NewsSandBox from '../view/NewsSandBox/NewsSandBox'

import { useRoutes } from 'react-router-dom'
export default function IndexRouter() {

    

    let element = useRoutes([
        {
            path:"/",
            element:<NewsSandBox/>
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
