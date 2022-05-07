import React, { useContext, useEffect, useState } from 'react'
import { Drawer, Form, Input, Button, Checkbox } from 'antd';

import { useSelector, useDispatch } from 'react-redux'
import { EDIT_USER_SAGA, TOGGLE_EDIT_FORM } from '../ultilities/TypeServiceContanst';
import { Avatar } from 'antd';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
export default function EditForm() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // const [visible, setVisible] = useState(false);
    const { visible, userContent } = useSelector(state => state.EditFormReducer)
    const [state, setState] = useState({
        "id": "string",
        "passWord": "string",
        "email": "string",
        "name": "string",
        "phoneNumber": "string"
    })

    const dispatch = useDispatch()

    const showDrawer = () => {

    };
    const onClose = () => {
        dispatch({
            type: TOGGLE_EDIT_FORM
        })
    };

    useEffect(() => {
        setState(
            (state) => {

                return { ...state, id: userContent.userId, name: userContent.name, email: userContent.email, phoneNumber: userContent.phoneNumber }
            }
        )
    }, [userContent])
   




    
 
    return (
        <>
            {/* <Button type="primary" onClick={showDrawer}>
                Open
            </Button> */}


            <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                <Avatar size={64} src={`${userContent.avatar}`} />
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 5, width: '35ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="Id"
                        label='User Id'
                        maxRows={4}
                        disabled
                        value={`${state.id}`}
                    />
                    <TextField
                        id="Name"
                        label='Name'
                        maxRows={4}
                        value={state.name}
                        onChange={(e) => {
                            setState((state) => {
                                return { ...state, name: e.target.value }
                            })
                        }}
                    />
                    <TextField
                        error={!regex.test(state.email)}
                        id="Email"
                        label='Email'
                        maxRows={4}
                        value={state.email}
                        onChange={(e) => {
                            setState((state) => {
                                return { ...state, email: e.target.value }
                            })
                        }}
                        helperText={!regex.test(state.email) ? 'Wrong Email' : ''}
                    />
                    <TextField
                        id="phoneNumber"
                        label='Phone Number'
                        maxRows={4}
                        value={state.phoneNumber}

                        onChange={(e) => {
                            setState((state) => {
                                return { ...state, phoneNumber: e.target.value }
                            })
                        }}

                    />
                    <TextField
                        id="Password"
                        label='Edit PassWord'
                        maxRows={4}
                        // value={state.phoneNumber}

                        onChange={(e) => {
                            setState((state) => {
                                return { ...state, passWord: e.target.value }
                            })
                        }}
                    />
                    <Button variant="contained" onClick={() => {

                        !regex.test(state.email) ? alert("Wrong Email") : dispatch({
                            type: EDIT_USER_SAGA,
                            newUserModel: state
                        })
                    }}>Submit Edit</Button>



                </Box>


            </Drawer >
        </>
    )
}
