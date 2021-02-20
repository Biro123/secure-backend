import { createMuiTheme } from '@material-ui/core';

export const lightSoothingTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ef6c00',
    },
    secondary: {
      main: '#5D4037',
    },
    background: {
      default: '#fff8e1',
      paper: '#fff',
    },
    text: {
      primary: '#6d4c41',
    },
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
})

export const darkSoothingTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#95bdb6',
    },
    secondary: {
      main: '#bfa218',
    },
    background: {
      default: '#542409',
      paper: '#35211b',
    },
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#01352D',
        color: '#fff',
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
  },
})