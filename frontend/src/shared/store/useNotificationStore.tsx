import { create } from 'zustand';

interface Store {
  timerId: number | null;
  message: string;
  status: Status | '';
  hideNotification: () => void;
  showNotification: (message: string, status: Status) => void;
}

type Status = 'success' | 'warning' | 'error';

export const useNotificationStore = create<Store>((set, get) => {
  return {
    timerId: null,
    message: '',
    status: '',

    hideNotification: () => {
      set({ message: '', status: '', timerId: null });
    },

    showNotification: async (message, status) => {
      const activeTimer = get().timerId;
      if (activeTimer) clearTimeout(activeTimer);

      const newTimeoutId = setTimeout(() => {
        get().hideNotification();
      }, 5000);

      set({ message, status, timerId: newTimeoutId });
    },
  };
});
