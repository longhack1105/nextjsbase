import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';

import { RootState, store } from '~/redux/store';
import { useSelector } from 'react-redux';
import { setIsConnectSocket } from '~/redux/reducer/site';

export const SocketContext = createContext<HubConnection | null>(null);

function SocketProvider({ children }: { children: React.ReactNode }) {
  const { token } = useSelector((state: RootState) => state.auth);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const { isConnectSocket } = useSelector((state: RootState) => state.site);
  const id = useRef<any>(null);

  const startConnection = useCallback(async () => {
    try {
      if (token) {
        const initConnection: HubConnection = new HubConnectionBuilder()
          .withUrl(process.env.NEXT_PUBLIC_SOCKET + '/chatHub'!, {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets,
            accessTokenFactory: () => token,
          })
          .configureLogging(LogLevel.Information)
          .build();

        initConnection.onclose(() => {
          store.dispatch(setIsConnectSocket(false));
        });

        await initConnection.start();
        store.dispatch(setIsConnectSocket(true));
        setConnection(initConnection);
      }
    } catch (e) {
      console.error('Websocket: ' + e);
      store.dispatch(setIsConnectSocket(false));
    }
  }, [token]);

  useEffect(() => {
    startConnection();
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [token]);

  useEffect(() => {
    if (connection && connection.state == 'Connected' && isConnectSocket) {
      clearInterval(id.current);
    } else {
      id.current = setInterval(() => {
        startConnection();
      }, 5000);
    }

    return () => {
      clearInterval(id.current);
    };
  }, [connection, isConnectSocket]);

  return <SocketContext.Provider value={connection}>{children}</SocketContext.Provider>;
}

export default SocketProvider;
