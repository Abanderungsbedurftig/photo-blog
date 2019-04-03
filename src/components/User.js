import React, {Component} from 'react'
import Item from './Item'
import Loader from './Loader'
import {host} from '../data/config'
import '../css/User.css'

class User extends Component{

    constructor(props){
        super(props)
        this.state = {
            selectedPhoto: null,
            showLoader: false,
            userpicUrl: host + '/def_userpic.png'
        }
        this.openImage = this.openImage.bind(this)
        this.closeImage = this.closeImage.bind(this)
        this.openLoader = this.openLoader.bind(this)
        this.closeLoader = this.closeLoader.bind(this)
        this.addLike = this.addLike.bind(this)
        this.deleteLike = this.deleteLike.bind(this)
        this.addComment = this.addComment.bind(this)
        this.sendUserpic = this.sendUserpic.bind(this)
        this.loadUserpic = this.loadUserpic.bind(this)
        this.def_userpic = host + '/def_userpic.png'
    }

    componentWillMount(){
        let username = this.props.match.params.username
        this.setState({userpicUrl: host + '/' + username + '/userpic.jpg?'})
        this.props.onLoadUser(username)  
    }

    componentWillReceiveProps(nextProps){
        if(this.props.match.params.username !== nextProps.match.params.username) this.props.onLoadUser(nextProps.match.params.username)
        if(nextProps.userpicLoaded !== this.props.userpicLoaded || nextProps.username !== this.props.username) this.setState({userpicUrl: host + '/' + nextProps.username + '/userpic.jpg?' + Math.random()}) 
    }

    componentWillUnmount(){
        this.props.onDeleteUser()
    }

    openImage(photo){
        this.setState({selectedPhoto: photo})
    }

    closeImage(){
        this.setState({selectedPhoto: null})
    }

    openLoader(){
        this.setState({showLoader: true})
    }

    closeLoader(){
        this.setState({showLoader: false})
    }
    
    sendUserpic(file){
        this.props.onUserpicLoading(file)
        this.setState({showLoader: false})
    }

    addLike(imagePath){
        this.props.onAddLike(imagePath, this.props.me)
    }

    deleteLike(imagePath){
        this.props.onDeleteLike(imagePath, this.props.me)
    }

    addComment(imagePath, text){
        this.props.onComment(imagePath, text, this.props.me)
    }

    loadUserpic(e){
        e.target.onerror = null
        this.setState({userpicUrl: this.def_userpic})
    }

    render(){
        const {firstName, lastName, username, photo, me} = this.props
        const {selectedPhoto, showLoader, userpicUrl} = this.state
        const {openImage, closeImage, openLoader, closeLoader, addComment, addLike, deleteLike, sendUserpic, loadUserpic} = this

        return(
            <div>
                {showLoader ? <Loader isDesc={false} onExit={closeLoader} onFileLoading={(file, text) => sendUserpic(file)}/> : <div></div>}
                {(username && photo) ? (
                    <div className="user-account">
                        <div className="user-head">
                            <div className="userpic">
                                <img src={userpicUrl} alt="userpic" onError={e => loadUserpic(e)}/>
                                {(username === me) && <div className="userpic-btn-loader" onClick={openLoader}></div>}
                                
                            </div>
                            <div className="user-caption">
                                <span className="first-lastname">{firstName + ' ' + lastName}</span>
                                <span className="user-username">@{username}</span>
                                <span className="photo-counter">{photo.length} фото</span>                
                            </div>
                        </div>
                        <div className="user-posts">
                            {photo.map((ph, i) => (
                                <div className="user-image" key={i} onClick={() => openImage(ph)}>
                                    <img src={host + ph.imagePath} alt="user post"/>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : <div></div>}
                {selectedPhoto ? <Item photo={selectedPhoto} me={me} username={username} onExit={closeImage} onAddLike={imagePath => addLike(imagePath, me)} onDeleteLike={imagePath => deleteLike(imagePath, me)} onAddComment={(imagePath, text) => addComment(imagePath, text)}/> : <div></div>}
            </div>
        )
    }
}

export default User