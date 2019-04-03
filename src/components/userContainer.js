import {connect} from 'react-redux'
import {actionAddUser, actionAddLike, actionDeleteLike, actionAddComment, actionAddError, actionLoadingUserpic} from '../data/action'
import User from './User'
import {sendFileOnHttp, sendGetHttp, sendPostHttpWithoutRes} from '../lib/http'
import {host} from '../data/config'

const getUserApi = host + '/getuserphoto',
      getUserData = host + '/getuserdata',
      setUserpicApi = host + '/senduserpic',  
      addLikeApi = host + '/addlike',
      delLikeApi = host + '/deletelike',
      addCommApi = host + '/addcomment'

const mapStateToProps = state =>
    ({  
        firstName: state.userData.firstName,
        lastName: state.userData.lastName,
        username: state.userData.username,
        photo: state.userData.userPhoto,
        me: state.username,
        userpicLoaded: state.userpicLoaded
    })

const mapDispatchToProps = dispatch =>
    ({
        onLoadUser(username){
            Promise.all([sendGetHttp(`${getUserApi}/${username}`), sendGetHttp(`${getUserData}/${username}`)])
                .then(data => dispatch(actionAddUser(data[1].firstName, data[1].lastName, data[1].username, data[0])))
                .catch(error => dispatch(actionAddError(error.message)))
        },
        onDeleteUser(){
            dispatch(actionAddUser(null))
        },
        onAddLike(imagePath, username){
            let data = {path: imagePath, username: username}
            sendPostHttpWithoutRes(addLikeApi, data)
                .catch(error => dispatch(actionAddError(error.message)))

            dispatch(actionAddLike(imagePath))
        },
        onDeleteLike(imagePath, username){
            let data = {path: imagePath, username: username}
            sendPostHttpWithoutRes(delLikeApi, data)
                .catch(error => dispatch(actionAddError(error.message)))

            dispatch(actionDeleteLike(imagePath))
        },
        onComment(imagePath, text, username){
            let date = new Date()
            let data = {
                path: imagePath, 
                comment: {
                    username: username,
                    text: text,
                    date: date
                }
            }
            sendPostHttpWithoutRes(addCommApi, data)
                .catch(error => dispatch(actionAddError(error.message)))

            dispatch(actionAddComment(imagePath, text, date))
        },
        onUserpicLoading(file){
            sendFileOnHttp(setUserpicApi, file, '')
                .then(data => {
                    dispatch(actionLoadingUserpic())
                })
                .catch(error => dispatch(actionAddError(error.message)))
        }
    })

export const UserPage = connect(mapStateToProps, mapDispatchToProps)(User)