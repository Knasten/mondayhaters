// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication(state, action) {
      state.loggedIn = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    // Other authentication-related actions...
  },
});

// Async action to check authentication status
export const checkAuthentication = () => async (dispatch) => {
  console.log('Checking Authentication...')
  try {
    // Make a request to your backend to check authentication status
    // Assuming you have an endpoint '/auth/check' on your server
    const response = await fetch(process.env.REACT_APP_BACKEND_BASE + 'auth/check', {
      method: 'GET',
      credentials: 'include', // Send credentials (cookies) along with the request
    });

    if (response.ok) {
      const user = await response.json();
      if(user.isAuthenticated){
        dispatch(setUser(user)); // Set user data if authenticated
        dispatch(setAuthentication(true)); // Set authentication status to true
      } else {
        dispatch(setAuthentication(false)); // Set authentication status to false if not authenticated
      }
    } 
  } catch (error) {
    console.error('Error checking authentication:', error);
    dispatch(setAuthentication(false)); // Set authentication status to false on error
  }
};

export const { setAuthentication, setUser } = authSlice.actions;
export default authSlice.reducer;