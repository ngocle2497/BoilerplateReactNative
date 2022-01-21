/**
 * remove this line when use
 */
export {};
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {createContext, useCallback, useContext, useState} from 'react';
// import {io, Socket} from 'socket.io-client';

// export const useSocket = () => {
//   // state
//   const [socket, setSocket] = useState<Socket | undefined>(undefined);

//   // function
//   const socketDisconnect = useCallback(() => {
//     if (socket) {
//       socket.offAny();
//       socket.disconnect();
//       setSocket(undefined);
//     }
//   }, [socket]);

//   const socketInit = useCallback(() => {
//     const client = io('', {
//       transports: ['websocket'],
//       reconnection: true,
//       reconnectionDelay: 500,
//       reconnectionAttempts: 9999999,
//       forceNew: true,
//     });
//     client.on('connection-success', () => {
//       console.log('Connected', client.connected);
//     });
//     setSocket(client);
//   }, []);

//   const socketOff = useCallback(
//     (event?: string, listener?: any) => {
//       if (socket) {
//         socket.off(event, listener);
//       }
//     },
//     [socket],
//   );

//   const socketListen = useCallback(
//     (event: string, listener: (...args: any[]) => void) => {
//       if (socket) {
//         socket.on(event, listener);
//       }
//     },
//     [socket],
//   );

//   // result
//   return {socket, socketInit, socketOff, socketListen, socketDisconnect};
// };

// type SocketContext = {
//   socket: Socket | undefined;
//   socketOff: (event?: string, listener?: any) => void;
//   socketListen: (event: string, listener: (...args: any[]) => void) => void;
//   socketInit: () => void;
//   socketDisconnect: () => void;
// };

// export const SocketIoContext = createContext<SocketContext>(
//   {} as SocketContext,
// );
// export const SocketProvider = SocketIoContext.Provider;
// export const useSocketContext = () => useContext(SocketIoContext);
