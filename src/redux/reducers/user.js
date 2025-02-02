const initialState = {
    data: null,
    token: window.localStorage.token,
    isAuth: !!window.localStorage.token
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "USER:SET_DATA":
            return {
                ...state,
                data: payload,
                token: window.localStorage.token,
                isAuth: true
            }
        case "USER:SET_IS_AUTH":
            return {
                ...state,
                isAuth: payload
            }
        default:
            return state
    }
}