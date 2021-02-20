import { createState, useState } from '@hookstate/core';

const themeState = createState({});

export function useThemeState() {
    const state = useState('dark')

    return ({
        setTheme(theme) {
          state.set(theme);
        },
        get() {
          return state.get()
        }
    })   
}