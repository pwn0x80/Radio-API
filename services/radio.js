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

// get_radiobrowser_base_urls().then(hosts => {
//   console.log("All available urls")
//   console.log("------------------")
//   for (let host of hosts) {
//     console.log(host);
//   }
//   console.log();

//   return get_radiobrowser_base_url_random();
// }).then(random_host => {
//   console.log("Random base url")
//   console.log("------------------")
//   console.log(random_host);
// });

const radioLink = {
  baseURL: "n",
  // @get store generes_List
  generes_all_List: []


}
const radio_param = {
  // @get list
  genres_list: '/json/tags',
  // @params {string} %s
  genre_tag_list: '/json/stations/byname/%s',
}

function radioReactiveProxy(target) {
  const radioLinkHandler = {
    get(target, prop, receiver) {
      const result = Reflect.get(target, prop, receiver);
      tracker(target, prop)
      return result
    },
    set(target, prop, val, receiver) {
      Reflect.set(target, prop, val, receiver);
      trigger(target, prop)
      return 'done'
    }
  }
  return new Proxy(target, radioLinkHandler);
}

let activeEffect = null
let radioProxy = radioReactiveProxy(radioLink)

function effect(fn) {
  activeEffect = fn
  if (activeEffect) {
    activeEffect();
    activeEffect = null
  }
}

let deb = new Set();

let tracker = () => {
  if (activeEffect) {
    deb.add(activeEffect)
  }
}


let trigger = () => {
  deb.forEach((trigger) => {
    trigger()
  })
}
get_radiobrowser_base_url_random()
  .then(random_host => {
    return radioProxy.baseURL = random_host
  })
effect(async () => {
  if (radioProxy.baseURL == "n") { return }
  try {
    let url = radioProxy.baseURL + radio_param.genres_list;

    let t = await axios.get(url);
    // console.log(t)

    // let out = JSON.stringify(t)
    radioLink.generes_all_List = t['data'];

  } catch {
    throws("fetching error")
  }
})

let genresList = () => {
  return radioProxy.generes_all_List;
}

let baseUrl = () => {
  return radioProxy.baseURL;
}
let refreshRadioLink = () => {
  get_radiobrowser_base_url_random()
    .then(random_host => {
      return radioProxy.baseURL = random_host
    })

}

module.exports = {
  genresList,
  refreshRadioLink,
  baseUrl
}

