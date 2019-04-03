import React from 'react'
import {withRouter} from 'react-router'
import '../css/Comments.css'

const Comments = ({history, comments, show, onComment=f=>f}) => {
    let _text

    const commentSubmit = (e) => {
        e.preventDefault()
        onComment(_text.value)
        _text.value = ""
    }

    return(
        <ul className="comments">
            {(show) ? comments.map((comment, i) => <li key={i}><span className="comment-username" onClick={() => history.push(`/feed/user/${comment.username}`)}>@{comment.username}:</span>&nbsp;{comment.text}</li>) : <div></div>}                
            {(show) ?             
                <li>
                    <form className="comments-form" onSubmit={commentSubmit}>
                        <textarea ref={textarea => _text = textarea} className="comment-message" name="text" placeholder="Комментарий:"/>
                        <button type="submit" className="btn-comment">Добавить</button>
                    </form>
                </li> : <div></div>
            }
        </ul>
    ) 
}

export default withRouter(Comments)