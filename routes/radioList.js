
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
  let tmp = await radioController.baseUrl()
  console.log(tmp)
  res.status(200).send(tmp)
})


module.exports = router
