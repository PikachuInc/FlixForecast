import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface UserState {
  username: string,
  loggedIn: boolean,
}

// Define the initial state using that type
const initialState: UserState = {
  username: '',
  loggedIn: false,
}

export const userSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload
      state.loggedIn = true
    }, 
  },
})

export const { login } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserState = (state: RootState) => state

export default userSlice.reducer