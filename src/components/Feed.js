import React, {Component} from 'react'
import Post from './Post'
import "../css/Feed.css"

class Feed extends Component{

    constructor(props){
        super(props)
        this.state = {loading: false}
        this.addComment = this.addComment.bind(this)
        this.addLike = this.addLike.bind(this)
        this.deleteLike = this.deleteLike.bind(this)
        this.checkEndOfScroll = this.checkEndOfScroll.bind(this)
    }

    componentWillMount(){
        if(!this.props.posts.length) this.props.onLoadPhoto(null)
    }

    componentDidMount(){
        window.addEventListener('scroll', this.checkEndOfScroll)
    }

    componentWillUpdate(nextProps){
        if(nextProps.posts.length !== this.props.posts.length || nextProps.isEnd) this.setState({loading: false})
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',  this.checkEndOfScroll);
        this.props.onDeletePhoto()
    }

    addComment(imagePath, text){
        this.props.onComment(imagePath, text, this.props.username)
    }

    addLike(imagePath){
        this.props.onAddLike(imagePath, this.props.username)
    }

    deleteLike(imagePath){
        this.props.onDeleteLike(imagePath, this.props.username)
    }

    checkEndOfScroll(){
        let screen = window.scrollY
        let win = window.innerHeight
        let doc = document.body.scrollHeight
        if((doc - screen - win) <= 0){
            if(this.props.posts.length && !this.props.isEnd && !this.state.loading){
                let id = this.props.posts[this.props.posts.length - 1]._id
                this.setState({loading: true})
                this.props.onLoadPhoto(id)
            }                    
        }
    }

    render(){
        const {addComment, addLike, deleteLike} = this
        const{posts, username} = this.props

        return(
            <div className="feed">
                {(posts) ? posts.map((post, i) => <Post key={i} post={post} username={username} onAddLike={imagePath => addLike(imagePath)} onDeleteLike={imagePath => deleteLike(imagePath)} onAddComment={(imagePath, text) => addComment(imagePath, text)}/>) : <div></div>}
            </div>
        )
    }
}

export default Feed