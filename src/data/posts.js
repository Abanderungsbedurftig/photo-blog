const posts = [
    {
        username: 'andrey',
        imagePath: '/img/1/photo.jpg',
        description: 'horosho',
        likes: {
            users: ['ivan', 'andrey', 'petya', 'kolya', 'dashutka'],
            count: 5
        },
        comments: [
            {username: 'andrey', text: 'nice', date: new Date()},
            {username: 'andrey', text: 'great', date: new Date()},
            {username: 'andrey', text: 'beautiful dfgjdnj fd df gdfg d f gkdjf kjf gv dfkgj kjf kd  fkgj kdjgk jk  fkdgjkdf jkgj kdf df kj kjdgfk jkf jdfj ', date: new Date()} 
        ],
        loaded: new Date()
    },
    {
        username: 'andrey',
        imagePath: '/img/2/photo.jpg',
        description: ':))))))))',
        likes: {
            users: ['andrey', 'kolya', 'dashutka', 'anton'],
            count: 4
        },
        comments: [],
        loaded: new Date()
    },
    {
        username: 'andrey',
        imagePath: '/img/3/photo.jpg',
        description: 'ahuenno',
        likes: {
            users: ['andrey', 'ivan', 'petya', 'kolya', 'dashutka', 'anton'],
            count: 6
        },
        comments: [
            {username: 'andrey', text: 'nice', date: new Date()},
            {username: 'andrey', text: 'great', date: new Date()},
            {username: 'andrey', text: 'beautiful dfgjdnj fd df gdfg d f gkdjf kjf gv dfkgj kjf kd  fkgj kdjgk jk  fkdgjkdf jkgj kdf df kj kjdgfk jkf jdfj ', date: new Date()}  
        ],
        loaded: new Date()
    },
    {
        username: 'andrey',
        imagePath: '/img/4/photo.jpg',
        description: 'horosho',
        likes: {
            users: ['andrey', 'ivan', 'petya', 'kolya', 'dashutka'],
            count: 5
        },
        comments: [
            {username: 'andrey', text: 'nice', date: new Date()},
            {username: 'andrey', text: 'great', date: new Date()},
            {username: 'andrey', text: 'beautiful dfgjdnj fd df gdfg d f gkdjf kjf gv dfkgj kjf kd  fkgj kdjgk jk  fkdgjkdf jkgj kdf df kj kjdgfk jkf jdfj ', date: new Date()} 
        ],
        loaded: new Date()
    },
    {
        username: 'andrey',
        imagePath: '/img/5/photo.jpg',
        description: ':))))))))',
        likes: {
            users: ['andrey', 'kolya', 'dashutka', 'anton'],
            count: 4
        },
        comments: [],
        loaded: new Date()
    },
    {
        username: 'andrey',
        imagePath: '/img/6/photo.jpg',
        description: 'ahuenno',
        likes: {
            users: ['andrey', 'ivan', 'petya', 'kolya', 'dashutka', 'anton'],
            count: 6
        },
        comments: [
            {username: 'andrey', text: 'nice', date: new Date()},
            {username: 'andrey', text: 'great', date: new Date()},
            {username: 'andrey', text: 'beautiful dfgjdnj fd df gdfg d f gkdjf kjf gv dfkgj kjf kd  fkgj kdjgk jk  fkdgjkdf jkgj kdf df kj kjdgfk jkf jdfj ', date: new Date()}  
        ],
        loaded: new Date()
    },
    {
        username: 'andrey',
        imagePath: '/img/7/photo.jpg',
        description: 'horosho',
        likes: {
            users: ['andrey', 'ivan', 'petya', 'kolya', 'dashutka'],
            count: 5
        },
        comments: [
            {username: 'andrey', text: 'nice', date: new Date()},
            {username: 'andrey', text: 'great', date: new Date()},
            {username: 'andrey', text: 'beautiful dfgjdnj fd df gdfg d f gkdjf kjf gv dfkgj kjf kd  fkgj kdjgk jk  fkdgjkdf jkgj kdf df kj kjdgfk jkf jdfj ', date: new Date()} 
        ],
        loaded: new Date()
    },
    {
        username: 'andrey',
        imagePath: '/img/8/photo.jpg',
        description: ':))))))))',
        likes: {
            users: ['andrey', 'kolya', 'dashutka', 'anton'],
            count: 4
        },
        comments: [],
        loaded: new Date()
    },
    {
        username: 'andrey',
        imagePath: '/img/9/photo.jpg',
        description: 'ahuenno',
        likes: {
            users: ['andrey', 'ivan', 'petya', 'kolya', 'dashutka', 'anton'],
            count: 6
        },
        comments: [
            {username: 'andrey', text: 'nice', date: new Date()},
            {username: 'andrey', text: 'great', date: new Date()},
            {username: 'andrey', text: 'beautiful dfgjdnj fd df gdfg d f gkdjf kjf gv dfkgj kjf kd  fkgj kdjgk jk  fkdgjkdf jkgj kdf df kj kjdgfk jkf jdfj ', date: new Date()}  
        ],
        loaded: new Date()
    }
]

export default posts
