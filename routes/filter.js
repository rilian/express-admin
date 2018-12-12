// STEFAN: changes the content of the request body from
// { filter[fieldName]: 'filterBy' } 
// to
// { filter: { fieldName: 'filterBy } }
// This is necessary for actual filtering by express-admin

exports.hotfix = function (req, res, next) {
  Object.keys(req.body).forEach((key) => {
    if (key.includes('filter[')) {
      req.body.filter = req.body.filter || {}
      req.body.filter[key.replace(/filter\[|\]/g, '')] = req.body[key]
      delete req.body[key]
    }
  })
  next();
} 