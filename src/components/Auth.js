import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Error from './Error'
import {host} from '../data/config'
import '../css/Auth.css'

class Auth extends Component{

    constructor(props){
        super(props)
        this.submit = this.submit.bind(this)
        this.validEmail = this.validEmail.bind(this)
        this._login = React.createRef()
        this._password = React.createRef()
        this.inputClass = "item-form input-form"
    }

    componentWillMount(){
        this.props.checkAuth()
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.username) this.props.history.push('/feed')
    }

    submit(e){
        e.preventDefault()
        let login = this._login.current.value
        let password = this._password.current.value
        if(this.validEmail() && password){
            this.props.onAuth(login, password)
            this._login.current.value = ""
            this._password.current.value = ""
        }
    }

    validEmail(){
        let emailReg = /^(([^<>()\],;:\s@]+(\.[^<>()\],;:\s@]+)*))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i
        if(!emailReg.test(this._login.current.value)){
            this._login.current.className = this.inputClass + " error"
            return false
        } else{
            this._login.current.className = this.inputClass
            return true
        }
    }

    render(){
        const {_login, _password, submit, inputClass} = this
        const {error, onCloseInfo} = this.props

        return(
            <div>
                {error ? <Error message={error} onClick={() => onCloseInfo(false)}/> : <div></div>}
                <div className="auth-form">
                    <div className="links">
                        <Link to="/registration" className="reg-link">Регистрация</Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/change" className="reg-link">Забыли пароль?</Link>
                    </div>
                    <form onSubmit={submit}>
                        <input ref={_login} type="email" className={inputClass} placeholder="Email:" required/>
                        <input ref={_password} type="password" className={inputClass} placeholder="Пароль:" required/>
                        <button className="item-form btn-form">Войти</button>
                    </form> 
                    <div className="social-auth">
                        <a href={host + "/auth/google"} id="google-auth"><img src="/img/google.png" alt="google auth"/><span>Sign in with Google</span></a>
                        <a href={host + "/auth/facebook"} id="fb-auth"><img src="/img/fb.png" alt="facebook auth"/><span>Sign in with Facebook</span></a>
                    </div>                 
                </div>
            </div>
        )
    }
}

export default Auth