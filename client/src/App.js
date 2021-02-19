import { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'fontsource-roboto';
import AppNavBar from './components/appNavBar/AppNavBar';
import MainPage from './components/content/MainPage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AlertMessage from './components/alert/AlertMessage';
import { userUserState, useUserState } from './globalState/userState';

const App = () => {

  const userState = useUserState();
  console.log(userState.token);

  //Base URL for every request
  // axios.defaults.baseURL = "https://codespot.org";
  //Base authentication token
  // axios.defaults.headers.common['x-auth-token'] = userState.token;
  
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      axios.defaults.headers.common['x-auth-token'] = localStorage.token;
      localStorage.setItem('token', localStorage.token);
    }
    userState.loadUser();
    // store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) userState.signOut();
    });
  }, []);


  return (
    <div className="App">
      <Router>
        <AppNavBar />
        <AlertMessage />
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/register' component={SignUp} />
          <Route exact path='/login' component={SignIn} />
          <Route exact path='/logout' component={() => <p>logout</p>} />
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
