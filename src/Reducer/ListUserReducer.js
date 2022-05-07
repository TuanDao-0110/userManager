import { GET_USER_LIST_REDUCER, LIST_USER_REDUCER } from "../ultilities/TypeServiceContanst"

const initialState = {
    listUser: [
        
        
    ]
}

export const ListUserReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_USER_LIST_REDUCER:
            return { ...state, listUser : action.listUser}

        default:
            return state
    }
}

