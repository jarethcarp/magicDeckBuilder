const inittalState = {
    isLoggedIn: false
}

const reducer = (state = inittalState, action) => {
    switch (action.type) {
        case "USER_LOGOUT":
            console.log("User Logged out")
            return {
                ...state,
                isLoggedIn: false
            }

        case "USER_LOGIN":
            console.log("The User logged in")
            return {
                ...state,
                isLoggedIn: true
            }

        default:
            console.log("Default")
            return state
    }
}

export default reducer