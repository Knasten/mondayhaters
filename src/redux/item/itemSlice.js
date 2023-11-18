import { createSlice } from "@reduxjs/toolkit";
import RAIDS from "../Constants/RaidConstants";

const initialState = {
  data: [],
  selectedRaid: RAIDS.NAXXRAMAS,
  reservationList: {
    100: null,
    90: null,
    80: null,
    70: null,
    65: null,
    60: null,
    55: null,
    54: null,
  },
}

export const itemSlice = createSlice({
  name: 'items', // Decide on plural or singular
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.data = action.payload
    },

    setSelectedRaid: (state, action) => {
      state.selectedRaid = action.payload
    },

    setReservation: (state, action) => {
      console.log(action.payload)
      if(action.payload[0] !== ''){
        state.reservationList[action.payload[0]] = action.payload[1]
      }
    },

    resetReservation: (state, action) => {
      state.reservationList = initialState.reservationList
    }
  }
})

export const fetchAndSessionStoreItems = (loggedIn, selectedRaid) => async (dispatch) => {
  try {
    if(loggedIn !== undefined && loggedIn){
      const data = await fetch(process.env.REACT_APP_BACKEND_BASE + 'items?raid=' + selectedRaid, {
        method: 'GET',
        credentials: 'include'
      });
      console.log('JUST FETECHED ALOT OF DATA')
      const itemsData = (await data.json()).message
      sessionStorage.setItem(selectedRaid, JSON.stringify(itemsData))
      dispatch(setItems(itemsData));
    }
  } catch (error) {

  }
};

export const { setItems, setSelectedRaid, setReservation, resetReservation } = itemSlice.actions;

export const { reservationList } = initialState

export default itemSlice.reducer