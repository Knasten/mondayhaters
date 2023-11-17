import WoWTooltip from "./WoWTooltip";
import { useDispatch, useSelector } from "react-redux";
import { setReservation } from '../redux/item/itemSlice';

const Item = (props) => {
  const reservationList = useSelector(state => state.reservationList);
  const dispatch = useDispatch()

  const handleOnDrag = e => {
    e.dataTransfer.setData('currentId', props.id)
  };

  return (
    <div draggable onDragStart={e => handleOnDrag(e)} key={props.id}><WoWTooltip id={props.id} /></div>
  )
}

export default Item;