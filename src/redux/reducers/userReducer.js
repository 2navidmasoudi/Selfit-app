
import {
    SET_USER,
    SET_PHONE,
    SET_TOKEN_API,
    SET_TOKEN_MEMBER,
    LOCATE_USER
} from '../actions/type';

const initialState = {
    namefamilymember:null,
    mailmember:null,
    sexmember: null,
    birthdaymember:null,
    typememberid: null,
    phone: null,
    tokenmember: null,
    latval:null,
    longval:null,
    datesave:null,
    httpserver:null,
    pathserver:null,
    picmember:null,
}

export default user = (state = initialState , action = {}) => {
    switch (action.type) {
        
        case SET_USER:
            const { user } = action;
            return {
                ...state,
                namefamilymember: user.namefamilymember,
                mailmember: user.mailmember,
                sexmember: user.sexmember,
                birthdaymember: user.birthdaymember,
                typememberid: user.typememberid,
                phone : user.phone,
                datesave: user.datesave,
                httpserver: user.httpserver,
                pathserver: user.pathserver,
                picmember: user.picmember,
            }
            break;
        case SET_PHONE:
            return {
                ...state,
                phone : action.user.phone,
            }
        case SET_TOKEN_API:
            // const { user } = action;
            return {
                ...state,
                tokenapi : action.user.tokenapi
            }
            break;
        case SET_TOKEN_MEMBER:
            // const { user } = action;
            return {
                ...state,
                tokenmember : action.user.tokenmember
            }
            break;
        case LOCATE_USER:
            return {
                ...state,
                latval : action.payload.latval,
                longval : action.payload.longval,
            }
            break;
        default:
            return state;
    }
}