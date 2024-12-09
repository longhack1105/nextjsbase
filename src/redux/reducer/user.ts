import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InfoUser {
  balance: number;
  userName: string;
  fullName: string;
  role: string;
  avatar: string;
}

interface UserState {
  infoUser: InfoUser | null;
}

const initialState: UserState = {
  infoUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfoUser: (state, action: PayloadAction<any>) => {
      state.infoUser = action?.payload;
    },
    updateInfoUser: (state, action: PayloadAction<any>) => {
      state.infoUser = { ...state.infoUser, ...action?.payload };
    },
    setBalance: (state, action: PayloadAction<number>) => {
      if (state.infoUser) {
        state.infoUser.balance = action.payload;
      }
    },

    updateBalance: (state, action: PayloadAction<number>) => {
      if (state.infoUser) {
        state.infoUser.balance += action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInfoUser, updateInfoUser, setBalance, updateBalance } =
  userSlice.actions;
export default userSlice.reducer;
