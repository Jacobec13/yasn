import * as React from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@material-ui/core';

import { AuthContext, AuthStatus } from '../auth/AuthContext';
import LogInForm from '../auth/LogInForm/LogInForm';

import UserCard from './UserCard/UserCard';

export interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = () => {
  const { status } = React.useContext(AuthContext);

  const renderMainForm = () => {
    if (status === AuthStatus.UNAUTHORIZED) {
      return <LogInForm />;
    }
    return <UserCard />;
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">YASN</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container>
          <div>{renderMainForm()}</div>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default MainLayout;
