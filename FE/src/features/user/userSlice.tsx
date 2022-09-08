import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";
interface IPayload {
  token: string;
}
interface IUser {
  id: number;
  username: string;
  createAt: string;
  updateAt: string;
  roleIds: string;
  authorities: string[];
  fullName: string;
  image: string;
  email: string;
  phone: string;
  address: string;
}

const initialUserState: IUser = {
  id: 0,
  username: "",
  createAt: "",
  updateAt: "",
  roleIds: "",
  authorities: [],
  fullName: "",
  image: "",
  email: "",
  phone: "",
  address: "",
};


export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserStore: (state, action: PayloadAction<IPayload>) => {
      const d = decodeToken<any | null>(action.payload.token);
      localStorage.setItem('token', action.payload.token)
      return d?.userDetails || state;
    },
  },
});

export const { setUserStore } = userSlice.actions;

export default userSlice.reducer;
