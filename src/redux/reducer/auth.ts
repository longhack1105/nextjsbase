import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  isLogin: boolean;
}

const initialState: AuthState = {
  token: null,
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action?.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = null;
    },
    setStateLogin: (state, action: { payload: boolean }) => {
      state.isLogin = action?.payload;
    },
  },
});

export const { setToken, setStateLogin, logout } = authSlice.actions;
export default authSlice.reducer;
