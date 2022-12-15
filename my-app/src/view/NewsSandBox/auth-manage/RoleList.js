import React, { useEffect, useState } from 'react'

import {Table} from 'antd'
import axios from 'axios'


export default function RoleList() {

    const [dataSource, setDataSource] = useState([])
    const colums = []

    useEffect(() => {
        
    }, [])

    return (
        <div>
            <Table dataSource={dataSource} columns={colums}>

            </Table>
        </div>
    )
}
