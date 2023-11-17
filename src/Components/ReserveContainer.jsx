import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// Components
import Button from "./Button";
import ReservePlacement from "./ReservePlacements";


// Actions
import { resetReservation, setReservation, setSelectedRaid } from "../redux/item/itemSlice";

// CONSTANTS
import RAIDS from "../redux/Constants/RaidConstants";


const ReserveContainer = (props) => {
  const selectedRaid = useSelector(state => state.items.selectedRaid)
  const reservedItems = useSelector(state => state.items.reservationList)

  const dispatch = useDispatch()

  const [dropdownEnabled, setDropdownEnabled] = useState(false);
  
   // HANDLERS

   const raidHandler = event => {
    if(selectedRaid === event.target.value){
      return;
    }
    dispatch(setSelectedRaid(event.target.value))
    dispatch(resetReservation())
  }


  const dropDownHandler = () => {
    setDropdownEnabled(!dropdownEnabled);
  }

  const submitHandler = (event) => {
    // So when this event goes of we have to check the data in reservedItems make sure every line has a valid value and all key/value pairs has to be completely unique
    const list = [];
    for(const key in reservedItems){
      list.push(reservedItems[key])
    }
// So to check for uniqueness we can just extract all the values from their respective keys put them in a list exchange to Set and make sure the length is still the correct one if it has decreased it means some value was not unique
    if(list.length === new Set(list).size){
      const returnObj = {... reservedItems}
      returnObj.raid = selectedRaid
      fetch(process.env.REACT_APP_BACKEND_BASE + 'reservation', {
        method: "POST",
        body: JSON.stringify(returnObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        credentials: 'include'
      }).then((response) => console.log(response))
    }

    
  }

  const dropDown =
    <div className="dropdown-container flex flex-col">
      { Object.values(RAIDS).map(raid => <button className="text-white hover:underline" value={raid} key={raid} onClick={raidHandler}>{raid}</button>) }
    </div>



  useEffect(() => {
    // Refreshes the wow links each time reservedItems is updated to make sure the links is properly displayed
    window.$WowheadPower.refreshLinks()
  }, [reservedItems]);


  const reservedComponents = [];
  for(const [key, value] of Object.entries(reservedItems)){
    if(value){
      reservedComponents.push(<ReservePlacement id={value} key={key} value={key} />)
    } else {
      reservedComponents.push(<ReservePlacement id={null} key={key} value={key} />)
    }
  }

  return (
    <div id="item-reserve-container" className="w-[33%] h-[85%] border border-white me-5 p-3">
      <h4 className="text-white">Name - Rank</h4>
      {/* All divs should be droppable areas which will contain <Item id={id} /> */}
      {reservedComponents.reverse()}
      <Button className="m-2" btnHandler={submitHandler} label='Reserve Gear'/>
      <Button className="m-2" btnHandler={dropDownHandler} label={selectedRaid}/>
      {dropdownEnabled && dropDown}
    </div>
  )
}

export default ReserveContainer;