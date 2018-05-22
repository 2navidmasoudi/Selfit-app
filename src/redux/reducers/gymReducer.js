import {
    RECEIVE_GYM, INCREMENT_GYM_MIN, DECREMENT_GYM_MIN, REFRESH_GYM, TOKEN_GYM, INCREMENT_MIN, DECREMENT_MIN
} from "../actions/type";

const initialState = {
    GymList: [],
    min:0,
    tokenapi:null
};

export default gym = (state = initialState , action = {}) => {
    switch (action.type) {
        
        case RECEIVE_GYM:
            const { gym , min } = action.payload;
            return {
                ...state,
                GymList: min === 0 ? gym : [...state.GymList,...gym],
                min
            }
            break;
        case INCREMENT_MIN:
            return {
                ...state,
                min : state.min + 10
            }
            break;
        case DECREMENT_MIN:
            return {
                ...state,
                min : state.min - 10
            }
            break;
        case REFRESH_GYM:
            return {
                ...state,
                min : 0,
            }
            break;
        case TOKEN_GYM:
            return {
                ...state,
                tokenapi: action.tokenapi,
            }
            break;
        default:
            return state;
    }
}