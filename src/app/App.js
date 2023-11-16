import { Suspense } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import Home from '../pages/Home';
import SyncSettings from '../pages/SyncSettings';
import NotFound from '../pages/NotFound';
import ErrorBoundary from '../providers/ErrorBoundary';
import Loader from '../components/shared/Loader';
import globalStyle from './globalStyle';
import theme from '../utils/theme';
import LayoutProvider from '../providers/LayoutProvider';
import SyncLogs from '../pages/SyncLogs';

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles styles={globalStyle} />
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <LayoutProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="sync">
                <Route index element={<SyncLogs />} />
                <Route path="settings" element={<SyncSettings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LayoutProvider>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </ThemeProvider>
);

export default App;
