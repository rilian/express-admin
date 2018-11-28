
exports.get = function (req, res, next) {
  // console.log('>>>>>>>>>> in routes/login.get')    
    res.locals.partials = {
        content: 'login'
    };

    next();
}
