import fetch from 'isomorphic-fetch'

export const sendPostHttp = (path, data) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'POST',
            credentials: 'include',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(data),
            mode: 'cors'
        }
        fetch(path, options)
            .then(responce => {
                if(responce.status === 200){
                    resolve(responce.json())
                }else{
                    return responce.json()
                }
             })
             .then(json => reject(json))
    })
}

export const sendGetHttp = path => {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'GET',
            credentials: 'include',
            headers: new Headers(),
            mode: 'cors'
        }
        fetch(path, options)
            .then(responce => {
                if(responce.status === 200){
                    resolve(responce.json())
                }else if(responce.status === 204){
                    resolve(null)
                }else{
                    return responce.json()
                }
             })
             .then(json => reject(json))
    })
}

export const sendPostHttpWithoutRes = (path, data) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
        }
        fetch(path, options)
            .then(responce => {
                if(responce.status !== 200){
                    return responce.json()
                }else{
                    resolve(null)
                }
             })
             .then(json => reject(json))
    })
}

export const sendFileOnHttp = (path, file, text) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({'Content-Type': 'image/jpeg', 'X-Usertext': encodeURIComponent(text)}),
            body: file
        }
        fetch(path, options)
            .then(responce => {
                if(responce.status === 200){
                    resolve(responce.json())
                }else{
                    return responce.json()
                }
            })
            .then(json => reject(json))
    })
}