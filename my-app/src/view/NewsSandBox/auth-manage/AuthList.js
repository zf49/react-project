import React, { useState,useEffect } from 'react'
import axios from'axios'


import { Table,Tag,Button,Modal,Space } from 'antd';
import{ DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'

const { confirm } = Modal;






export default function AuthList() {

    useEffect(() => {
        axios.get("http://localhost:8000/rights?_embed=children").then(res=>{

            const list = res.data
            list[0].children = ""

            setDataSource(list)
        })
    }, [])


    const showConfirm = (item) => {
        confirm({
          title: 'Delete',
          icon: <ExclamationCircleFilled />,
          content: 'Do you Want to delete this items?',
          onOk() {
              // TODO delete the Auth 
            console.log('OK');
            deletemethod(item)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

    const deletemethod = (item)=>{
            console.log(item)
    }   


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
            render:(item)=>{
                return <Space wrap>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={()=>{
                        showConfirm(item)
                    }}></Button>
                    <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>{
                        console.log("Test123123123")
                        
                    }}></Button>
                </Space>
            }
        }
      ];

    return (
        <div>
        
        <Table dataSource={dataSource} columns={columns} pagination={{
            pageSize:15
        }}/>;

        </div>
    )
}
