const jwt = require('jsonwebtoken')
const config = require('config')
const chalk = require('chalk')

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token')

  // Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token, authorization denied.' })
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtToken'))
    req.user = decoded.user // user object from payload
    next()
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(401).json({ msg: 'Token is not valid.' })
  }
}