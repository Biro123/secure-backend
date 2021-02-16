import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import 'fontsource-roboto';
import AppNavBar from './components/appNavBar/AppNavBar';
import MainPage from './components/mainPage/MainPage';


const App = () => {
  return (
    <div className="App">
      <Router>
        <AppNavBar />
        <Switch>
          <Route exact path='/' component={MainPage} />
          {/* <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} /> */}
        </Switch>
        {/* <Button variant="contained" color="primary">
          Hello World
        </Button> */}
      </Router>      
    </div>
  );
}

export default App;
