import { useState } from '@hookstate/core';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useUserState } from '../../globalState/userState';
import { useAlertState } from '../../globalState/alertState';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function DataForm() {
  const classes = useStyles();  
  const alertState = useAlertState();
  const userState = useUserState();
  const formData = useState({
    text: ''
  });

  const postData = async () => {    
    axios.interceptors.request.use(req => {
      console.log(`${req.method} ${req.url}`);
      return req;
    });
    // const alertState = useAlertState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token' : userState.token
      }
    };
    const body = JSON.stringify(formData.get());
    try {
      const res = await axios.post('/api/data', body, config);
      // update state here?
    } catch (err) {
      const errors = err.response.data.errors;      
      if (errors) {
        errors.forEach(error => alertState.setAlert(error.msg, 'danger'));
      } else {
        alertState.setAlert(err.response.statusText, 'danger');
        formData.text.set('');
      }
    }
  };  

  const { text } = formData.get();

  const onChange = (e) =>
    formData[e.target.name].set(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();    
    if (text === '') {
      alertState.setAlert('Please enter some text', 'danger');
    } else {
      postData(formData.get());
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} noValidate  onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="text"
                variant="outlined"
                required
                fullWidth
                id="text"
                label="Enter Text"
                autoFocus
                value={text}
                onChange={(e) => onChange(e)}
              />
            </Grid>            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add
          </Button>          
        </form>
      </div>
    </Container>
  );
}