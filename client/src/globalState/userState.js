import { createState, useState } from '@hookstate/core';

const userState = createState({
    isLoggedIn: false,
    userDetails: null
})

export function useUserState() {
    const state = useState(userState)

    // This function wraps the state by an interface,
    // i.e. the state link is not accessible directly outside of this module.
    // The state for tasks in TasksState.ts exposes the state directly.
    // Both options are valid and you need to use one or another,
    // depending on your circumstances. Apply your engineering judgement
    // to choose the best option. If unsure, exposing the state directly
    // like it is done in the TasksState.ts is a safe bet.        
    return ({
        get isLoggedIn() {
            return state.isLoggedIn.get()
        },
        setLoggedIn() {
            state.isLoggedIn.set(true)
        },
        setLoggedOut() {
          state.isLoggedIn.set(false)
        },
        toggleLoggedIn() {
          state.isLoggedIn.set(p => !p)
        },
        get userDetails() {
            return state.userDetails.get()
        },
        setUserDetails(user) {
            state.userDetails.set(user)
        },
        get() {
            return state.get()
        },
        set(value) {
            state.set(value)
        }
    })   
}