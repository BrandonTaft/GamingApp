import { useOutletContext } from "react-router-dom";
import SearchBar from "../component/SearchBar";

export default function Chat() {
    const [ games ] = useOutletContext()
  
   console.log(games)
return (
    <div>
    <h1>CHAT</h1>
    <SearchBar games={games} />
    </div>
)
}