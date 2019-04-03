import {C} from './action'
import initialState from './initialState'

const reducer = (state=initialState, action) => {
    switch (action.type){
        case C.ACTION_CHANGE_ACCOUNT:
            return {
                ...state,
                firstName: action.firstName,
                lastName: action.lastName,
                username: action.username
            }
        case (C.ACTION_ADD_USER):
                let userData = action.userData ? action.userData : {firstName: '', lastName: '', username: '', userPhoto: []}
                return {
                    ...state,
                    userData: userData
                }
        case (C.ACTION_ADD_ALL_PHOTO):
                let allPhoto 
                if(action.allPhoto){
                    allPhoto = state.allPhoto
                    allPhoto.push(...action.allPhoto)
                }else{
                    allPhoto = []
                }
                return {
                    ...state,
                    allPhoto: allPhoto, 
                    isFeedEnd: action.allPhoto ? action.allPhoto.length ? false : true : false
                }
        case (C.ACTION_ADD_LIKE): 
            const i = state.allPhoto.findIndex(photo => photo.imagePath === action.photo)
            let likes_ADD = state.allPhoto[i].likes.users
            likes_ADD.push(state.username)
            let count_ADD = state.allPhoto[i].likes.count + 1
            return {
                ...state,
                allPhoto: [
                    ...state.allPhoto.slice(0, i),
                    {
                        ...state.allPhoto[i],
                        likes: {
                            users: likes_ADD,
                            count: count_ADD
                        }
                    },
                    ...state.allPhoto.slice(i + 1)
                ]
            }
        case (C.ACTION_DELETE_LIKE):
            const j = state.allPhoto.findIndex(photo => photo.imagePath === action.photo)
            let likes_DEL = state.allPhoto[j].likes.users
            const index = likes_DEL.indexOf(state.username)
            likes_DEL.splice(index, 1)
            let count_DEL = state.allPhoto[j].likes.count - 1
            return {
                ...state,
                allPhoto: [
                    ...state.allPhoto.slice(0, j),
                    {
                        ...state.allPhoto[j],
                        likes: {
                            users: likes_DEL,
                            count: count_DEL
                        }
                    },
                    ...state.allPhoto.slice(j + 1)
                ]
            }  
        case (C.ACTION_ADD_COMMENT):
            const k = state.allPhoto.findIndex(photo => photo.imagePath === action.photo)
            let comments = state.allPhoto[k].comments
            comments.push({username: state.username, text: action.comment, date: action.date})
            return {
                ...state,
                allPhoto: [
                    ...state.allPhoto.slice(0, k),
                    {
                        ...state.allPhoto[k],
                        comments: comments
                    },
                    ...state.allPhoto.slice(k + 1)
                ]
            } 
        case (C.ACTION_ADD_INFO):
                return {
                    ...state,
                    info: action.info
                }
        case (C.ACTION_ADD_ERROR):
                return {
                    ...state,
                    error: action.error
                }
        case (C.ACTION_LOADING_USERPIC):
                return {
                    ...state,
                    userpicLoaded: !state.userpicLoaded
                }
        default:
            return state
    }
}

export default reducer