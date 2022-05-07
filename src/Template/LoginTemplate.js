import React from 'react'
import { Layout } from 'antd';
import LoginInputComponent from '../Pages/LoginPages';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



export default function LoginTemplate(props) {

    return (
        <div className='row w-100'>

            <div className='col-6' style={{ height: window.innerHeight, background: 'url(https://picsum.photos/2000) no-repeat center 100%' }}>
            </div>
            <div className='col-6 p-0' style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: window.innerHeight / 3, width: '70%', marginLeft: 'auto' }}>
                    <LoginInputComponent></LoginInputComponent>
                </div>
            </div>
        </div>
    )
}
