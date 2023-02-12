import { useEffect } from "react";
import { useState } from "react";
import Trie from "../utils/trie.js"

export default function SearchBar({games}) {
    const [prefix, setPrefix] = useState("");
    const [suggestion, setSuggestion] = useState([]);
    const trie = new Trie();
    

    const dictionary = {
        words: ['hello','helium','world','car','carpet','test','this','that','those','working','is']
      }
        const words = dictionary.words;
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            trie.insert(word)
        }      

    const handleKeyDown = () => {
        
    };
    

    
    const handlePrefix = (e) => {
    setPrefix( e.target.value )
     setSuggestion(trie.find(e.target.value))
     console.log("trie", trie.find(e.target.value))
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