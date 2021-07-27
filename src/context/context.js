import React, { useReducer, createContext, useContext } from 'react';

import { initialState, reducer } from './reducer';

const UserStateContext = createContext();
const UserDispatchContext = createContext();

export const useAuthState = ( ) => {
    
    const context = useContext(UserStateContext);

    if (context === undefined) {
		throw new Error('useAuthState must be used within a AuthProvider');
	}

	return context;
}

export const useAuthDispatch = ( ) => {

    const context = useContext(UserDispatchContext);


    if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}

	return context;
}

export const UserContextApi = ({children}) => {
    
    const [ user, dispatch ] = useReducer(reducer, initialState);
    
    return (
        <UserStateContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    )
}