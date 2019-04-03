import React, {Component} from 'react'
import {withRouter} from 'react-router'
import Comments from './Comments'
import GetDate from './Date'
import {host} from '../data/config'
import '../css/Post.css'

class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            availableComment: false,
            isLike: false
        }
        this.showComments = this.showComments.bind(this)
        this.addComment = this.addComment.bind(this)
        this.addLike = this.addLike.bind(this)
    }

    componentWillMount(){
        let post = this.props.post
        post.likes.users.forEach((user) => {
            if(user === this.props.username) this.setState({isLike: true})
        })
    }

    showComments(){
        if(!this.state.availableComment){
            this.setState({comments: this.props.post.comments, availableComment: true})
        }else{
            this.setState({comments: [], availableComment: false})
        }     
    }

    addLike(){
        let isLike = this.state.isLike
        let imagePath = this.props.post.imagePath
        if(!isLike){
            this.props.onAddLike(imagePath)
        }else{
            this.props.onDeleteLike(imagePath)
        }
        this.setState({isLike: !isLike})
    }

    addComment(text){
        this.props.onAddComment(this.props.post.imagePath, text)
    }

    render(){
        const {post, history} = this.props
        const {showComments, addComment, addLike} = this
        const {availableComment, isLike} = this.state

        return(
            <div className="post">
                <div className="photo-title">
                    <span className="post-username" onClick={() => history.push(`/feed/user/${post.username}`)}>@{post.username}</span>
                    <span className="post-date">
                        <GetDate date={new Date(post.loaded)}/>
                    </span>
                </div>
                <div className="photo">
                    <img src={host + post.imagePath} width="500" alt=""/>
                </div>
                <div className="photo-caption">
                    <div className="likes-comments">
                        <div className="post-likes">
                            <div className={(isLike) ? "heart red-heart" : "heart"} onClick={addLike}></div>
                            <span>{post.likes.count}</span>
                        </div>
                        <div className="post-comments">
                            <div className="comment-logo" onClick={showComments}></div>
                            <span>{post.comments.length}</span>
                        </div>
                    </div>
                    <div className="post-description">{post.description}</div>
                    <Comments comments={post.comments} show={availableComment} onComment={(text) => addComment(text)}/>      
                </div>
            </div>
        )
    }
}

export default withRouter(Post)