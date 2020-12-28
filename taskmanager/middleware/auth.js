const jwt = require('jsonwebtoken')
const config = require('config')
const chalk = require('chalk')

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('auth-token')

  // If not have token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token, authorization denied.' })
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtToken'))
    // User object from payload
    req.user = decoded.user
    next()
  } catch (error) {
    console.log(chalk.red(error.message))
    res.status(401).json({ msg: 'Token is not valid.' })
  }
}