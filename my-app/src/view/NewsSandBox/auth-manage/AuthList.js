import React, { useState,useEffect } from 'react'
import axios from'axios'


import { Table,Tag,Button,Modal,Space ,Popover,Switch} from 'antd';
import{ DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'

const { confirm } = Modal;






export default function AuthList() {

    useEffect(() => {
        axios.get("http://localhost:8000/rights?_embed=children").then(res=>{

            const list = res.data
            
            list.forEach(element => {
                if(element.children.length===0){
                    element.children=""
                }
            });

            setDataSource(list)
        })
    }, [])


    const showConfirm = (item) => {
        confirm({
          title: 'Delete',
          icon: <ExclamationCircleFilled />,
          content: 'Do you Want to delete this items?',
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
            // TODO delete the Auth: check  level 

            // console.log(item)

            if(item.grade === 1){
                setDataSource(dataSource.filter((data)=>{
                    return data.id!==item.id 
                }))
       
                axios.delete(`http://localhost:8000/rights/${item.id}`)
       
            }else{

                console.log(item.rightId)
                

                let list = dataSource.filter(data=>data.id===item.rightId)

                console.log(list)

                list[0].children = list[0].children.filter(data=>data.id!==item.id)

                setDataSource([...dataSource])
                axios.delete(`http://localhost:8000/children/${item.id}`)

            }
    }   


    const [dataSource, setDataSource] = useState([])


    let swithcMethod = (item)=>{
        item.pagepermisson = item.pagepermisson===1?0:1

        setDataSource([...dataSource])

        if(item.grde ===1){
            axios.patch(`http://localhost:8000/rights/${item.id}`,{
                pagepermisson:item.pagepermisson
            })
        }else{
            axios.patch(`http://localhost:8000/children/${item.id}`,{
                pagepermisson:item.pagepermisson
            })
        }        

    }





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


                    <Popover content={
                        <div style={{
                            textAlign:'center'
                        }}>
                            <Switch checked={
                                item.pagepermisson
                            } onChange={
                                ()=>{swithcMethod(item)}
                            }></Switch>
                        </div>
                    } title="Edit" trigger={item.pagepermisson === undefined?'':'click'}> 
                        <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={
                            item.pagepermisson === undefined
                        }></Button>
                    </Popover>
                   
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
