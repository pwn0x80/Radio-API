
const radioController = require("../controllers/radioController");
const router = require("express").Router();

router.get('/', async (req, res) => {
  let t = await radioController.radio_list()
  res.status(200).json(t.data)
})
//TODO
router.get('/refresh', () => {
  // console.log(radioController.refresh_list())
})
router.get('/baseUrl', async(req, res) => {
  let url = await radioController.baseUrl()
  res.status(200).send(url)
})


module.exports = router
