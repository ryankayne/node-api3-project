module.exports = 

function logger(req, res, next) {
    console.log(`${req.method} ${req.originalUrl} at ${new Date().toISOString()}`);
    next();
  }

function validateUserId(req, res, next) {
    
    next();
}

function validateUser(req, res, next) {
    
    next();
}

function validatePost(req, res, next) {
    
    next();
}