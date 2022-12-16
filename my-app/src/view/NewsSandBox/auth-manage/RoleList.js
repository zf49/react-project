import React, { useEffect, useState } from 'react'

import {Table,Button} from 'antd'
import{ DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'
import axios from 'axios'


export default function RoleList() {

    const [dataSource, setDataSource] = useState([])
    const colums = [
        {
            title:'ID',
            dataIndex:'id',
            render:(id)=>{
                return <b>{id}</b>
            }
        },
        {
            title:'Role Name',
            dataIndex:'roleName'
        },
        {
            title:"OPERTATION",
            render:(item)=>{
                return <div>
                        <Button danger shape="circle" icon={<DeleteOutlined />}></Button>


                        <Button type="primary" shape="circle" icon={<EditOutlined />}></Button>
                        </div>
                   
            }
        }
    
    
    ]

    useEffect(() => {
        axios.get('http://localhost:8000/roles').then(res=>{
            console.log(res.data)

            setDataSource(res.data)

        })
    }, [])

    return (
        <div>
            <Table dataSource={dataSource} columns={colums} rowKey={
                (item)=>{
                   return item.id 
                }
            }>

            </Table>
        </div>
    )
}
