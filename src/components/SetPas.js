import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Error from './Error'
import Info from './Info'
import '../css/SetPas.css'

class SetPas extends Component{

    constructor(props){
        super(props)
        this.setSubmit = this.setSubmit.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
        this._password = React.createRef()
        this._password_2 = React.createRef()  
        this._setError = React.createRef()
        this.inputClass = "item-form input-form"
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.username) this.props.history.push('/feed')
    }

    setSubmit(e){
        e.preventDefault()
        let password = this._password.current.value
        let password_2 = this._password_2.current.value
        if(password === password_2){
            this._setError.current.innerHTML = ""
            this.props.onPassword(password)
            this._password.current.value = ''
            this._password_2.current.value = ''
        }
    }

    checkPassword(){
        if(this._password.current.value !== this._password_2.current.value){
            this._password.current.className = this.inputClass + " error"
            this._password_2.current.className = this.inputClass + " error"
            let text = document.createTextNode("Введены разные пароли")   
            this._setError.current.innerHTML = ""
            this._setError.current.appendChild(text)    
        }else{
            this._password.current.className = this.inputClass
            this._password_2.current.className = this.inputClass
            this._setError.current.innerHTML = ""
        }
    }

    render(){
        const {_setError, setSubmit, _password, _password_2, inputClass, checkPassword} = this
        const {error, info, onCloseInfo} = this.props

        return(
            <div>
                {error ? <Error message={error} onClick={() => onCloseInfo(false)}/> : <div></div>}
                {info ? <Info message={info} onClick={() => onCloseInfo(true)}/> : <div></div>}
                <div className="set-form">
                    <p className="set-message" ref={_setError}></p>
                    <form onSubmit={setSubmit}>
                        <input ref={_password} type="password" className={inputClass} placeholder="Пароль:" required/>
                        <input ref={_password_2} type="password" className={inputClass} placeholder="Повторите пароль:" required onBlur={checkPassword}/>
                        <button className="item-form btn-form">Сменить пароль</button>
                    </form>
                    <Link to="/" className="auth-link">Главная страница</Link>
                </div>
            </div>
        )
    }
}

export default SetPas