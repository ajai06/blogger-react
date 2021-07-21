

const lStorage = JSON.parse(localStorage.getItem("currentUser"));

const initialStateValue = lStorage ? 
    { isLoggedIn: true,  user: lStorage, token : lStorage.token } : "";

export const initialState = initialStateValue ?  initialStateValue : {

    isLoggedIn : false,
    user: null,
    token: null
}

export const reducer = ( state = initialState, action) => {

    console.log(action);
    
    switch(action.type) {
        
        case  "LOGIN": 
            return {
                ...state,
                isLoggedIn : true,
                user: action.payload,
                token: action.payload.token
            };

        case "REGISTER":
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
                token: action.payload.token
            }

        case "LOGOUT" :
            return {
                ...state,
                isLoggedIn:false,
                user:"",
                token:""
            }

        default :
            return state;
         
    }
}