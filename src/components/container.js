import {connect} from 'react-redux'
import Auth from './Auth'
import Layout from './Layout'
import Registration from './Registration'
import ChangePas from './ChangePas'
import SetPas from './SetPas'
import Feed from './Feed'
import {actionChangeAccount, actionAddAllPhoto, actionAddInfo, actionAddError, actionAddLike, 
        actionDeleteLike, actionAddComment} from '../data/action'
import {sendPostHttp, sendGetHttp, sendPostHttpWithoutRes, sendFileOnHttp} from '../lib/http'
import {host} from '../data/config'

const loginApi = host + '/login',
      regApi = host + '/registration',
      postsApi = host + '/getallphoto',
      checkApi = host + '/checkauth',
      emailApi = host + '/sendemail',
      chPassApi = host + '/passwordchange',
      photoApi = host + '/sendphoto',
      logoutApi = host + '/logout',
      addLikeApi = host + '/addlike',
      delLikeApi = host + '/deletelike',
      addCommApi = host + '/addcomment'

const mapStateToPropsAuth = state => 
    ({
        username: state.username,
        error: state.error,
        info: state.info
    })

const mapStateToPropsReg = state => 
    ({
        username: state.username,
        error: state.error,
        info: state.info
    })

const mapStateToPropsChange = state => 
    ({
        error: state.error,
        info: state.info
    })

const mapStateToPropsSetPas = state => 
    ({
        username: state.username,
        error: state.error,
        info: state.info
    })

const mapStateToPropsLayout = state => 
    ({
        username: state.username,
        firstName: state.firstName,
        lastName: state.lastName,
        error: state.error,
        info: state.info
    })

const mapStateToPropsFeed = state => 
    ({
        posts: state.allPhoto,
        username: state.username,
        isEnd: state.isFeedEnd,
        count: state.allPhoto.length
    })



//dispatch -------------------------------------------------------------
const mapDispatchToPropsAuth = dispatch =>
    ({
        checkAuth(){
            sendGetHttp(checkApi)
                .then(data => {
                    if(data) dispatch(actionChangeAccount(data.firstName, data.lastName, data.username))
                })
                .catch(error => dispatch(actionAddError(error.message)))
        },
        onAuth(login, password){
            let data = {login: login, password: password}
            sendPostHttp(loginApi, data)
                .then(data => dispatch(actionChangeAccount(data.firstName, data.lastName, data.username)))
                .catch(error => dispatch(actionAddError(error.message)))   
        },
        onCloseInfo(isInfo){
            if(isInfo){
                dispatch(actionAddInfo(''))
            }else{
                dispatch(actionAddError(''))
            }
        }
    })

const mapDispatchToPropsReg = dispatch =>
    ({
        onRegistration(user){
            sendPostHttp(regApi, user)
                .then(data => dispatch(actionAddInfo(data.message)))
                .catch(error => dispatch(actionAddError(error.message)))
        },
        onCloseInfo(isInfo){
            if(isInfo){
                dispatch(actionAddInfo(''))
            }else{
                dispatch(actionAddError(''))
            }
        }
    })

const mapDispatchToPropsChange = dispatch =>
    ({
        onChange(email){
            let data = {email: email}
            sendPostHttp(emailApi, data)
                .then(data => dispatch(actionAddInfo(data.message)))
                .catch(error => dispatch(actionAddError(error.message)))
        },
        onCloseInfo(isInfo){
            if(isInfo){
                dispatch(actionAddInfo(''))
            }else{
                dispatch(actionAddError(''))
            }
        }
    })

const mapDispatchToPropsSetPas = dispatch =>
    ({
        onPassword(password){
            let data = {password: password}
            sendPostHttp(chPassApi, data)
                .then(data => {
                    dispatch(actionAddInfo(data.message))
                    window.location.href = "/"
                })
                .catch(error => dispatch(actionAddError(error.message)))
        },
        onCloseInfo(isInfo){
            if(isInfo){
                dispatch(actionAddInfo(''))
            }else{
                dispatch(actionAddError(''))
            }
        }
    })

const mapDispatchToPropsLayout = dispatch =>
    ({
        onLogout(){
            sendPostHttp(logoutApi, {})
                .then(data => {
                    dispatch(actionChangeAccount('', '', ''))
                    window.location.href = "/"
                })
                .catch(error => dispatch(actionAddError(error.message)))
        },
        onSendPhoto(file, text){
            sendFileOnHttp(photoApi, file, text)
                .then(data => {
                    dispatch(actionAddAllPhoto(data))
                    if(window.location.href !== "#/feed") window.location.href = "#/feed"
                })
                .catch(error => dispatch(actionAddError(error.message)))
        },
        onCloseInfo(isInfo){
            if(isInfo){
                dispatch(actionAddInfo(''))
            }else{
                dispatch(actionAddError(''))
            }
        }
    })

const mapDispatchToPropsFeed = dispatch =>
    ({
        onLoadPhoto(id){
            let url = id ? `${postsApi}?id=${id}` : postsApi
            sendGetHttp(url)
                .then(data => {dispatch(actionAddAllPhoto(data))})
                .catch(error => dispatch(actionAddError(error.message)))
        },
        onDeletePhoto(){
            dispatch(actionAddAllPhoto(null))
        },
        onAddLike(imagePath, username){
            let data = {path: imagePath, username: username}
            sendPostHttpWithoutRes(addLikeApi, data)
                .then(msg => console.log('like'))
                .catch(error => dispatch(actionAddError(error.message)))

            dispatch(actionAddLike(imagePath))
        },
        onDeleteLike(imagePath, username){
            let data = {path: imagePath, username: username}
            sendPostHttpWithoutRes(delLikeApi, data)
                .then(msg => console.log('dislike'))
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
                .then(msg => console.log('comment'))
                .catch(error => dispatch(actionAddError(error.message)))

            dispatch(actionAddComment(imagePath, text, date))
        }
    })

export const AuthPage = connect(mapStateToPropsAuth, mapDispatchToPropsAuth)(Auth)
export const RegPage = connect(mapStateToPropsReg, mapDispatchToPropsReg)(Registration)
export const ChangePasPage = connect(mapStateToPropsChange, mapDispatchToPropsChange)(ChangePas)
export const SetPasPage = connect(mapStateToPropsSetPas, mapDispatchToPropsSetPas)(SetPas)
export const LayoutPage = connect(mapStateToPropsLayout, mapDispatchToPropsLayout)(Layout)
export const FeedPage = connect(mapStateToPropsFeed, mapDispatchToPropsFeed)(Feed)