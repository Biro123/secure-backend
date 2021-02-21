import AccountBoxIcon from '@material-ui/icons/AccountBoxRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import HomeIcon from '@material-ui/icons/HomeRounded';

import MainPage from '../content/MainPage';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';

const SignOut = () => {
  return (
    <p>Sign Out</p>
  )
}

const routes = [
  {
    path: '/',
    sidebarName: 'Home',
    icon: HomeIcon,
    component: MainPage
  },
  {
    path: '/register',
    sidebarName: 'Sign Up',
    icon: AccountBoxIcon,
    component: SignUp
  },
  {
    path: '/login',
    sidebarName: 'Sign In',
    icon: LockOutlinedIcon,
    component: SignIn
  },
  {
    path: '/logout',
    sidebarName: 'Sign Out',
    icon: LockOutlinedIcon,
    component: SignOut
  },
];

export default routes;