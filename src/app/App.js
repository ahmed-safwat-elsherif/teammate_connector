import { Suspense } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import ErrorBoundary from '../providers/ErrorBoundary';
import Loader from '../components/shared/Loader';
import globalStyle from './globalStyle';
import theme from '../utils/theme';
import UserModule from '../modules/User';
import AuthPage from '../pages/Auth';

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles styles={globalStyle} />
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<AuthPage />} />
            <Route path="*" element={<UserModule />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </ThemeProvider>
);

export default App;
