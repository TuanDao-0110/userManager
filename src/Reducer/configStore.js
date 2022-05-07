import { applyMiddleware, combineReducers, createStore } from 'redux'
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from '../SAGA/rootSaga'
import { ListUserReducer } from './ListUserReducer'
import { EditFormReducer } from './EditFormReducer'
import { NavigatorReducer } from './PushNavigatorReducer'
import { LoadingReducer } from './LoadingReducer'
import { ModalLogoutReducer } from './ModalLogoutReducer'
const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({
    ListUserReducer,
    EditFormReducer,
    NavigatorReducer,
    LoadingReducer,
    ModalLogoutReducer,
})


const store = createStore(rootReducer, applyMiddleware(middleWareSaga))
middleWareSaga.run(rootSaga)


export default store