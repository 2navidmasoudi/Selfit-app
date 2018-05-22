import { 
    RECEIVE_PRODUCT, 
    INCREMENT_MIN,
    DECREMENT_MIN,
    REFRESH_PRODUCT,
    TOKEN_STORE,

} from "../actions/type";

const initialState = {
    ProductList: [],
    min:0,
    tokenapi:null,
};

export default store = (state = initialState , action = {}) => {
    switch (action.type) {
        
        case RECEIVE_PRODUCT:
            const { product , min } = action.payload;
            return {
                ...state,
                ProductList: min === 0 ? product : [...state.ProductList,...product],
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
        case REFRESH_PRODUCT:
            return {
                ...state,
                min : 0,
            }
            break;
        case TOKEN_STORE:
            return {
                ...state,
                tokenapi: action.tokenapi,
            }
            break;
        default:
            return state;
    }
}