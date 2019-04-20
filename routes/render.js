
exports.admin = function (req, res) {
    if (res.locals.partials == null) {
        res.locals.partials = {};
    }
    res.locals.partials.header = 'header';
    res.locals.partials.breadcrumbs = 'breadcrumbs';
    res.locals.partials.theme = 'js/theme';
    res.locals.partials.layout = 'js/layout';

    res.render('base', {
        
        user: req.session.user,
        csrf: req.csrfToken(),

        url: {
            home: '/'
        }
    });
}
