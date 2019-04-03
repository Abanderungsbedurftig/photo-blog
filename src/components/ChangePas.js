import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Error from './Error'
import Info from './Info'
import '../css/ChangePas.css'

class ChangePas extends Component{

    constructor(props){
        super(props)
        this.changeSubmit = this.changeSubmit.bind(this)
        this.validEmail = this.validEmail.bind(this)
        this._email = React.createRef()
        this._changeError = React.createRef()
        this.inputClass = "item-form input-form"
    }

    changeSubmit(e){
        e.preventDefault()
        let email = this._email.current.value
        if(this.validEmail(email)){
            this._changeError.current.innerHTML = ""
            this.props.onChange(email)
            this._email.current.value = ''
        }else{
            let text = document.createTextNode("Введен неверный email")   
            this._changeError.current.innerHTML = ""
            this._changeError.current.appendChild(text)  
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
        const {_changeError, changeSubmit,  _email, inputClass} = this
        const {error, info, onCloseInfo} = this.props

        return(
            <div>
                {error ? <Error message={error} onClick={() => onCloseInfo(false)}/> : <div></div>}
                {info ? <Info message={info} onClick={() => onCloseInfo(true)}/> : <div></div>}
                <div className="change-form">
                    <p className="change-message" ref={_changeError}></p>
                    <form onSubmit={changeSubmit}>
                        <input ref={_email} type="email" className={inputClass} placeholder="Email:" required onBlur={this.validEmail}/>
                        <button className="item-form btn-form">Отправить</button>
                    </form>
                    <Link to="/" className="auth-link">Назад</Link>
                </div>
            </div>
        )
    }
}

export default ChangePas