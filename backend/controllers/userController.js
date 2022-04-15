const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/userModel')

// @desc register User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please fill out user information')
  }

  // check user existence
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // encrypt password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc authenticate User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    res.status(400)
    throw new Error('User not registered')
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password)

  if (passwordIsCorrect) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error('Password Incorrect')
  }
})

// @desc get User profile
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id)
  res.status(200).json({ id: _id, name, email })
})

// generate JWT token
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = { registerUser, loginUser, getMe }
