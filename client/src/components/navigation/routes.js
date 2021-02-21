import AccountBoxIcon from '@material-ui/icons/AccountBoxRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import HomeIcon from '@material-ui/icons/HomeRounded';

import MainPage from '../content/MainPage';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import SignOut from '../auth/SignOut';

const routes = (isAuthenticated) => {
  return  [
    {
      path: '/',
      sidebarName: 'Home',
      disabled: false,
      icon: HomeIcon,
      component: MainPage
    },
    {
      path: '/register',
      sidebarName: 'Sign Up',
      disabled: isAuthenticated,
      icon: AccountBoxIcon,
      component: SignUp
    },
    {
      path: '/login',
      sidebarName: 'Sign In',
      disabled: isAuthenticated,
      icon: LockOutlinedIcon,
      component: SignIn
    },
    {
      path: '/logout',
      sidebarName: 'Sign Out',
      disabled: !isAuthenticated,
      icon: LockOutlinedIcon,
      component: SignOut
    },
  ];
}

export default routes;