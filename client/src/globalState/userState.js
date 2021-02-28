import { createState, useState } from '@hookstate/core';
import axios from 'axios';
import { alertState, useAlertState } from './alertState';

const userState = createState({
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null    
})

export function useUserState() {
    const state = useState(userState)
    const alertState = useAlertState();

    // This function wraps the state by an interface,
    // i.e. the state link is not accessible directly outside of this module.
    // The state for tasks in TasksState.ts exposes the state directly.
    // Both options are valid and you need to use one or another,
    // depending on your circumstances. Apply your engineering judgement
    // to choose the best option. If unsure, exposing the state directly
    // like it is done in the TasksState.ts is a safe bet.        
    return ({
        get isAuthenticated() {
          return state.isAuthenticated.get()
        },
        async register({ name, email, password }) {
          const config = {
            headers: { 'Content-Type': 'application/json' }
          };
        
          const body = JSON.stringify({ name, email, password });
        
          try {
            const res = await axios.post('/api/users', body, config);
            // userState.setAuthenticationSuccess(res.data);
            localStorage.setItem('token', res.data.token);
            state.token.set(res.data.token)
            state.isAuthenticated.set(true);
            state.isLoading.set(false);   
          } catch (err) {
            const errors = err.response.data.errors;
            if (errors) {
              errors.forEach(error => alertState.setAlert(error.msg, 'error'));
              // errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
            }
            localStorage.removeItem('token');
            state.token.set(null)
            state.isAuthenticated.set(false);
            state.isLoading.set(false);
          }
        },
        async signIn({ email, password }) {
          const config = {
            headers: { 'Content-Type': 'application/json' }
          };
        
          const body = JSON.stringify({ email, password });
        
          try {
            const res = await axios.post('/api/auth', body, config);
            // userState.setAuthenticationSuccess(res.data);
            localStorage.setItem('token', res.data.token);
            state.token.set(res.data.token)
            state.isAuthenticated.set(true);
            state.isLoading.set(false);   
          } catch (err) {
            // console.log(err.response.headers);
            const errors = err.response.data.errors;
            if (errors) {
              errors.forEach(error => alertState.setAlert(error.msg, 'error'));
              // errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
            }
            localStorage.removeItem('token');
            state.token.set(null)
            state.isAuthenticated.set(false);
            state.isLoading.set(false);
          }
        },
        async loadUser() {
          try {
            const res = await axios.get('/api/auth');
            state.isAuthenticated.set(true);
            state.isLoading.set(false);   
          } catch (err) {
            console.log(err);
            localStorage.removeItem('token');
            state.token.set(null)
            state.isAuthenticated.set(false);
            state.isLoading.set(false);
          }
        },
        signOut() {
          localStorage.removeItem('token');
          state.token.set(null);
          state.isAuthenticated.set(false);
          state.isLoading.set(false);
          state.user.set(null);
        },
        get token() {
          return state.token.get()
        },
        get user() {
            return state.user.get()
        },
        setUser(user) {
            state.user.set(user)
        },
        get() {
            return state.get()
        },
        set(value) {
            state.set(value)
        }
    })   
}