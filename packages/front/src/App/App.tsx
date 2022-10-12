import * as React from 'react';

import AuthProvider from './auth/AuthProvider/AuthProvider';
import MainLayout from './MainLayout/MainLayout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

export default App;
