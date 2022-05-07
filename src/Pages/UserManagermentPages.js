import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux';

import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


import { Avatar, Image } from 'antd';
import { DEL_USER_SAGA, EDIT_FORM_REDUCER, GET_USER_LIST_SAGA, TOGGLE_EDIT_FORM } from '../ultilities/TypeServiceContanst';
import TablePagination from '@mui/material/TablePagination';




function onChange(pagination, filters, sorter, extra) {
    // console.log('params', pagination, filters, sorter, extra);
}

export default function UserManagermentPages() {

    const { listUser } = useSelector(state => state.ListUserReducer)
    const [state, setState] = useState({
        searchText: '',
        searchedColumn: ''
    });

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: GET_USER_LIST_SAGA
        })
    }, [])
    // const listUser = [
    //     {
    //         userId: 827,
    //         "name": "123123@gmail.com",
    //         "avatar": "https://ui-avatars.com/api/?name=123123@gmail.com",
    //         "email": "123123@gmail.com",
    //         "phoneNumber": "0387778722",

    //     },
    //     {
    //         userId: 850,
    //         "name": "thangedit2",
    //         "avatar": "https://ui-avatars.com/api/?name=thangedit2",
    //         "email": "11111@gmail.com",
    //         "phoneNumber": "1212121212"
    //     },
    //     {
    //         userId: 862,
    //         "name": "dgdfg",
    //         "avatar": "https://ui-avatars.com/api/?name=dgdfg",
    //         "email": "hungkun@gmail.com",
    //         "phoneNumber": "43"
    //     },
    //     {
    //         userId: 935,
    //         "name": "fetht",
    //         "avatar": "https://ui-avatars.com/api/?name=fetht",
    //         "email": "htrh@gmail.com",
    //         "phoneNumber": "57676635"
    //     },
    //     {
    //         userId: 984,
    //         "name": "RecruitmentAccount",
    //         "avatar": "https://ui-avatars.com/api/?name=RecruitmentAccount",
    //         "email": "dathoang9635@gmail.com",
    //         "phoneNumber": "0363267637"
    //     },
    //     {
    //         userId: 1024,
    //         "name": "lijo",
    //         "avatar": "https://ui-avatars.com/api/?name=lijo",
    //         "email": "lengoaingu@gmail.com",
    //         "phoneNumber": "123456"
    //     },

    // ]
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        // searchInput = node;
                        console.log(node)
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                // setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setState({ searchText: '' });
    };

    const columns = [
        {
            title: 'User Id',
            dataIndex: 'userId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')

        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            render: (text, row, index) => <Avatar src={text} />,

        },
        {
            title: 'Edit',
            dataIndex: 'userId',
            render: (text, row, index) =>

                <>
                    <button className='btn btn-success' onClick={() => {
                        dispatch({
                            type: EDIT_FORM_REDUCER,
                            user: row
                        })

                        dispatch({
                            type: TOGGLE_EDIT_FORM
                        })

                    }}>edit</button > <button className='btn btn-danger' onClick={() => {
                        dispatch({
                            type: DEL_USER_SAGA,
                            id: text
                        })
                    }}>delete</button>
                </>

        }
    ];


    return (
        <div style={{ width: '' }}>

            <Table columns={columns} dataSource={listUser} onChange={onChange}   />
       
        </div>
    )
}
