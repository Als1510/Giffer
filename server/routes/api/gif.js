const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const auth = require('../../middleware/auth')

router.get('/', auth, async(req, res) => {
  try{
    const user = await User.findById(req.user.id).select('-password')
    res.json(user.favourites);
  } catch(error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.post('/favourite', auth, async(req, res) => {
  try{
    const user = await User.findById(req.user.id)
    if(!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    const {favourites} = req.body;
    if(favourites) {
      if(!user.favourites.includes(favourites)) {
        user.favourites.push(favourites)
      }
    }
    await user.save();
    res.json({ msg: "Added to Favourites" })
  } catch(error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router;