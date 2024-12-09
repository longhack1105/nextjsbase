import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LoadingTopBar from '~/components/common/LoadingTopBar';
import { Provider } from 'react-redux';
import SocketProvider from './SocketProvider';
import SplashScreen from '~/components/layout/SplashScreen';
import { ToastContainer } from 'react-toastify';
import { store } from '~/redux/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function AppProvider({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  return (
    <Provider store={store}>
      <div>
        <QueryClientProvider client={queryClient}>
          <SocketProvider>
            <LoadingTopBar />
            <SplashScreen />
            <ToastContainer autoClose={3000} />
            {children}
          </SocketProvider>
        </QueryClientProvider>
      </div>
    </Provider>
  );
}

export default AppProvider;
