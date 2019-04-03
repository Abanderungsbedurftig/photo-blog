import React from "react"

const GetDate = ({date}) => {

    const getDate = () => {
        return `${getDateWithNull(date.getHours())}:${getDateWithNull(date.getMinutes())}  ${date.getDate()} ${getFullMonth(date.getMonth())} ${getDateWithNull(date.getFullYear())}`
    }

    const getDateWithNull = number => (number.toString().length === 1) ? ('0' + number) : number

    const getFullMonth = month => {
        const year = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
        return month ? year[month] : year[0]
    }

    const fullDate = getDate()

    return(
        <span>{fullDate}</span>
    )
}

export default GetDate