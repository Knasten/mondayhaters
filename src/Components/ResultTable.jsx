import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "./Item";


const ResultTable = () => {
  const data = useSelector((state) => state.items.data)
  const selectedRaid = useSelector((state) => state.items.selectedRaid)
  
  const [searchParams, setSearchParams] = useState('');
  const [currentItems, setCurrentItems] = useState([]);



  const searchHandler = (event) => {
    const keyWords = String(event.target.value).toLowerCase()
    setSearchParams(keyWords)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const itemsArr = Object.entries(data);
      const expr = searchParams[0]
      let items;

      switch(expr) {
        case '@':
          items = itemsArr.filter((item) => {
            const acquisitionName = item[1].droppedBy.toLowerCase()
            console.log(acquisitionName, searchParams.slice(1))
            if(acquisitionName.includes(searchParams.slice(1))){
              return true;
            }
            return false
          })
          break;

        default:
          items = itemsArr.filter((item) => {
            const itemName = item[1].name.toLowerCase()
            if(itemName.includes(searchParams)){
              return true;
            }
            return false
          })
      }
      setCurrentItems(items)

    }, [300])

    return () => {
      window.clearTimeout(timer)
    }

}, [searchParams, data, selectedRaid])

console.log(currentItems)

  
  return (
    <div className="flex flex-col overflow-scroll border border-white h-[85%] w-[33%] px-1 py-1">
      <input onChange={searchHandler} className="w-9/12 self-center" id="search-bar" type="text"/>
        {currentItems.map(i => <Item id={i[0]} key={i[0]} />)}
    </div>
  )
};

export default ResultTable