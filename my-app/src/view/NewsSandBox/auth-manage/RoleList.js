import React, { useEffect, useState } from 'react'

import {Table,Button,Modal,Tree} from 'antd'
import{ DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'


import axios from 'axios'
const { confirm } = Modal;


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
                        <Button danger shape="circle" icon={<DeleteOutlined />} onClick={()=>{
                            showConfirm(item)
                        }}></Button>


                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={showModal}></Button>

                        </div>
                   
            }
        }
    
    
    ]

    // tree modal opreate
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
      };
      const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        
      };



    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);

        // TODO : interact with backend to sync the selected items 







      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };


    const showConfirm = (item) => {
        confirm({
          title: 'Delete',
          icon: <ExclamationCircleFilled />,
          content: 'Do you Want to delete this item?',
          onOk() {
            console.log('OK');
            deletemethod(item)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

      const deletemethod = (item)=>{
          
            setDataSource(dataSource.filter((data)=>{
                return data.id!==item.id 
            }))
            axios.delete(`http://localhost:8000/roles/${item.id}`)
}  

const [roleRights, setRoleRights] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/roles').then(res=>{
            // console.log(res.data)

            setDataSource(res.data)
        })
    }, [])


    useEffect(() => {
        axios.get('http://localhost:8000/rights?_embed=children').then(res=>{
            console.log(res.data)

            setRoleRights(res.data)

        })
    }, [])




    return (
        <div>
            <Table dataSource={dataSource} columns={colums} rowKey={
                (item)=>{
                   return item.id 
                }
            }></Table>

            <Modal title="Operation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        {/* tree modal */}
                        <Tree
                            checkable
                            
                            onSelect={onSelect}
                            onCheck={onCheck}
                            treeData={roleRights}
                        />


                        </Modal>
        </div>
    )
}
