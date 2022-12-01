import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';

import axios from 'axios'



export default function Home() {


    let testJsonServer = ()=>{
            // get data
            // axios.get("http://localhost:8000/posts").then(res=>{console.log(res.data)})


            // post data
            // axios.post("http://localhost:8000/posts", {  "title": "3333", 
            // "author": "AAAA" }
            // ).then(res=>{
            //     console.log(res.data)
            // })



            // update data
            //replacement update
            // axios.put("http://localhost:8000/posts/1",{
            //     title:"11111-update"
            // }).then(res=>{console.log(res.data)})

            // patch update
            // axios.patch("http://localhost:8000/posts/1",{
            //     title:"111111-patch update"
            // }).then(res=>{console.log(res.data)})


            // delete
            // axios.delete("http://localhost:8000/posts/1").then(res=>{console.log(res.data)})



            // advanced opration _embed
            // get down data

             //    axios.get("http://localhost:8000/posts?_embed=comments").then(res=>{console.log(res.data)})


            // advanced opration _expand
            // get up data    
        
            axios.get("http://localhost:8000/comments?_expand=post").then(res=>{console.log(res.data)})



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
