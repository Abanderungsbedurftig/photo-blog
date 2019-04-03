import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Error from './Error'
import Info from './Info'
import '../css/Registration.css'

class Registration extends Component{

    constructor(props){
        super(props)
        this.regSubmit = this.regSubmit.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
        this.validUsername = this.validUsername.bind(this)
        this.validEmail = this.validEmail.bind(this)
        this.validFirstName = this.validFirstName.bind(this)
        this.validLastName = this.validLastName.bind(this)
        this._firstName = React.createRef()
        this._lastName = React.createRef()
        this._username = React.createRef()
        this._email = React.createRef()
        this._password = React.createRef()
        this._password_2 = React.createRef()  
        this._regError = React.createRef()
        this.inputClass = "item-form input-form"
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.username) this.props.history.push('/feed')
    }

    regSubmit(e){
        e.preventDefault()
        let firstName = this._firstName.current.value
        let lastName = this._lastName.current.value
        let username = this._username.current.value
        let email = this._email.current.value
        let password = this._password.current.value
        let password_2 = this._password_2.current.value
        if((password === password_2)&&(this.validEmail(email))&&(this.validUsername())&&(this.validFirstName())&&(this.validLastName())){
            this._regError.current.innerHTML = ""
            this.props.onRegistration({
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password
            })
            this._firstName.current.value = ''
            this._lastName.current.value = ''
            this._username.current.value = ''
            this._email.current.value = ''
            this._password.current.value = ''
            this._password_2.current.value = ''
        }else{
            let text = document.createTextNode("Введены неверно следующие данные")   
            this._regError.current.innerHTML = ""
            this._regError.current.appendChild(text)  
        }
    }

    checkPassword(){
        if(this._password.current.value !== this._password_2.current.value){
            this._password.current.className = this.inputClass + " error"
            this._password_2.current.className = this.inputClass + " error"
            let text = document.createTextNode("Введены разные пароли")   
            this._regError.current.innerHTML = ""
            this._regError.current.appendChild(text)    
        }else{
            this._password.current.className = this.inputClass
            this._password_2.current.className = this.inputClass
            this._regError.current.innerHTML = ""
        }
    }

    validFirstName(){
        let nameReg = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/i
        if(!nameReg.test(this._firstName.current.value)){
            this._firstName.current.className = this.inputClass + " error"
            return false
        }else{
            this._firstName.current.className = this.inputClass
            return true
        }
    }

    validLastName(){
        let nameReg = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/i
        if(!nameReg.test(this._lastName.current.value)){
            this._lastName.current.className = this.inputClass + " error"
            return false
        }else{
            this._lastName.current.className = this.inputClass
            return true
        }
    }

    validUsername(){
        let usernameReg = /\w/i
        if(!usernameReg.test(this._username.current.value)){
            this._username.current.className = this.inputClass + " error"
            return false
        }else{
            this._username.current.className = this.inputClass
            return true
        }
    }

    validEmail(){
        let emailReg = /^(([^<>()\],;:\s@]+(\.[^<>()\],;:\s@]+)*))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i
        if(!emailReg.test(this._email.current.value)){
            this._email.current.className = this.inputClass + " error"
            return false
        } else{
            this._email.current.className = this.inputClass
            return true
        }
    }

    render(){
        const {_regError, regSubmit, _firstName, _lastName, _username, _email, _password, _password_2, inputClass, checkPassword} = this
        const {error, info, onCloseInfo} = this.props

        return(
        <div>
            {error ? <Error message={error} onClick={() => onCloseInfo(false)}/> : <div></div>}
            {info ? <Info message={info} onClick={() => onCloseInfo(true)}/> : <div></div>}
            <div className="reg-form">
            <p className="reg-message" ref={_regError}></p>
            <form onSubmit={regSubmit}>
                <input ref={_firstName} type="text" className={inputClass} placeholder="Имя:" required onBlur={this.validFirstName}/>
                <input ref={_lastName} type="text" className={inputClass} placeholder="Фамилия:" required onBlur={this.validLastName}/>
                <input ref={_username} type="text" className={inputClass} placeholder="Никнейм:" required onBlur={this.validUsername}/>
                <input ref={_email} type="email" className={inputClass} placeholder="Email:" required onBlur={this.validEmail}/>
                <input ref={_password} type="password" className={inputClass} placeholder="Пароль:" required/>
                <input ref={_password_2} type="password" className={inputClass} placeholder="Повторите пароль:" required onBlur={checkPassword}/>
                <button className="item-form btn-form">Регистрация</button>
            </form>
            <Link to="/" className="auth-link">Назад</Link>
        </div>
        </div>
        )
    }
}

export default Registration