import { useState, useEffect } from "react";

export default function Comments() {
    const [newComment, setNewComment] = useState();
    const [savedComments, setSavedComments] = useState();
    const gameId = 3
  useEffect(() => {
  //   const getComments = async () => {
  //     const gameId = 2
  //     const response = await fetch(
  //       `/api/comments/${gameId}`
  //     );
  //     const comments = await response.json();
  //     setSavedComments(comments);
  //     console.log(comments)
  // }  
  const getComments = async () => {
    const userId = 12
    const newPassword = "newPassword"
    const response = await fetch(`/igdb/games`,{
      method: 'POST'
    } );
    const comments = await response.json();
    setSavedComments(comments);
    console.log(comments)
}  
getComments()
}, [])
    const handleComment = (event) => {
        setNewComment({
            [event.target.name]: event.target.value,
            game: "game",
            gameId: 7,
            user:"user",
            userId: "3",
        })
      }
    
    const postComment = () => {
        fetch('http://127.0.0.1:3001/api/addcomment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newComment)
    
        }).then(response => response.json())
          .then(result => {
            if (result.success) {
              console.log("COMMENT ADDED")
            }
          })
      }

    return(
        <div className="comment-container">
            <input  type="text" name="comment" onChange={handleComment} placeholder="Enter Comment" autoComplete='off'/>
        <button type='submit' onClick={() => postComment()} >Submit</button>
       
        </div>
    )
}