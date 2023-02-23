import { useState, useEffect, useRef } from "react";
import { Trie } from "../utils/trie.js";
import '../style/App.css'

export default function SearchBar({ games }) {
  const [trie, setTrie] = useState();
  const [cached, setCached] = useState(false)
  const [suggestedWords, setSuggestedWords] = useState([]);
  const cursor = useRef(0);


  useEffect(() => {
    setTrie(new Trie)
    setCached(false)
  }, [])

  //If the Node hasnt been initialized yet and once the games prop is loaded
  if (games && !cached && trie) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i].name
      trie.insert(game)
    }
    setCached(true)
  }

  const handlePrefix = (e) => {
    cursor.current = 0
    const prefix = e.target.value
    if (prefix.length > 0) {
      setSuggestedWords(trie.find(e.target.value))
    } else {
      setSuggestedWords([])
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 40 && cursor.current < suggestedWords.length - 1) {
      cursor.current++
      document.getElementById(`suggested-word-${cursor.current}`).style.backgroundColor = "blue"
      document.getElementById(`suggested-word-${cursor.current - 1}`).style.backgroundColor = "white"
    }
    if (e.keyCode === 38 && cursor.current > 0) {
      cursor.current--
      document.getElementById(`suggested-word-${cursor.current}`).style.backgroundColor = "blue"
      document.getElementById(`suggested-word-${cursor.current + 1}`).style.backgroundColor = "white"
    }
    if (e.keyCode === 13 && cursor.current >= 0) {
      const selectedGame = document.getElementById(`suggested-word-${cursor.current}`)
      setSuggestedWords([])
      if(selectedGame){
      e.target.value = selectedGame.innerHTML.valueOf()
      }
    }
  }

  const suggestedWordList = suggestedWords.map((suggestedWord, index) => {
    return (
      <li key={index} id={`suggested-word-${index}`}>
        {suggestedWord}
      </li>
    )
  })


  return (
    <div className="App">
      <input
        type="text"
        name="game-search"
        placeholder="Search..."
        onChange={handlePrefix}
        onKeyDown={handleKeyDown}
        autoComplete='off'
      />
      <div className="search-list">
        {suggestedWordList}
      </div>
    </div>
  )
}