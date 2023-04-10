import { useEffect } from "react"
import { useReducer } from "react"
import { createContext } from "react"

// const j = () => {
//     try {
//     const result = JSON.parse(localStorage.getItem("user")) || null;
//       } catch (err) {
//         // 👇️ This runs
//         console.log('Error: ', err.message);
//       }
// }

const INITIAL_STATE = {
    
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
}

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN START":
            return  {
            user: null,
            loading: true,
            error: null,
        };
        case "LOGIN SUCCESS":
            return  {
            user: action.payload,
            loading: false,
            error: null,
        };
        case "LOGIN FAILURE":
            return  {
            user: null,
            loading: false,
            error: action.payload,
        };
        case "LOGOUT":
            return  {
            user: null,
            loading: false,
            error: null,
        };
    
        default:
            return state;
    }
}



export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    },[state.user])

    return(
        <AuthContext.Provider value={{ 
            user: state.user, 
            loading: state.loading, 
            error: state.error, 
            dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}