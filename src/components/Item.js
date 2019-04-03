import React, {Component} from 'react'
import Comments from './Comments'
import GetDate from './Date'
import {host} from '../data/config'
import '../css/Item.css'

class Item extends Component{

    constructor(props){
        super(props)
        this.state = {
            isLike: false,
            likeCounter: 0
        }
        this.addComment = this.addComment.bind(this)
        this.addLike = this.addLike.bind(this)
    }

    componentWillMount(){
        let photo = this.props.photo
        this.setState({likeCounter: photo.likes.count})
        this.props.photo.likes.users.forEach((user) => {
            if(user === this.props.me) this.setState({isLike: true})
        })
    }

    addLike(){
        let isLike = this.state.isLike
        let imagePath = this.props.photo.imagePath
        if(!isLike){
            this.props.onAddLike(imagePath)
            this.setState({likeCounter: this.state.likeCounter + 1})
        }else{
            this.props.onDeleteLike(imagePath)
            this.setState({likeCounter: this.state.likeCounter - 1})
        }
        this.setState({isLike: !isLike})
    }

    addComment(text){
        this.props.onAddComment(this.props.photo.imagePath, text)
    }

    render(){
        const {photo, username, onExit} = this.props
        const {isLike, likeCounter} = this.state
        const {addLike, addComment} = this

        return(
            <div className="item">
                <div className="item-block">
                    <div className="item-photo">
                        <img src={host + photo.imagePath} width="600" alt=""/>
                    </div>
                    <div className="item-comments">
                        <div className="description">
                            <div className="description-user-photo">
                                <div className="item-img">
                                    <img src={host + '/' + username + '/userpic.jpg'} alt="userpic"/> 
                                </div>
                                <span className="comment-username description-username">{username}</span>
                            </div>
                            <span className="item-description">{photo.description}</span>               
                        </div>
                        <Comments comments={photo.comments} show={true} onComment={text => addComment(text)}/>         
                    </div>
                    <div className="close-item" onClick={onExit}>X</div>
                    <div className="item-date">
                       <GetDate date={new Date(photo.loaded)}/> 
                    </div>
                    <div className="item-likes">
                        <div className={(isLike) ? "heart red-heart" : "heart"} onClick={addLike}></div>
                        <span>{likeCounter}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item