import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <Link className="flex gap-2" to="auth"><img src="./svg/discord.svg" alt="discord icon"/>Login With Discord</Link> {/* Should it be link even if it is an external source? */}
    </>
  )
};


export default HomePage;