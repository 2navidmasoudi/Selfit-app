import { 
    RECEIVE_BUFFET,
    INCREMENT_MIN,
    DECREMENT_MIN, 
    REFRESH_BUFFET,
    TOKEN_BUFFET,
    RECIEVE_MENUFOOD,
    SELECT_BUFFET,
    RECIEVE_MATERIAL
    
} from "../actions/type";

const initialState = {
    BuffetList: [],
    min:0,
    tokenapi:null,
    buffetid:null,
    MenuFood: [],
    Material: [],
};

export default buffet = (state = initialState , action = {}) => {
    switch (action.type) {
        
        case RECEIVE_BUFFET:
            const { buffet , min } = action.payload;
            return {
                ...state,
                BuffetList: min === 0 ? buffet : [...state.BuffetList,...buffet],
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
        case REFRESH_BUFFET:
            return {
                ...state,
                min : 0,
            }
            break;
        case TOKEN_BUFFET:
            return {
                ...state,
                tokenapi: action.tokenapi,
            }
            break;
        case SELECT_BUFFET:
            return {
                ...state,
                buffetid: action.buffetid,
            }
            break;    
        case RECIEVE_MENUFOOD:
            return {
                ...state,
                MenuFood: action.MenuFood,
            }
            break;
        case RECIEVE_MATERIAL:
            return {
                ...state,
                Material: action.Material,
            }
            break;
        default:
            return state;
    }
}