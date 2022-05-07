import { CLOSE_MODAL_LOGOUT, OPEN_MODAL_LOGOUT } from "../ultilities/TypeServiceContanst"

const initialState = {
    LoadingModal: false
}

export const ModalLogoutReducer = (state = initialState, action) => {
    switch (action.type) {

        case OPEN_MODAL_LOGOUT:
            return { ...state, LoadingModal: true }
        case CLOSE_MODAL_LOGOUT: return { ...state, LoadingModal: false }
        default:
            return state
    }
}
