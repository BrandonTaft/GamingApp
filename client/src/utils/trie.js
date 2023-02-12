
  // TrieNode
  function TrieNode(letter) {
    // the "letter" value will be the character in sequence
    this.letter = letter;
    
    // keep a reference to previousLetter
    this.previousLetter = null;
    
    // create hash of nextLetters
    this.nextLetters = {};
    
    // check to see if the node is at the end
    this.end = false;
    
    this.getWord = function() {
      let output = [];
      let node = this;
  
      while (node !== null) {
        output.unshift(node.letter);
        node = node.previousLetter;
      }
  
      return output.join('');
    };
  }
  
  export default function Trie() {
    this.root = new TrieNode(null);
    // inserts a word into the trie.
  this.insert = function(word) {
    // start at the root
    let node = this.root; 
    // for every character in the word
    for(let i = 0; i < word.length; i++) {
      // check to see if character node exists in nextLetters.
      if (!node.nextLetters[word[i]]) {
        // if it doesn't exist, then create it.
        node.nextLetters[word[i]] = new TrieNode(word[i]);

        // also assign the previousLetter to the child node.
        node.nextLetters[word[i]].previousLetter = node;
      }

      // proceed to the next depth in the trie.
      node = node.nextLetters[word[i]];

      // finally, check to see if it's the last word.
      if (i == word.length-1) {
        // if it is, set the end flag to true.
        node.end = true;
      }
    }
  };

   // check if it contains a whole word.
   this.contains = function(word) {
    let node = this.root;

    // for every character in the word
    for(let i = 0; i < word.length; i++) {
      // check to see if character node exists in nextLetters.
      if (node.nextLetters[word[i]]) {
        // if it exists, proceed to the next depth of the trie.
        node = node.nextLetters[word[i]];
      } else {
        // doesn't exist, return false since it's not a valid word.
        return false;
      }
    }

    // finished going through all the words
    return node.end;
  };

    // returns every word with given prefix
    this.find = function(prefix) {
        let node = this.root;
        let output = [];
    
        // for every character in the prefix
        for(let i = 0; i < prefix.length; i++) {
          // make sure prefix actually has words
          if (node.nextLetters[prefix[i]]) {
            node = node.nextLetters[prefix[i]];
          } else {
            // if there's then none return it.
            return output;
          }
        }
    
        // recursively find all words in the node
        findAllWords(node, output);
    
        return output;
      };
      
      // recursive function to find all words in the given node.
      const findAllWords = (node, arr) => {
        // base case, if node is at a word, push to output
        if (node.end) {
          arr.unshift(node.getWord());
        }
    
        // iterate through each nextLetters, call recursive findAllWords
        for (let child in node.nextLetters) {
          findAllWords(node.nextLetters[child], arr);
        }
      }

      // removes the given word
this.remove = function (word) {
    let root = this.root;

    if(!word) return;

    // recursively finds and removes a word
    const removeWord = (node, word) => {

        // check if current node contains the word
        if (node.end && node.getWord() === word) {

            // check and see if node has nextLetters
            let hasnextLetters = Object.letters(node.nextLetters).length > 0;

            // if has nextLetters just un-flag the end node that marks end of a word.
            // so it doesn't remove words that contain/include supplied word
            if (hasnextLetters) {
                node.end = false;
            } else {
                // remove word by getting previousLetter and setting nextLetters to empty dictionary
                node.previousLetter.nextLetters = {};
            }

            return true;
        }

        // recursively remove word from all nextLetters
        for (let letter in node.nextLetters) {
            removeWord(node.nextLetters[letter], word)
        }

        return false
    };

    // call remove word on root node
    removeWord(root, word);
};
  }

