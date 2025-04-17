/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractState } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand/react';

type State = {
  profile: any;

  token: string | undefined;

  loadingApp: boolean;

  loading: boolean;
};

type Actions = {
  logout: () => void;
  endLoadApp: () => void;
  setProfile: (payload: State['profile']) => void;
  setToken: (token: State['token']) => void;
  startLoadApp: () => void;
  setLoading: (newState: State['loading']) => void;
};

const initialState: State = {
  loading: false,
  loadingApp: true,
  profile: {},
  token: undefined,
};

const store = create<State & Actions>()(
  immer(set => ({
    ...initialState,
    endLoadApp: () => {
      set(state => {
        state.loadingApp = false;
      });
    },
    logout: () => {
      set(state => {
        state.token = undefined;

        state.profile = {};
      });
    },
    setLoading: newState => {
      set(state => {
        state.loading = newState;
      });
    },
    setProfile: payload => {
      set(state => {
        state.profile = payload;
      });
    },
    setToken: token => {
      set(state => {
        state.token = token;
      });
    },
    startLoadApp: () => {
      set(state => {
        state.loadingApp = true;
      });
    },
  })),
);

export const useAppStore = store;

export type AppState = ExtractState<typeof useAppStore>;
