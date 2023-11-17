import { useDispatch, useSelector } from "react-redux";
import { setReservation } from "../redux/item/itemSlice";

import WoWTooltip from "./WoWTooltip";


const ReservePlacement = (props) => {

  const reservationList = useSelector(state => state.items.reservationList)

  const dispatch = useDispatch();
  

  const handleOnDrop = e => {
    // The item id to be reserved as value for the key below
    const value = e.dataTransfer.getData('currentId');
    // Value of box is the key for the reservation
    const key = e.currentTarget.attributes.value.value
    dispatch(setReservation([key, value]));
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleOnClick = e => {
    // First check which box we need to clear out
    const targetKey = e.target.parentElement.attributes.value.value
    // Second check if there is anything to remove
    if(reservationList[targetKey]){
      // If the above statements passes remove the tooltip
      dispatch(setReservation([targetKey, null]))
    }
  }


  return (
    <div onDrop={handleOnDrop} onDragOver={handleDragOver} className="text-white h-[8%] mb-1" value={props.value}>
      {props.id ? <WoWTooltip id={props.id} /> : null}
      <button onClick={handleOnClick} className="underline">Remove</button>
    </div> 
  )
};

export default ReservePlacement;