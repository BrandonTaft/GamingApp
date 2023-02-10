import { useOutletContext } from "react-router-dom"

export default function Chat() {
    const [ games, setGames ] = useOutletContext()
  
   console.log(games)
return (
    <h1>CHAT</h1>
)
}