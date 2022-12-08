import React, { useState,useEffect } from 'react'
import axios from'axios'


import { Table,Tag,Button } from 'antd';
import{ DeleteOutlined,EditOutlined} from '@ant-design/icons'
export default function AuthList() {

    useEffect(() => {
        axios.get("http://localhost:8000/rights").then(res=>{
            setDataSource(res.data)
        })
    }, [])



    const [dataSource, setDataSource] = useState([])

      
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          render:(id)=>{
            return  <b>{id}</b>
        }
        },
        {
          title: 'TITLE',
          dataIndex: 'label',
        },
        {
          title: 'URL',
          dataIndex: 'key',
          render:(key)=>{
              return <Tag color="green">{key}</Tag>
          }
        },
        {
            title:"OPERTATION",
            render:()=>{
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />}></Button>
                    <Button type="primary" shape="circle" icon={<EditOutlined />}></Button>
                    
                </div>
            }
        }
      ];
      
    return (
        <div>
        
        
        <Table dataSource={dataSource} columns={columns}/>;


        </div>
    )
}
