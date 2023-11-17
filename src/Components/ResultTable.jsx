import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "./Item";


const ResultTable = () => {
  const data = useSelector((state) => state.items.data)
  const selectedRaid = useSelector((state) => state.items.selectedRaid)
  
  const [searchParams, setSearchParams] = useState('');
  const [itemComponents, setItemComponents] = useState([]);



  const searchHandler = (event) => {
    setSearchParams(event.target.value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      let itemComps = data.filter(item => item.raid === selectedRaid)
      if(searchParams[0] === '@' && searchParams.slice(1)){
        itemComps = itemComps.filter(item => item.droppedBy.toLowerCase().includes(searchParams.slice(1).toLowerCase()))
      } else {
        itemComps = itemComps.filter(item => item.raid === selectedRaid && item.name.toLowerCase().includes(searchParams.toLowerCase()))
      }

      setItemComponents(itemComps);
    }, [300])

    return () => {
      window.clearTimeout(timer)
    }

}, [searchParams, data, selectedRaid])

  
  return (
    <div className="flex flex-col overflow-scroll border border-white h-[85%] w-[33%] px-1 py-1">
      <input onChange={searchHandler} className="w-9/12 self-center" id="search-bar" type="text"/>
        {itemComponents.map(i => <Item id={i.id} key={i.id} />)}
    </div>
  )
};

export default ResultTable