import { useEffect } from "react";
import { useState } from "react";
import Trie from "../utils/trie.js"

export default function SearchBar({games}) {
    const [prefix, setPrefix] = useState("");
    const [suggestion, setSuggestion] = useState([]);
    const trie = new Trie();
    
   
            if(games){
            for(let i = 0; i < games.length; i++) {
             const game = games[i].name
             trie.insert(game)
            }
         }
        
        
   
   
        

    const handleKeyDown = () => {
        
    };
    

    
    const handlePrefix = (e) => {
    setPrefix( e.target.value )
    console.log(e.target.value)
     setSuggestion(trie.find(e.target.value))
     console.log("trie", suggestion)
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

    return(
        <div className="App">
      <input
        type="text"
        name="game-search"
        id="search-bar"
        placeholder="Search..."
        // value={prefix}
        onChange={handlePrefix}
        onKeyDown={handleKeyDown}
        autoComplete='off'
      />
      <ol className="search-list">
         {suggestedList}
        </ol>
    </div> 
    )
}