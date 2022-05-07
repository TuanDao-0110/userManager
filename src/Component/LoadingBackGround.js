import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

export default function LoadingBackGround() {

    const {toogleBackDrop} = useSelector(state => state.LoadingReducer)
   
    return (
        <div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={toogleBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
