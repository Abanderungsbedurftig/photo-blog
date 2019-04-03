module.exports.checkSession = function(req, res, next){
    if(!req.session.username) res.status(401).json({message: 'Пользователь не аутентифицирован'});
    next()
}