import React from 'react'
import style from './Child.module.css'



export default function Child() {
    return (
        <div>
            Child

            <ul>
            <li className={style.cc}>Child-11111</li>
            <li className={style.cc}>Child-22222</li>
            </ul>

        </div>
    )
}
