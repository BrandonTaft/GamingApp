import { useRef } from "react";
import { useState } from "react";
import { Trie, createTree } from "../utils/trie.js"

export default function SearchBar({ games }) {
  const [prefix, setPrefix] = useState("")
  const [suggestion, setSuggestion] = useState([])
  
  const trie = new Trie();

  
   
  async function createTree() {
    for (let i = 0; i < games.length; i++) {
      const game = games[i].name
      trie.insert(game)
     
    }
  }
  if(games){
 createTree()
  }




  const handleKeyDown = () => {

  };


 
  const handlePrefix = (e) => {
   setSuggestion(trie.find(e.target.value))
  }

  // console.log(prefix)
  //const outPut = trie.find("he")
  const suggestedList = suggestion.map((suggestedWord, index) => {
    return (
        <li key={index}>
            {suggestedWord}
        </li>
    )
  })

  return (
    <div className="App">
      <input
        type="text"
        name="game-search"
        id="search-bar"
        placeholder="Search..."
        //value={prefix}
        onChange={handlePrefix}
        onKeyDown={handleKeyDown}
        autoComplete='off'
      />
      <div className="search-list">
        {suggestedList}
      </div>
    </div>
  )
}