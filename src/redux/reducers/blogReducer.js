import { 
    INCREMENT_MIN,
    DECREMENT_MIN,
    RECEIVE_BLOG,
    TOKEN_BLOG,
    REFRESH_BLOG,

} from "../actions/type";

const initialState = {
    BlogList: [],
    min:0,
    tokenapi:null,
}

export default blog = (state = initialState , action = {}) => {
    switch (action.type) {
        
        case RECEIVE_BLOG:
            const { blog , min } = action.payload;
            return {
                ...state,
                BlogList: min === 0 ? blog : [...state.BlogList,...blog],
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
        case REFRESH_BLOG:
            return {
                ...state,
                min : 0,
            }
            break;
        case TOKEN_BLOG:
            return {
                ...state,
                tokenapi: action.tokenapi,
            }
            break;
        default:
            return state;
    }
}