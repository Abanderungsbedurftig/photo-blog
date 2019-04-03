import React from 'react'
import '../css/E404.css'

const E404 = ({location}) => {
    return(
        <div className="error-404">
            <h1>#404</h1>
            <p>по маршруту '{location.pathname}' ничего не найдено</p>
        </div>
    )
}

export default E404