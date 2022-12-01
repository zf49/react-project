import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';

import axios from 'axios'



export default function Home() {


    let testJsonServer = ()=>{
            // get data
            // axios.get("http://localhost:8000/posts").then(res=>{console.log(res.data)})

            // post data

            axios.post("http://localhost:8000/posts", {  "title": "3333", 
            "author": "AAAA" }
            ).then(res=>{
                console.log(res.data)
            })
           


    }


    return (
        <div>
            Home
           
            
            <Button type="primary" icon={<SearchOutlined />} onClick={()=>{
                testJsonServer()    
            }}>
                        Search
            </Button>

        </div>
    )
}
