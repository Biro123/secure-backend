import { createState, useState } from '@hookstate/core';

const themeState = createState('dark');

export function useThemeState() {
    const state = useState(themeState)

    return ({
        setTheme(theme) {
          state.set(theme);
        },
        get() {
          return state.get()
        },
        toggle() {
          state.set((p) => {
            return p==='light' ? 'dark' : 'light'
          } )
        }
    })   
}