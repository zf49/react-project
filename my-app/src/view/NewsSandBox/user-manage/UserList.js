import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { Table,Tag,Modal,Space ,Popover,Switch, Button, Checkbox, Form, Input,Radio, Select} from 'antd';
import{ DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'

import Userform from '../../../component/user-manage/Userform';
const { Option } = Select;



export default function UserList() {
    const { confirm } = Modal;
    const [loading, setloading] = useState(false)

    const [dataSource, setDataSource] = useState()
    const [roleList, setRoleList] = useState([])
    const [regionList, setRegionList] = useState([])

    useEffect(() => {
        
        axios.get("http://localhost:8000/users?_expand=role").then(res=>setDataSource(res.data))

        },[])

    useEffect(() => {
           axios.get('http://localhost:8000/regions').then(res=>setRegionList(res.data))
        }, [])

    useEffect(() => {
            axios.get("http://localhost:8000/roles").then(res=>setRoleList(res.data))
        },[])
        

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
          key:'role',
          render:(role)=>{
           return <span>{role?.roleName}</span>
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
            
            let checked = roleState
           
            const onChange = (checked) => {
                // console.log(`switch to ${checked}`,item.id);

                checked = !checked

                axios.patch(`http://localhost:8000/users/${item.id}`,{
                    "roleState":!roleState
                })

        
              };
                

              return <Switch defaultChecked={checked} loading={loading} disabled={item.default} onChange={onChange}></Switch>


          }
        },
        {
            title:"OPERTATION",
            render:(item)=>{
                return <Space wrap>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={()=>{
                        showConfirm(item)
                    }} disabled={item.default}></Button>


                    
                        <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default} onClick={
                            ()=>{
                                handleEdit(item)
                                
                            }
                        }></Button>

                   
                </Space>
            }
        }
      ];


      const handleEdit = (item)=>{
        setEditOpen(true)
        setEditItem(item)
      }




      const showConfirm = (item) => {
        confirm({
          title: 'Delete',
          icon: <ExclamationCircleFilled />,
          content: 'Do you Want to delete this users?',
          onOk() {
            console.log('OK');
            
            setDataSource(dataSource.filter(data=>data.id!=item.id))



            axios.delete(`http://localhost:8000/users/${item.id}`).then(res=>{
                console.log(res.data)
            })


          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }



      const CollectionEditForm = ({ open, onEdit, onCancel,item }) => {
        const [form] = Form.useForm();
        return (
          <Modal
            open={open}
            title="Change user Info"
            okText="Chnage"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {

              form
                .validateFields()
                .then((values) => {
                    console.log(values)

                  form.resetFields();

                  onEdit(values,item.id);

                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
          >

          <Userform regionList={regionList} roleList = {roleList} form = {form} item={item}/>

          </Modal>
        );
      };




    const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
          <Modal
            open={open}
            title="Create a new User"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  onCreate(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
          <Userform regionList={regionList} roleList = {roleList} form = {form}/>
          </Modal>
        );
      };

      const [open, setOpen] = useState(false);
      const [editopen, setEditOpen] = useState(false);

      const [editItem, setEditItem] = useState()


      const onCreate = (values) => {
        // console.log('Received values of form: ', values);

        // TODO post to backend
        if(values.roleId
            === 1){
            values.region='Global'
        }
        axios.post(`http://localhost:8000/users`,{
            ...values,
            'roleState':true,
            'default':false  
        }).then(
            res=>{
               setDataSource([...dataSource,{
                   ...res.data,
                   role:roleList.filter(item=>item.id===values.roleId)[0]
               }])
      }
            // axios.get("http://localhost:8000/users?_expand=role").then(res=>setDataSource(res.data))
        
        )
        setOpen(false);
      };
      
      const onEdit = (values,id) => {
        console.log('Received values of form: ', values,id);

        axios.patch(`http://localhost:8000/users/${id}`,{
            ...values
        }).then(res=>{   
           axios.get("http://localhost:8000/users?_expand=role").then(res=>setDataSource(res.data))
            console.log(res.data) 
        })



        setEditOpen(false);
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
            />
         
      
         <CollectionEditForm
                open={editopen}
                onEdit={onEdit}
                onCancel={() => {
                setEditOpen(false)
                }} 

                item = {editItem}

            />


            <Table columns={columns} dataSource={dataSource} 
            rowKey={item=>item.id}/>
        </div>
    )
}
