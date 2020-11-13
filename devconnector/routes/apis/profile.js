const express = require('express')
const router = express.Router()

// Middleware
const auth = require('../../middleware/auth')

// Controller
const {
  getCurrentUserProfile,
  createProfile,
  getProfiles,
  getProfileByUserId,
  updateExperience,
  updateEducation,
  deleteExperience,
  deleteEducation
} = require('../../controllers/profile')

// Validator
const {
  createProfileValidator,
  updateExperienceValidator,
  updateEducationValidator
} = require('../../validators/profile')

/**
 * @route GET api/profile/me
 * @desc  Get current user profile
 * @access  Private
 */
router.get('/me', auth, getCurrentUserProfile)

/**
 * @route POST api/profile
 * @desc  Create / Update user profile
 * @access  Private
 */
router.post('/', createProfileValidator, createProfile)

/**
 * @route GET api/profile
 * @desc  Get all user profiles
 * @access  Public
 */
router.get('/', getProfiles)

/**
 * @route GET api/profile/user/:user_id
 * @desc  Get profile by user ID
 * @access  Public
 */
router.get('/user/:user_id', getProfileByUserId)

/**
 * @route PATCH api/profile/update/experience
 * @desc  Update [experience]
 * @access  Private
 */
router.patch(
  '/update/experience',
  updateExperienceValidator,
  updateExperience
)

/**
 * @route PATCH api/profile/update/education
 * @desc  Update [education]
 * @access  Private
 */
router.patch(
  '/update/education',
  updateEducationValidator,
  updateEducation
)

/**
 * @route DELETE api/profile/delete/experience/:exp_id
 * @desc Delete experience from profile
 * @access Private
 */
router.delete(
  '/delete/experience/:exp_id',
  auth,
  deleteExperience
)

/**
 * @route DELETE api/profile/delete/education/:edu_id
 * @desc  Delete education from profile
 * @access  Private
 */
router.delete(
  '/delete/education/:edu_id',
  auth,
  deleteEducation
)

module.exports = router