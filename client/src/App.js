import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'fontsource-roboto';
import AppNavBar from './components/appNavBar/AppNavBar';
import MainPage from './components/mainPage/MainPage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

const App = () => {
  return (
    <div className="App">
      <Router>
        <AppNavBar />
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
