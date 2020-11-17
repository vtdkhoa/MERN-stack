const { validationResult } = require('express-validator')
const axios = require('axios')
const config = require('config')
const chalk = require('chalk')

const Profile = require('../models/Profile')

const getCurrentUserProfile = async (req, res) => {
  try {
    const profile = await Profile
      .findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user.' })
    }

    res.json(profile)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const createProfile = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() })
  }

  const {
    company, website, location,
    status, skills, bio,
    githubProfile, experience,
    education, youtube, twitter,
    facebook, linkedin, instagram, devto
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
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile
      .find()
      .populate('user', ['name', 'avatar'])

    res.json(profiles)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile
      .findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'Profile not found.' })
    }

    res.json(profile)
  } catch (error) {
    console.log(chalk.redBright(error.message))

    if (error.kind === 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Profile not found.' })
    }

    res.status(500).send({ msg: 'Server Error.' })
  }
}

const updateExperience = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() })
  }

  const {
    title,
    company,
    location,
    from, to,
    current,
    description
  } = req.body

  const newExperience = {
    title,
    company,
    location,
    from, to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id })
    profile.experience.unshift(newExperience)
    profile.save()

    res.json(profile)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const updateEducation = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() })
  }

  const {
    school,
    degree,
    fieldOfStudy,
    from, to,
    current,
    description
  } = req.body

  const newEducation = {
    school,
    degree,
    fieldOfStudy,
    from, to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id })
    profile.education.unshift(newEducation)
    profile.save()

    res.json(profile)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    // Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id)
    profile.experience.splice(removeIndex, 1)

    await profile.save()
    res.json(profile)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    // Get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id)
    profile.education.splice(removeIndex, 1)

    await profile.save()
    res.json(profile)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

const getGitHubProfile = async (req, res) => {
  try {
    const uri = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    const options = {
      headers: { 'user-agent': 'node.js' },
      client_id: config.get('githubClientId'),
      client_secret: config.get('githubSecret')
    }
    const gitHubResponse = await axios.get(uri, options)

    if (gitHubResponse.status !== 200) {
      return res
        .status(404)
        .json({ msg: 'No GitHub profile found.' })
    }

    res.json(gitHubResponse.data)
  } catch (error) {
    console.log(chalk.redBright(error.message))
    res.status(500).send({ msg: 'Server Error.' })
  }
}

module.exports = {
  getCurrentUserProfile,
  createProfile,
  getProfiles,
  getProfileByUserId,
  updateExperience,
  updateEducation,
  deleteExperience,
  deleteEducation,
  getGitHubProfile
}