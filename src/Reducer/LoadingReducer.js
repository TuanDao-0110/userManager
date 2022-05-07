import { TURN_ON_BACK_GROUND, TURN_OFF_BACK_GROUND } from '../ultilities/TypeServiceContanst'



const initialState = {
    toogleBackDrop: false
}

export const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {

        case TURN_ON_BACK_GROUND:
            return { ...state, toogleBackDrop: true }
        case TURN_OFF_BACK_GROUND:
            return { ...state, toogleBackDrop: false }
        default:
            return state
    }
}
