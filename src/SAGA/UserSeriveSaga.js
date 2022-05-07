import { select, put, call, takeLatest, delay } from 'redux-saga/effects'
import { UserService } from '../Sevices/UserService'
import { SUCCESS, TOKEN, USER_LOGIN } from '../ultilities/SettingSystem'
import { DEL_USER_SAGA, EDIT_USER_SAGA, GET_USER_LIST_REDUCER, GET_USER_LIST_SAGA, SIGN_IN_SAGA, SIGN_UP_SAGA, TOGGLE_EDIT_FORM, TURN_ON_BACK_GROUND, TURN_OFF_BACK_GROUND } from '../ultilities/TypeServiceContanst'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';




// SAGA SIGN UP
function* signUpServiceSaga(action) {
    try {
        const { status, data } = yield call(() => UserService.signUpService(action.userModel))
        yield status === SUCCESS ? alert("Sign Up Success") : alert("Sign Up Wrong")
        yield put({
            type: TURN_ON_BACK_GROUND
        })
        yield delay(500)
        const { email, passWord } = data.content
        yield put({
            type: SIGN_IN_SAGA,
            userModel: {
                email,
                passWord
            }
        })
        yield put({
            type: TURN_OFF_BACK_GROUND
        })

    } catch (error) {

        alert(error.response.data.message)

    }
}

export function* trackingSingUpServiceSaga() {
    yield takeLatest(SIGN_UP_SAGA, signUpServiceSaga)
}

// SAGA SIGN IN
function* signInServiceSaga(action) {
    try {
        const { navigator } = yield select(state => state.NavigatorReducer)

        const { status, data } = yield call(() => UserService.signInService(action.userModel))


        yield localStorage.setItem(TOKEN, data.content.accessToken)
        yield localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))
        yield alert('Login Success')
        yield put({
            type: TURN_ON_BACK_GROUND
        })
        const id = data.content.id
        if (status === SUCCESS) return yield navigator(`/managerment/${id}`)
        yield delay(500)
        yield put({
            type: TURN_OFF_BACK_GROUND
        })
    } catch (error) {
        alert(error.response.data.message)

    }
}

export function* TrackingSignInServiceSaga() {
    yield takeLatest(SIGN_IN_SAGA, signInServiceSaga)
}
// GET USER 
function* getUserSaga(action) {
    try {
        const { data, status } = yield call(() => UserService.getUser())
        yield put({
            type: TURN_ON_BACK_GROUND
        })
        yield delay(500)
        yield put({
            type: GET_USER_LIST_REDUCER,
            listUser: data.content
        })
        yield put({
            type: TURN_OFF_BACK_GROUND
        })

    } catch (error) {
        alert(error.response.data.message)
    }
}


export function* trackingGetUserSaga() {
    yield takeLatest(GET_USER_LIST_SAGA, getUserSaga)
}
// EDIT USER
function* editUserSaga(action) {
  
    try {
        const { status, data } = yield call(() => UserService.editUser(action.newUserModel))
        yield put({
            type: TURN_ON_BACK_GROUND
        })
        yield put({
            type: GET_USER_LIST_SAGA
        })
        yield alert(`Edited user ID : ${action.newUserModel.id}`)
        yield put({
            type: TOGGLE_EDIT_FORM
        })
        yield delay(500)
        yield put({
            type: TURN_OFF_BACK_GROUND
        })

    } catch (error) {
        alert(error.response.data.message)
    }
}



export function* trackingEditUserSaga() {
    yield takeLatest(EDIT_USER_SAGA, editUserSaga)
}
// DELETE USER

function* deleteUserSaga(action) {
    try {
        const { status, data } = yield call(() => UserService.deleteUser(action.id))
        yield put({
            type: TURN_ON_BACK_GROUND
        })
        yield delay(500)
        yield put({
            type: GET_USER_LIST_SAGA
        })
        yield alert(`DELELE USER ID: ${action.id}`)
        yield put({
            type: TURN_OFF_BACK_GROUND
        })
    } catch (error) {
        alert(error.response.data.message)

    }
}



export function* trackingDeleteUserSaga() {
    yield takeLatest(DEL_USER_SAGA, deleteUserSaga)
}


