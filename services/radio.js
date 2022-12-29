// http://de1.api.radio-browser.info/xml/tags tags get all
const axios = require("axios").default
const { throws } = require('assert');
const dns = require('dns');
const { json } = require("express");
const util = require('util');
const resolveSrv = util.promisify(dns.resolveSrv);
/**
 * Get a list of base urls of all available radio-browser servers
 * Returns: array of strings - base urls of radio-browser servers
 */
function get_radiobrowser_base_urls() {
  return resolveSrv("_api._tcp.radio-browser.info").then(hosts => {
    hosts.sort();
    return hosts.map(host => "https://" + host.name);
  });
}

/**
 * Get a random available radio-browser server.
 * Returns: string - base url for radio-browser api
 */
function get_radiobrowser_base_url_random() {
  return get_radiobrowser_base_urls().then(hosts => {
    var item = hosts[Math.floor(Math.random() * hosts.length)];
    return item;
  });
}



let urlObj ={
  BASE_URL:null,
  genres_all_List:[]
}
const constant_radio_param = {
    // @get list
  genres_list: '/json/tags',
  // @params {string} %s
  genre_tag_list: '/json/stations/byname/%s',
}

const setBaseUrl =(url, setUrl)=>{  
  setUrl.BASE_URL =url
}

// dns resolve base Radio_LIST_API url 
const baseUrl =async()=>{
if(urlObj.BASE_URL ===null){
 try{
   let url = await  get_radiobrowser_base_url_random();
   setBaseUrl(url, urlObj)
  return urlObj.BASE_URL;
 }catch(e){
   console.log("server is down")
 }
} else{
    return urlObj.BASE_URL;
  }
}

const genres_list = async (urlObj, baseUrl, genres_list)=>{
  try{
    // console.log(baseUrl+genres_list)
  let data = await axios.get(baseUrl + genres_list)
  urlObj.genres_all_List =data; 
  return urlObj.genres_all_List;
  }catch(e){
    console.log("fail at fetching genres list")
  }
}

let isBaseUrlNull =(isUrlNull)=>{
  // if(urlObj.isUrlNull === null);
  return true
}


// retrive genres list from RADIO_LIST_API https://nl1.api.radio-browser.info
let genresList =async ()=>{
 if(isBaseUrlNull(urlObj)){
  return baseUrl()
     .then(()=>genres_list(urlObj, urlObj.BASE_URL, constant_radio_param.genres_list)
    ).then(()=>(urlObj.genres_all_List)
   )
  } else{
    genres_list(urlObj, baseUrl, constant_radio_param.genres_list)
  }
}
let refreshRadioLink = () => {
  get_radiobrowser_base_url_random()
    .then(random_host => {
      urlObj.BASE_URL = random_host
    })
}

module.exports ={
  genresList,
  refreshRadioLink,
  baseUrl
}
