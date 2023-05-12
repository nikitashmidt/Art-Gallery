import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

import { postRefreshToken } from '@store/slices/authSlice';

import Layout from '@components/Layout';
import { ThemeProvider } from '@hooks/useTheme';
import { useAppDispatch } from '@hooks/useStore';

import { getRefreshToken } from './services';

const MainPage = lazy(() => import('@/pages/MainPage'));

const ArtistPage = lazy(() => import('@/pages/Artist'));

const App = () => {
  const dispatch = useAppDispatch();

  const { data } = useVisitorData();

  useEffect(() => {
    if (data?.visitorId && getRefreshToken()) {
      const dataToken = {
        fingerprint: data?.visitorId,
        refreshToken: getRefreshToken(),
      };

      dispatch(postRefreshToken(dataToken));
    }
  }, [dispatch, data?.visitorId]);

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Suspense fallback={<div>Не загрузились...</div>}>
            <Routes>
              <Route path='/author/:authorId' element={<ArtistPage />} />
              <Route path='*' element={<MainPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
