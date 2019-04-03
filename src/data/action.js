export const C = {
    ACTION_CHANGE_ACCOUNT: 'ACTION_CHANGE_ACCOUNT',
    ACTION_ADD_USER: 'ACTION_ADD_USER',
    ACTION_ADD_ALL_PHOTO: 'ACTION_ADD_ALL_PHOTO',
    ACTION_ADD_INFO: 'ACTION_ADD_INFO',
    ACTION_ADD_ERROR: 'ACTION_ADD_ERROR',
    ACTION_ADD_LIKE: 'ACTION_ADD_LIKE',
    ACTION_DELETE_LIKE: 'ACTION_DELETE_LIKE',
    ACTION_ADD_COMMENT: 'ACTION_ADD_COMMENT',
    ACTION_LOADING_USERPIC: 'ACTION_LOADING_USERPIC'
}

export const actionChangeAccount = (firstName, lastName, username) =>
    ({
        type: C.ACTION_CHANGE_ACCOUNT,
        firstName: firstName,
        lastName: lastName,
        username: username
    })

export const actionAddUser = (firstName, lastName, username, posts) => 
    ({
        type: C.ACTION_ADD_USER,
        userData: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            userPhoto: posts
        }
    })

export const actionAddAllPhoto = allPhoto =>
    ({
        type: C.ACTION_ADD_ALL_PHOTO,
        allPhoto: allPhoto
    })

export const actionAddInfo = info =>
    ({
        type: C.ACTION_ADD_INFO,
        info: info
    })

export const actionAddError = error =>
    ({
        type: C.ACTION_ADD_ERROR,
        error: error
    })

export const actionAddLike = photoPath =>
    ({
        type: C.ACTION_ADD_LIKE,
        photo: photoPath
    })

export const actionDeleteLike = photoPath =>
    ({
        type: C.ACTION_DELETE_LIKE,
        photo: photoPath
    })

export const actionAddComment = (imagePath, text, date) =>
    ({
        type: C.ACTION_ADD_COMMENT,
        photo: imagePath,
        comment: text,
        date: date
    })
export const actionLoadingUserpic = () =>
    ({
        type: C.ACTION_LOADING_USERPIC
    })
