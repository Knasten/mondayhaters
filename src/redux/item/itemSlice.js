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

export const { setItems, setSelectedRaid, setReservation, resetReservation } = itemSlice.actions;

export const { reservationList } = initialState

export default itemSlice.reducer