const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')

const Profile = require('../../models/Profile')

/**
 * @route GET api/profile/me
 * @desc  Get current user profile
 * @access  Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile
      .findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])

    if (!profile) {
      return res
        .status(400)
        .json({
          msg: 'There is no profile for this user.'
        })
    }

    res.json({ profile })
  } catch (error) {
    res.status(500).send({
      msg: 'Server Error.'
    })
  }
})

/**
 * @route POST api/profile
 * @desc  Create / Update user profile
 * @access  Private
 */
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required.').not().isEmpty(),
      check('skills', 'Skills is required.').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() })
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubProfile,
      experience,
      education,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
      devto
    } = req.body

    // Build profile object
    const profileFields = {}
    profileFields.user = req.user.id

    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (status) profileFields.status = status
    if (bio) profileFields.bio = bio
    if (githubProfile) profileFields.githubProfile = githubProfile
    if (experience) profileFields.experience = experience
    if (education) profileFields.education = education
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profile.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram
    if (devto) profileFields.social.devto = devto

    try {
      let profile = await Profile.findOne({ user: req.user.id })

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )

        return res.json(profile)
      }

      // Create
      profile = new Profile(profileFields)
      await profile.save()
      res.json(profile)
    } catch (error) {
      res.status(500).send({
        msg: 'Server Error.'
      })
    }
  }
)

/**
 * @route GET api/profile
 * @desc  Get all user profiles
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile
      .find()
      .populate('user', ['name', 'avatar'])

    res.json(profiles)
  } catch (error) {
    res.status(500).send({
      msg: 'Server Error.'
    })
  }
})

module.exports = router