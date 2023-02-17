import { useState } from "react";

export default function Comments() {
    const [newComment, setNewComment] = useState()
    const handleComment = (event) => {
        setNewComment({
            [event.target.name]: event.target.value,
            game: "game",
            game_id:"game_id",
            user:"user",
            user_id: "5",
        })
      }
    
    const postComment = () => {
        fetch(`http://127.0.0.1:3001/api/addcomment${1}`, {
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