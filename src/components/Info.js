import React from 'react'
import '../css/Info.css'

const InfoWindow = ({message, onClick=f=>f}) => {
    return (
        <div className="info-window">
            <span>{message}</span>
            <button className="info-btn" onClick={() => onClick()}>OK</button>
        </div>
    )
}

export default InfoWindow