import React, {Component} from 'react'
import {FeedPage} from './container'
import {UserPage} from './userContainer'
import Error from './Error'
import Info from './Info'
import Loader from './Loader'
import E404 from './E404'
import {Route, Switch} from 'react-router-dom'
import {withRouter} from 'react-router'
import '../css/Layout.css'

class Layout extends Component{

    constructor(props){
        super(props)
        this.state = {showLoader: false}
        if(!this.props.username) this.props.history.push("/")
        this.showLoader = this.showLoader.bind(this)
        this.closeLoader = this.closeLoader.bind(this)
        this.sendPhoto = this.sendPhoto.bind(this)
        this.linkToFeed = this.linkToFeed.bind(this)
    }

    componentDidMount(){
        const head = document.getElementsByClassName("header")[0]
        let isScroll = {min: true, max: true}
        window.addEventListener("scroll", () => {
            let scrolTop = window.scrollY
            if((scrolTop > 200) && isScroll.min){
                isScroll = {min: false, max: true}
                head.classList.remove("header-max")
                head.classList.add("header-min")
            }else if((scrolTop < 200) && isScroll.max){
                isScroll = {min: true, max: false}
                head.classList.remove("header-min")
                head.classList.add("header-max")  
            }
        })
    }

    showLoader(){
        this.setState({showLoader: true})
    }

    closeLoader(){
        this.setState({showLoader: false})
    }

    sendPhoto(file, text){
        this.props.onSendPhoto(file, text)
        this.setState({showLoader: false})
    }

    linkToFeed(){
        if(this.props.history.location.pathname !== "/feed") this.props.history.push("/feed")      
    }

    render(){
        const {firstName, lastName, username, error, info, onLogout, onCloseInfo} = this.props
        const {showLoader} = this.state

        return(
            <div>
                {showLoader ? <Loader isDesc={true} onExit={this.closeLoader} onFileLoading={(file, text) => this.sendPhoto(file, text)}/> : <div></div>}
                {info ? <Info message={info} onClick={() => onCloseInfo(true)}/> : <div></div>}
                {error ? <Error message={error} onClick={() => onCloseInfo(false)}/> : <div></div>}
                <div className="header header-max">
                    <div className="user-photo">
                        <button type="text" className="menu-btn" onClick={this.showLoader}><img src="/img/cam.png" width="44" alt="loader button"/></button>
                        <button type="text" className="menu-btn" onClick={this.linkToFeed}><img src="/img/feed.png" width="44" alt="menu buttom"/></button>
                    </div>
                    <div className="account">
                        <span>{firstName + ' ' + lastName}</span>
                        <span id="account-username" onClick={() => {if(this.props.history.location.pathname !== `/feed/user/${username}`) this.props.history.push(`/feed/user/${username}`)}}>@{username}</span>
                        <span className="logout" onClick={onLogout}>Выйти</span>
                    </div>
                </div>
                <Switch>
                    <Route exact path="/feed" component={FeedPage}/>
                    <Route path="/feed/user/:username" component={UserPage}/> 
                    <Route component={E404}/>  
                </Switch>       
            </div>
        )
    }
}

export default withRouter(Layout)