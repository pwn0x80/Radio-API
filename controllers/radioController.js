//radio_list 
const radioServices = require("../services/radio")

const radio_list = (req, res) => {
  return (radioServices.genresList())
}


const refresh_list = (req, res) => {
  return (radioServices.refreshRadioLink())
}

const baseUrl = (req, res) => {
  return (radioServices.baseUrl());
}


module.exports = {
  radio_list,
  refresh_list,
  baseUrl
}
