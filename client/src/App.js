import './App.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';


const App = () => {
  return (
    <div className="App">
      <Typography variant="h4" color="primary" >
        Johnny's Happy Place        
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Be excellent to each other!
      </Typography>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}

export default App;
