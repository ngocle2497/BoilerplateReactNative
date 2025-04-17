import { MMKV_KEY } from '@common/constant';
import { useAppStore } from '@stores/app';
import { loadString } from '@utils/storage';

const startLoadApp = async () => {
  useAppStore.getState().startLoadApp();

  const token = loadString(MMKV_KEY.APP_TOKEN);

  if (typeof token === 'string') {
    useAppStore.getState().setToken(token);
  }

  useAppStore.getState().endLoadApp();
};

export const appServices = {
  startLoadApp,
};
