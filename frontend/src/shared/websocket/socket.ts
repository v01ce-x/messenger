import { io, type Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = () => socket;

export const connectSocket = (token: string) => {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
    auth: { authorization: `Bearer ${token}` },
  });

  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
