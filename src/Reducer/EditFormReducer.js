import { EDIT_FORM_REDUCER, TOGGLE_EDIT_FORM } from "../ultilities/TypeServiceContanst"

const initialState = {
    visible: false,
    userContent: {
        "userId": 827,
        "name": "string",
        "avatar": "https://ui-avatars.com/api/?name=string",
        "email": "string",
        "phoneNumber": "string"
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export const EditFormReducer = (state = initialState, action) => {
    switch (action.type) {

        case TOGGLE_EDIT_FORM:
            return { ...state, visible: !state.visible }
        case EDIT_FORM_REDUCER: return { ...state, userContent: action.user }
        default:
            return state
    }
}


