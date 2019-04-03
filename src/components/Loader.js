import React from 'react'
import '../css/Loader.css'

const Loader = ({isDesc, onExit=f=>f, onFileLoading=f=>f}) => {

    const photoLoader = e => {
        let file = e.target.files[0]
        if(file.type.match('image/jpeg')){
            let reader = new FileReader()
            reader.onload = (e) => {
                let div = document.getElementById("loading-image")
                let btn = document.getElementById("send-photo-btn")
                div.style.border = "4px solid rgb(120,120,120)"
                div.style.background = "url(" + e.target.result + ") no-repeat"
                div.style.backgroundSize = "cover"
                btn.style.display = "block"

            }
            reader.readAsDataURL(file)
        }
    }

    const submitPhotoForm = e => {
        e.preventDefault()
        let file = e.target.file.files[0]
        let text = ''
        if(e.target.text) text = e.target.text.value
        if(file && (text.length < 80)) onFileLoading(file, text)
    }

    return(
        <div className="loader-background">
            <div className="loader-block">
                <div id="loading-image"></div>
                <form id="loading-form" onSubmit={e => submitPhotoForm(e)}>
                    {isDesc ? <textarea className="caption-text" name="text" placeholder="Описание фото:"/> : <div></div>}  
                    <div id="file-upload">
                        <label>
                            <input type="file" className="loading-btn" name="file" onChange={(e) => photoLoader(e)} accept="image/*"/>
                            <span>Выберите фото</span>
                        </label>
                        <button type="submit" id="send-photo-btn">Загрузить</button>
                    </div>
                </form>
                <div className="close-item" onClick={onExit}>X</div>
            </div>
        </div>
    )
}

export default Loader