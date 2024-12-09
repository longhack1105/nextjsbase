import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SiteState {
  loading: boolean;
  routerPrev: string;
  sort: any;
  darkMode: boolean;
  openLogout: boolean;
  isMobile: boolean;
  ip: string;
  isConnectSocket: boolean;
  isActiveCodeBtn: boolean | null;
}

const initialState: SiteState = {
  loading: true,
  routerPrev: '/',
  sort: {},
  darkMode: false,
  openLogout: false,
  isMobile: false,
  ip: '',
  isConnectSocket: false,
  isActiveCodeBtn: false,
};

export const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    updateRouterPrev: (state, action: PayloadAction<string>) => {
      state.routerPrev = action?.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action?.payload;
    },
    updateSort: (state, action: PayloadAction<{ name: string; value: any }>) => {
      state.sort = {
        ...state.sort,
        [action.payload.name]: action.payload.value,
      };
    },
    resetSort: (state) => {
      state.sort = {};
    },
    toogleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toogleOpenLogout: (state) => {
      state.openLogout = !state.openLogout;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setIP: (state, action: PayloadAction<string>) => {
      state.ip = action.payload;
    },
    setIsConnectSocket: (state, action: PayloadAction<boolean>) => {
      state.isConnectSocket = action.payload;
    },
    setIsActiveCodeBtn: (state, action: PayloadAction<boolean>) => {
      state.isActiveCodeBtn = action.payload;
    },
  },
});

export const {
  setIP,
  updateRouterPrev,
  setLoading,
  updateSort,
  resetSort,
  toogleDarkMode,
  toogleOpenLogout,
  setIsMobile,
  setIsConnectSocket,
  setIsActiveCodeBtn,
} = siteSlice.actions;
// Action creators are generated for each case reducer function
export default siteSlice.reducer;
