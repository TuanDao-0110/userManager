import { NAVIGATOR } from "../ultilities/TypeServiceContanst"

const initialState = {
    navigator
}

export const NavigatorReducer = (state = initialState, action) => {
    switch (action.type) {

        case NAVIGATOR:
          
            return { ...state, navigator: action.navigator }

        default:
            return state
    }
}
