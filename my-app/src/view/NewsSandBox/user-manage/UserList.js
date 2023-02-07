import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { Table,Tag,Modal,Space ,Popover,Switch, Button, Checkbox, Form, Input,Radio, Select} from 'antd';
import{ DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'
const { Option } = Select;



export default function UserList() {
    const { confirm } = Modal;


    const [dataSource, setDataSource] = useState()

    useEffect(() => {
        axios.get("http://localhost:8000/users?_expand=role").then(res=>setDataSource(res.data))
        },[])

        const [region, setRegion] = useState()
        useEffect(() => {
           axios.get('http://localhost:8000/regions').then(res=>setRegion(res.data))
        }, [])


        

    const columns = [
        {
          title: 'Region',
          dataIndex: 'region',
          key:'region',
          render: (region) => {
            return region===''? <b>{'Global'}</b>:<b>{region}</b>
            
        },
        },
        {
        title: 'Auth Name',
          dataIndex: 'role',
          key:'roleId',
          render:(role)=>{
           return <span>{role.roleName}</span>
          }
        },
        {
          title: 'Name',
          dataIndex: 'username',
          key: 'name' 
        },
        {
          title: 'Role State',
          dataIndex: 'roleState',
          key: 'roleState',
          render:(roleState,item)=>{
            
                const changeState = ()=>{

                }

              return <Switch checked={roleState} disabled={item.default} onChange={changeState}></Switch>


          }
        },
        {
            title:"OPERTATION",
            render:(item)=>{
                return <Space wrap>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={()=>{
                        showConfirm(item)
                    }} disabled={item.default}></Button>


                    
                        <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default}></Button>

                   
                </Space>
            }
        }
      ];



      const showConfirm = (item) => {
        confirm({
          title: 'Delete',
          icon: <ExclamationCircleFilled />,
          content: 'Do you Want to delete this users?',
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
          
           // TODO change it to Users

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

    
    const addNewUser = ()=>{

       // TODO add new USer


    }




    const CollectionCreateForm = ({ open, onCreate, onCancel,region }) => {
        const [form] = Form.useForm();
      
 

        return (
          <Modal
            open={open}
            title="Create a new User"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
              // TODO 添加用户


            }}
          >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: 'public',
              }}
            >
              <Form.Item
                name="Username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: 'Please input user name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="pwd" label="Password" rules={[
                  {
                    required: true,
                    message: 'Please input password!',
                  },
                ]}>
                <Input.Password />
              </Form.Item>


              <Form.Item name="region" label="Region"  rules={[
          {
            required: true,
            message: 'Please select region!',
          },
        ]}>
                <Select placeholder="select your region">

                    {region?.map((item)=>{return  <Option value={item.value}>{item.title}</Option>})}  
                   
                   
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        );
      };

      const [open, setOpen] = useState(false);
      const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setOpen(false);
      };
      
    return (
        <div>
            <Button type="primary" onClick={()=>{setOpen(true);}}>Add New User</Button>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                setOpen(false);
                }} 

                region = {region}
            />
         



            <Table columns={columns} dataSource={dataSource} pagination={{pageSize:5}}
            rowKey={item=>item.id}/>
        </div>
    )
}
