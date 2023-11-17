import { useEffect } from "react"

const WoWTooltip = (props) => {
  const url = "https://www.wowhead.com/classic/item=" + props.id


  useEffect(() => {
    window.$WowheadPower.refreshLinks()
  }, []);


  return (
    <a className="flex" href={url} aria-label="Wowhead item link"></a>
  )
};

export default WoWTooltip;