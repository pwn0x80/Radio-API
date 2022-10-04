
const radioController = require("../controllers/radioController");
const router = require("express").Router();

router.get('/', (req, res) => {
  let t = radioController.radio_list()
  res.status(200).json(t)
})
//TODO
router.get('/refresh', () => {
  // console.log(radioController.refresh_list())
})
router.get('/baseUrl', (req, res) => {
  let tmp = radioController.baseUrl()
  res.status(200).send(tmp)
})


module.exports = router
