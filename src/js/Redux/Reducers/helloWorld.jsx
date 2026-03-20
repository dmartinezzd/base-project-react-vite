import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  helloWorld: {
    data: null,
    error: null
  }
};

const helloWorldReducer = createSlice({
  name: 'helloWorld',
  initialState,
  reducers: {
    setHelloWorldSuccess: (state, action) => {
      state.helloWorld.data = action.payload;
    },
    setHelloWorldError: (state, action) => {
      state.helloWorld.error = action.payload;
    }
  }
});

export const { setHelloWorldSuccess, setHelloWorldError } = helloWorldReducer.actions;

export default helloWorldReducer.reducer;