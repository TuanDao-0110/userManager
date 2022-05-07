import { all } from 'redux-saga/effects'
import * as userSaga from './UserSeriveSaga'
export function* rootSaga() {
    yield all([
        userSaga.trackingSingUpServiceSaga(),
        userSaga.TrackingSignInServiceSaga(),
        userSaga.trackingGetUserSaga(),
        userSaga.trackingEditUserSaga(),
        userSaga.trackingDeleteUserSaga(),
    ])
}