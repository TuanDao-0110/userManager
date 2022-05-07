import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL_LOGOUT, TURN_OFF_BACK_GROUND, TURN_ON_BACK_GROUND } from '../ultilities/TypeServiceContanst';
import { useNavigate } from 'react-router-dom';
import { delay } from 'redux-saga/effects';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function ModalLogout() {
    const { LoadingModal } = useSelector(state => state.ModalLogoutReducer)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    return (
        <div>

            <Modal
                open={LoadingModal}
            // onClose={handleClose}

            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Stack direction="row" spacing={2}>
                            <Button disabled='true' color="error">Are You Sure To Log out ?</Button>
                            <Button variant="contained" color="success" onClick={() => {

                                dispatch({
                                    type: CLOSE_MODAL_LOGOUT
                                })
                                dispatch({
                                    type: TURN_ON_BACK_GROUND
                                })
                                navigate('/')

                                localStorage.clear()
                                setTimeout(() => {
                                    dispatch({
                                        type: TURN_OFF_BACK_GROUND
                                    })
                                }, 1000);

                            }}>
                                YES
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => {
                                dispatch({
                                    type: CLOSE_MODAL_LOGOUT
                                })

                            }}>
                                NO
                            </Button>
                        </Stack>
                    </Typography>

                </Box>
            </Modal>
        </div>
    );
}
