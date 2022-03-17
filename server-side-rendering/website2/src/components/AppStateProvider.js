import React, { useContext, useReducer } from 'react'

const ReduxContext = React.createContext();

export function AppStateProvider({ initState, reducers, children }) {
    const value = useReducer(reducers, initState);

    return (
        <ReduxContext.Provider value={value}>
            {children}
        </ReduxContext.Provider>
    )
}

export function useAppState() {
    return useContext(ReduxContext)
}