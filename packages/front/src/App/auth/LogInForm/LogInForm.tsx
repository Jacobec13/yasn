import * as React from 'react';
import {
  Paper,
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
  Divider,
} from '@material-ui/core';
import axios from 'axios';

import { AuthContext } from '../AuthContext';

export interface LogInFormProps {}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    width: '600px',
  },
  gridRoot: {
    padding: '20px',
  },
});

interface LoginFormState {
  login: string;
  name: string;
}

const LogInForm: React.FC<LogInFormProps> = () => {
  const styles = useStyles();

  const [state, setState] = React.useState<LoginFormState>({
    login: '',
    name: '',
  });

  const { logInCb } = React.useContext(AuthContext);

  const { login } = state;

  const setLogin: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setState((prev) => ({ ...prev, login: event.target.value }));
  const setName: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setState((prev) => ({ ...prev, name: event.target.value }));

  const signInCb = async () => {
    try {
      await axios.get('/api/auth', {
        auth: {
          password: '123455',
          username: login,
        },
      });
      logInCb(login);
    } catch (e) {
      alert('Failed to auth');
    }
  };

  const singUpCb = async () => {
    try {
      await axios.post('/api/createUser', state);
      logInCb(login);
    } catch (e) {
      alert('Failed to sign up');
    }
  };

  return (
    <div className={styles.root}>
      <Paper className={styles.paper}>
        <Grid
          className={styles.gridRoot}
          container
          spacing={2}
          direction="column"
        >
          <Grid item>
            <Typography variant="h5">Sign In</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} spacing={2}>
            <Grid item>
              <TextField label="Login" fullWidth onChange={setLogin} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={signInCb}>
                Sign In
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="h5">Or Sign Up</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} spacing={2}>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={6}>
                <TextField label="Name" fullWidth onChange={setName} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Login" fullWidth onChange={setLogin} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={singUpCb}>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LogInForm;
