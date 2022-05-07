import React, { useRef, useState } from 'react'
import { } from 'formik';
import { Form, Input, Checkbox, Select, } from 'antd';
import Button from '@mui/material/Button';
import { useDispatch, } from 'react-redux';
import { SIGN_IN_SAGA, SIGN_UP_SAGA } from '../ultilities/TypeServiceContanst';
import { SIGN_IN, SIGN_UP } from '../ultilities/SettingSystem';
const { Option } = Select;

export default function LoginInputComponent(props) {
    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');


    // const { listUser } = useSelector(state => state.ListUserReducer)
    const dispatch = useDispatch()
    const [state, setState] = useState()
    const onFinish = (values) => {

        // console.log('Success:', values);
        if (state === SIGN_UP) {
            

            regex.test(values.email) ? dispatch({
                type: SIGN_UP_SAGA,
                userModel: values

            }) : alert('Wrong email')


        } else {
            dispatch({
                type: SIGN_IN_SAGA,
                userModel: {
                    email: values.email,
                    passWord: values.password
                }
            })
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);



    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
        >
            <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: state == SIGN_UP ? true : false, message: 'Please input your name to Sign Up' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: state == SIGN_UP ? true : false, message: 'Please input your phone number!' }]}
            >
                <Input type='text/number' style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" typeof='submit' onClick={() => {
                    setState(SIGN_UP)

                }}>
                    Sign Up
                </Button>
                <Button type="primary" typeof='submit' onClick={() => {
                    setState(SIGN_IN)
                }}>
                    Sign In
                </Button>
            </Form.Item>
        </Form>
    )
}
